import { useEffect, useState, useRef } from "react";
import { fetchCanvases, fetchGraphData, createConcept, updateConcept, deleteConcept, createConnection, updateConnection, deleteConnection } from "../services/api.js";

import GraphCanvas from "../components/GraphCanvas.jsx";
import ConceptDrawer from "../components/ConceptDrawer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import ConnectionForm from "../components/ConnectionForm.jsx";

const CanvasPage = () => {
    const [canvasList, setCanvasList] = useState([]);
    const [currentCanvasId, setCurrentCanvasId] = useState(null);
    const [graphData, setGraphData] = useState({ concepts: [], connections: [] });
    const [loading, setLoading] = useState(false);
    const [conceptFormVisible, setConceptFormVisible] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [currentConcept, setCurrentConcept] = useState(null);
    const [pendingConnection, setPendingConnection] = useState(null);
    const [selectedConnection, setSelectedConnection] = useState(null);

    const addConceptButtonRef = useRef(null);

    // Fetch all canvases when the component mounts
    useEffect(() => {
        const fetchAllCanvases = async () => {
            try {
                setLoading(true);
                const response = await fetchCanvases();
                setCanvasList(response.data);
                if (response.data && response.data.length > 0) {
                    setCurrentCanvasId(response.data[0]._id);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchAllCanvases();
    }, []);

    // Fetch a particular canvas
    useEffect(() => {
        const fetchCanvasData = async () => {
            if (currentCanvasId) {
                try {
                    setLoading(true);
                    const response = await fetchGraphData(currentCanvasId);
                    setGraphData(response.data);
                    setCurrentConcept(null);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchCanvasData();
    }, [currentCanvasId]);

    // Handle new concept submission
    const handleConceptSubmit = async (conceptData) => {
        try {
            const response = await createConcept(currentCanvasId, conceptData);
            setGraphData((prevData) => ({
                ...prevData,
                concepts: [...prevData.concepts, response.data]
            }));
            
            // Trigger toast alert
            setToastVisible(true);
            setToastMessage('Concept created successfully');
            setTimeout(() => {
                setToastVisible(false);
            }, 3000);
        } catch (e) {
            console.error(e);
        } finally {
            setConceptFormVisible(false);
        }
    };

    // function to select and display the details of a concept when clicked
    const handleConceptSelect = (conceptId) => {
        if (conceptId) {
            setConceptFormVisible(false);
            const selectedConcept = graphData.concepts.find((concept) => concept._id === conceptId);
            setCurrentConcept(selectedConcept || null);
        } else {
            setCurrentConcept(null);
        }
    };

    // Handle updating concept details
    const handleConceptUpdate = async (conceptId, updatedData) => {
        try {
            const response = await updateConcept(conceptId, updatedData);
            setGraphData((prevData) => ({
                ...prevData,
                concepts: prevData.concepts.map((c) => c._id === conceptId ? response.data : c)
            }));
            setCurrentConcept(response.data);
            
            // Trigger toast alert
            setToastVisible(true);
            setToastMessage('Concept updated successfully');
            setTimeout(() => {
                setToastVisible(false);
            }, 3000);
        } catch (e) {
            console.error(e);
        }
    };

    // handle deletion of a concept
    const handleConceptDelete = async (conceptId) => {
        try{
            await deleteConcept(conceptId);
            setGraphData((prev) => ({
                ...prev,
                concepts: prev.concepts.filter(concept => concept._id !== conceptId),
                connections: prev.connections.filter(connection => connection.source !== conceptId && connection.target !== conceptId) 
            }));
            setCurrentConcept(null);
        } catch(e){
            console.error(e);
        }
    }

    // handleConnect function to manage the creation of connections between concepts
    const handleConnect = ({source, target}) => {
        const pendingConnection = { source: source, target: target, relationType: null };
        setPendingConnection(pendingConnection);
    };
    
    // handle submission of the connection form
    const handleConnectionSubmit = async (connectionData) => {
        try{
            const response = await createConnection(connectionData);
            setGraphData((prev) => ({
                ...prev,
                connections: [...prev.connections, response.data]
            })); 
            setPendingConnection(null);
        } catch(e){
            console.error(e);
        }
    }

    // handle cancellation of the connection form
    const handleConnectionCancel = () => {
        setPendingConnection(null);
    }

    // handle cancellation of the connection details view/edit
    const handleConnectionEditCancel = () => {
        setSelectedConnection(null);
    }

    // handle selection of a connection to view/edit it's details
    const handleConnectionSelect = (edge) => {
        setSelectedConnection(edge || null);
    }

    // handle updating a connection's details
    const handleConnectionUpdate = async (connectionId, updatedData) => {
        try{
            const response = await updateConnection(connectionId, updatedData);
            setGraphData((prev) => ({
                ...prev,
                connections: prev.connections.map(connection => connection._id === connectionId ? response.data : connection)
            }));
            setSelectedConnection(null);
        } catch(e){
            console.error(e);
        }
    }

    // handle deletion of a connection
    const handleConnectionDelete = async (connectionId) => {
        try{
            await deleteConnection(connectionId);
            setGraphData((prev) => ({
                ...prev,
                connections: prev.connections.filter(connection => connection._id !== connectionId)
            }));
            setSelectedConnection(null);
        } catch(e){
            console.error(e);
        }
    }

    return (
        <div 
            className="flex h-screen w-full bg-[#07111B] text-[#F8FAFC] overflow-hidden"
            style={{ backgroundImage: 'radial-gradient(circle at top left, rgba(20, 184, 166, 0.12), transparent 40%)' }}
        >
            {/* Sidebar */}
            <div className="w-1/5 bg-[#0B1724]/40 border-r border-white/8 p-6 flex flex-col h-full overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 tracking-wide text-[#F8FAFC]">
                    Canvases
                </h2>
                {loading && canvasList.length === 0 ? (
                    <p className="text-sm text-[#94A3B8] animate-pulse">Loading canvases...</p>
                ) : (
                    <div className="flex flex-col">
                        {canvasList.map((canvas) => (
                            <button
                                key={canvas._id}
                                className={`text-left p-3.5 mb-3 rounded-lg cursor-pointer transition duration-150 ease-in-out border-l-4 ${
                                    currentCanvasId === canvas._id
                                        ? "bg-[#0F2030] border-[#14B8A6] text-[#F8FAFC] font-semibold shadow-inner"
                                        : "bg-[#0F2030]/20 border-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F2030]/60"
                                }`}
                                onClick={() => setCurrentCanvasId(canvas._id)}
                            >
                                {canvas.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Area containing Canvas & Drawer */}
            <div className="flex-1 flex relative h-full overflow-hidden p-6 gap-6">
                <div className="flex-1 h-full transition-all duration-300 ease-in-out">
                    <GraphCanvas
                        concepts={graphData.concepts}
                        connections={graphData.connections}
                        onAddConcept={() => {
                            setCurrentConcept(null);
                            setConceptFormVisible(true);
                        }}
                        addConceptButtonRef={addConceptButtonRef}
                        onConceptSelect={handleConceptSelect}
                        onConnect={handleConnect}
                        onEdgeClick={handleConnectionSelect}
                    />
                </div>

                <ConceptDrawer
                    isOpen={conceptFormVisible}
                    onClose={() => setConceptFormVisible(false)}
                    onSubmit={handleConceptSubmit}
                    addConceptButtonRef={addConceptButtonRef}
                />

                {currentConcept && (
                    <Sidebar 
                        currentConcept={currentConcept}
                        onSave={handleConceptUpdate}
                        onClose={() => setCurrentConcept(null)}
                        onDelete={handleConceptDelete}
                    />
                )}
            </div>

            {pendingConnection && (
                <ConnectionForm 
                    pendingConnection={pendingConnection}
                    onSubmit={handleConnectionSubmit}
                    onCancel={handleConnectionCancel}
                    onDelete={handleConnectionDelete}
                    mode={'create'}
                />
            )}

            {selectedConnection && (
                <ConnectionForm 
                    pendingConnection={selectedConnection}
                    onSubmit={handleConnectionUpdate}
                    onCancel={handleConnectionEditCancel}
                    onDelete={handleConnectionDelete}
                    mode={'edit'}
                />
            )}


            {/* Non-blocking Success Toast */}
            <div
                role="status"
                aria-live="polite"
                className={`fixed bottom-6 right-6 z-50 bg-[#22C55E] text-white px-5 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(34,197,94,0.3)] flex items-center space-x-2.5 transition-all duration-300 transform ${
                    toastVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
                }`}
            >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold text-sm">{toastMessage}</span>
            </div>
        </div>
    );
};

export default CanvasPage;
