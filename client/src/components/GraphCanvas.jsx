import { ReactFlow, Panel, Controls, Background, useNodesState, useEdgesState } from '@xyflow/react';
import { useEffect, useMemo, useState } from 'react';
import '@xyflow/react/dist/style.css';

// Pure deterministic coordinate generator to avoid ESLint purity issues
// and ensure node layout is stable across re-renders
const getDeterministicPosition = (id) => {
    let hash = 0;
    const str = id || '';
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const x = Math.abs(hash % 500) + 50;
    const y = Math.abs((hash >> 8) % 400) + 50;
    return { x, y };
};

const GraphCanvas = (props) => {
    const { concepts, connections, onAddConcept, addConceptButtonRef, onConceptSelect, onConnect, onEdgeClick } = props;

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [isLegendExpanded, setIsLegendExpanded] = useState(window.innerWidth >= 768);

    const {beginnerCount, interCount, advanceCount} = useMemo(() => {
        let beginnerCount = 0, interCount = 0, advanceCount = 0;
        for(let i=0;i<concepts.length;i++){
            if(concepts[i].understandingLevel === 'Beginner') beginnerCount++;
            if(concepts[i].understandingLevel === 'Intermediate') interCount++;
            if(concepts[i].understandingLevel === 'Advanced') advanceCount++;
        }
        return {beginnerCount, interCount, advanceCount};
    }, [concepts]);

    // to check the isolated nodes, nodes which have the least connections
    const isolatedNodes = useMemo(() => {
        const mySet = new Set();
        connections.forEach((item) => {
            mySet.add(item.source);
            mySet.add(item.target);
        });
        return concepts.filter((concept) => !mySet.has(concept._id));
    }, [concepts, connections]);

    useEffect(() => {
        const mapNodes = () => {
            setNodes((prevNodes => concepts.map(concept => {
                const existing = prevNodes.find(n => n.id === concept._id);
                let levelClass = '';
                if (concept.understandingLevel === 'Beginner') levelClass = 'beginner-node';
                else if (concept.understandingLevel === 'Intermediate') levelClass = 'intermediate-node';
                else if (concept.understandingLevel === 'Advanced') levelClass = 'advanced-node';
                let classname = levelClass;
                if(isolatedNodes.some(node => node._id === concept._id)){
                    classname += ' isolated-node';
                }
                return{
                    id: concept._id,
                    position: existing ? existing.position : getDeterministicPosition(concept._id),
                    data: { label: concept.title, understanding: concept.understandingLevel },
                    className: classname,
                }
            })));
        }
        mapNodes();
    }, [concepts, setNodes]);

    useEffect(() => {
        const mapEdges = () => {
            setEdges(connections.map(connection => ({
                id: connection._id,
                source: connection.source,
                target: connection.target,
                label: connection.relationType,
            })));
        }
        mapEdges();
    }, [connections, setEdges]);

    const btnClass = "bg-transparent hover:bg-spice-orange text-plasteel hover:text-obsidian font-mono-fremen text-[10px] sm:text-xs tracking-widest uppercase py-2 px-3 sm:py-3 sm:px-6 border border-spice-orange/60 hover:border-spice-orange transition-all duration-300 flex items-center space-x-2 rounded-none cursor-pointer dune-shield-hover";

    const onNodeClick = (event, node) => {
        if (onConceptSelect) {
            onConceptSelect(node.id);
        }
    };

    const onPaneClick = () => {
        if (onConceptSelect) {
            onConceptSelect(null);
        }
    };

    const handleEdgeClick = (event, edge) => {
        return onEdgeClick ? onEdgeClick(edge) : null;
    };

    return (
        <div className="bg-linear-to-br from-basalt/15 to-obsidian border border-sardaukar/15 h-full w-full rounded-none shadow-[0_12px_40px_rgba(0,0,0,0.65)] relative overflow-hidden flex flex-col p-6 z-10">
            {nodes.length > 0 ? (
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodeClick={onNodeClick}
                    onPaneClick={onPaneClick}
                    onConnect={onConnect}
                    onEdgeClick={handleEdgeClick}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                >
                    <Background color="rgba(139, 134, 128, 0.15)" gap={20} size={1} />
                    <Controls />
                    <Panel position='top-right'>
                        <button
                            ref={addConceptButtonRef}
                            onClick={onAddConcept}
                            className={btnClass}
                        >
                            <span>[ ADD CONCEPT ]</span>
                        </button>
                    </Panel>
                    <Panel position='top-left'>
                        <div className="font-mono-fremen text-[10px] uppercase tracking-widest border border-sardaukar/20 bg-obsidian/85 backdrop-blur-sm p-2.5 sm:p-3 flex flex-col gap-2 transition-all max-w-50 select-none">
                            <button 
                                onClick={() => setIsLegendExpanded(prev => !prev)}
                                className="text-plasteel/80 hover:text-plasteel tracking-[0.2em] font-bold text-left flex items-center justify-between gap-2.5 w-full focus:outline-none cursor-pointer"
                                type="button"
                            >
                                <span>[ LEGEND ]</span>
                                <span className="text-[8px] text-spice-orange font-mono">
                                    {isLegendExpanded ? "[ ▴ ]" : "[ ▾ ]"}
                                </span>
                            </button>
                            {isLegendExpanded && (
                                <div className="flex flex-col gap-2 mt-1 border-t border-sardaukar/10 pt-2 transition-all">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]"></span>
                                        <span className="text-sand">Weak</span>
                                        <span className="ml-auto text-plasteel font-bold">{beginnerCount}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                        <span className="text-sand">Intermediate</span>
                                        <span className="ml-auto text-plasteel font-bold">{interCount}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                        <span className="text-sand">Advanced</span>
                                        <span className="ml-auto text-plasteel font-bold">{advanceCount}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Panel>    
                </ReactFlow>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 z-10 font-mono-fremen">
                    <p className="text-sm text-sand mb-6 tracking-wider uppercase">
                        No telemetry detected. Initialize scouting array.
                    </p>

                    <button
                        ref={addConceptButtonRef}
                        onClick={onAddConcept}
                        className={btnClass}
                        aria-label="Add concept"
                    >
                        <span>[ ADD CONCEPT ]</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default GraphCanvas;

