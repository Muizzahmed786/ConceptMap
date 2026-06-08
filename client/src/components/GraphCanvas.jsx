import { ReactFlow, Panel, Controls, Background } from '@xyflow/react';
import { useMemo, useEffect } from 'react';
import '@xyflow/react/dist/style.css';

const GraphCanvas = (props) => {
    const { concepts, connections, onAddConcept, addConceptButtonRef, onConceptSelect, onConnect, onEdgeClick } = props;

    const nodes = useMemo(() => concepts.map((concept) => ({
        id: concept._id,
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        data: { label: concept.title }
    })), [concepts]);

    const edges = useMemo(() => connections.map((connection) => ({
        id: connection._id,
        source: connection.source,
        target: connection.target,
        label: connection.relationType
    })), [connections]);

    const btnClass = "bg-transparent hover:bg-spice-orange text-plasteel hover:text-obsidian font-mono-fremen text-xs tracking-widest uppercase py-3 px-6 border border-spice-orange/60 hover:border-spice-orange transition-all duration-300 flex items-center space-x-2 rounded-none cursor-pointer dune-shield-hover";

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
                >
                    <Background color="rgba(139, 134, 128, 0.15)" gap={20} size={1} />
                    <Controls />
                    <Panel position='top-right'>
                        <button
                            ref={addConceptButtonRef}
                            onClick={onAddConcept}
                            className={btnClass}
                        >
                            <span>+ ADD CONCEPT</span>
                        </button>
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
                    >
                        <span>+ ADD CONCEPT</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default GraphCanvas;

