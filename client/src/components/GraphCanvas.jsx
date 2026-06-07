import { ReactFlow, Panel, Controls, Background } from '@xyflow/react';
import { useMemo } from 'react';
import '@xyflow/react/dist/style.css';

const GraphCanvas = (props) => {
    const { concepts, connections, onAddConcept, addConceptButtonRef, onConceptSelect, onConnect } = props;

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

    const btnClass = "bg-[#14B8A6] hover:bg-[#0D9488] text-white font-semibold py-2.5 px-5 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.25)] transition duration-200 flex items-center space-x-1.5 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/50 cursor-pointer";

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

    return (
        <div className="bg-[#0B1724] border border-white/8 h-full w-full rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] relative overflow-hidden flex flex-col p-6">
            {nodes.length > 0 ? (
                <ReactFlow 
                    nodes={nodes} 
                    edges={edges}
                    onNodeClick={onNodeClick}
                    onPaneClick={onPaneClick}
                    onConnect={onConnect}
                >
                    <Background color="rgba(255, 255, 255, 0.05)" gap={16} size={1} />
                    <Controls />
                    <Panel position='top-right'>
                        <button
                            ref={addConceptButtonRef}
                            onClick={onAddConcept}
                            className={btnClass}
                        >
                            <span>+ Add Concept</span>
                        </button>
                    </Panel>
                </ReactFlow>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 z-10">
                    <p className="text-lg text-[#94A3B8] mb-6 font-medium">
                        No concepts to display. Start by creating one!
                    </p>

                    <button
                        ref={addConceptButtonRef}
                        onClick={onAddConcept}
                        className={btnClass}
                    >
                        <span>+ Add Concept</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default GraphCanvas;

