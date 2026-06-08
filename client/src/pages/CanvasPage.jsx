import { useEffect, useState, useRef } from "react";
import { fetchCanvases, fetchGraphData, createConcept, updateConcept, deleteConcept, createConnection, updateConnection, deleteConnection, createCanvas, deleteCanvas } from "../services/api.js";

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
    const [isCreatingCanvas, setIsCreatingCanvas] = useState(false);
    const [newCanvasTitle, setNewCanvasTitle] = useState('');

    const addConceptButtonRef = useRef(null);

    // Handle creation of a canvas
    const handleCreateCanvas = async (canvasTitle) => {
        try{
            setIsCreatingCanvas(true);
            const response = await createCanvas(canvasTitle);
            setCanvasList((prev) => [...prev, response.data]);
            setCurrentCanvasId(response.data._id);
            setNewCanvasTitle('');
        } catch(e){
            console.error(e);
        } finally{
            setIsCreatingCanvas(false);
        }
    }

    const handleCanvasDelete = async (canvasId) => {
        try{
            await deleteCanvas(canvasId);
            const remaining = canvasList.filter((canvas) => canvas._id !== canvasId);
            setCanvasList(remaining);
            setCurrentCanvasId(remaining[0]?._id || null);
        } catch(e){
            console.error(e);
        }
    }

    // Fetch all canvases when the component mounts
    useEffect(() => {
        const fetchAllCanvases = async () => {
            try {
                setLoading(true);
                const response = await fetchCanvases();
                console.log(response.data);
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
            className="flex h-screen w-full bg-obsidian text-plasteel overflow-hidden font-body relative"
        >
            {/* Film Grain & Vignette overlays */}
            <div className="dune-grain" />
            <div className="dune-vignette" />

            {/* Sidebar */}
            <div className="w-1/5 bg-basalt/20 border-r border-sardaukar/10 p-6 flex flex-col h-full overflow-y-auto font-mono-fremen z-10">
                <h2 className="text-xs font-semibold mb-6 tracking-[0.25em] text-plasteel uppercase font-display border-b border-sardaukar/10 pb-4">
                    Imperial Maps
                </h2>
                {loading && canvasList.length === 0 ? (
                    <p className="text-xs text-sand animate-pulse font-mono-fremen uppercase tracking-widest">Loading telemetry...</p>
                ) : (
                    <>
                        <div className="flex flex-col flex-1">
                            {canvasList.map((canvas) => (
                                <div key={canvas._id} className="flex items-center group mb-3">
                                    <button
                                        className={`text-left p-3.5 mb-3 cursor-pointer transition-all duration-200 border-l-2 text-xs tracking-wider uppercase font-mono-fremen ${
                                            currentCanvasId === canvas._id
                                                ? "bg-basalt/50 border-spice-orange text-plasteel font-bold shadow-[inset_0_0_8px_rgba(255,107,0,0.1)]"
                                                : "bg-transparent border-sardaukar/10 text-sand hover:text-plasteel hover:bg-basalt/25"
                                        }`}
                                        onClick={() => setCurrentCanvasId(canvas._id)}
                                    >
                                        {canvas.title}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleCanvasDelete(canvas._id)}
                                        className="ml-2 text-sardaukar/40 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        {/* Inline text input for new canvas title */}
                        <div>
                            {isCreatingCanvas ? (
                                <div className="flex flex-col gap-2">
                                    <input 
                                        type="text" 
                                        value={newCanvasTitle}
                                        onChange={(e) => setNewCanvasTitle(e.target.value)}
                                        placeholder="Map designation..."
                                        className="w-full px-2 py-2 bg-transparent border-b border-spice-orange/50 text-plasteel placeholder-sardaukar/50 text-xs focus:outline-none font-mono-fremen"
                                        autoFocus
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleCreateCanvas(newCanvasTitle)}
                                            disabled={!newCanvasTitle.trim()}
                                            className="flex-1 text-xs uppercase tracking-widest py-2 border border-spice-orange/60 text-plasteel hover:bg-spice-orange hover:text-obsidian transition-all font-mono-fremen disabled:opacity-40 cursor-pointer"
                                        >
                                            [ CONFIRM ]
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsCreatingCanvas(false);
                                                setNewCanvasTitle('');
                                            }}
                                            className="flex-1 text-xs uppercase tracking-widest py-2 border border-sardaukar/20 text-sand hover:text-plasteel transition-all font-mono-fremen cursor-pointer"
                                        >
                                            [ CANCEL ]
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsCreatingCanvas(true)}
                                    className="w-full text-xs uppercase tracking-widest py-2.5 border border-sardaukar/20 text-sand hover:text-plasteel hover:border-spice-orange/40 transition-all font-mono-fremen cursor-pointer"
                                >
                                    [ + NEW MAP ]
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Main Area containing Canvas & Drawer */}
            {
                canvasList.length > 0 ? (
                    <div className="flex-1 flex relative h-full overflow-hidden p-6 gap-6 z-10">
                        <div className="flex-1 min-w-0 h-full transition-all duration-300 ease-in-out">
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
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-between">
                        <p className="mt-82">No Canvases added yet</p>
                    </div>
                )
            }

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
                className={`fixed bottom-6 right-6 z-50 bg-basalt/95 backdrop-blur-md text-plasteel border border-spice-orange rounded-none px-6 py-4 shadow-[0_0_30px_rgba(255,107,0,0.25)] flex items-center space-x-3 transition-all duration-500 transform font-mono-fremen ${
                    toastVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
                }`}
                style={{ filter: 'drop-shadow(0 0 8px rgba(255,107,0,0.2))' }}
            >
                <svg className="w-4 h-4 shrink-0 text-spice-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold text-xs tracking-widest uppercase">{toastMessage}</span>
            </div>
        </div>
    );
};

export default CanvasPage;
