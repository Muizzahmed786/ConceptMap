import { useState, useEffect } from 'react';

const ConnectionForm = (props) => {
    const { pendingConnection, onSubmit, onCancel, onDelete, mode } = props;
    const [relationType, setRelationType] = useState('');

    const handleSubmit = () => {
        if (relationType.trim() === '') {
            alert('Relation type cannot be empty');
            return;
        }

        if(mode === 'edit'){
            onSubmit(pendingConnection.id, {relationType: relationType.trim()});
        } else{
            onSubmit({...pendingConnection, relationType: relationType.trim()});
        }

        setRelationType('');
    }

    const handleCancel = () => {
        setRelationType('');
        onCancel();
    }

    useEffect(() => {
        if (mode === 'edit' && pendingConnection?.label) {
            setRelationType(pendingConnection.label);
        } else {
            setRelationType('');
        }
    }, [pendingConnection, mode]);

    const handleDelete = () => {
        if(window.confirm('Are you sure you want to delete this connection ? This action cannot be undone')){
            onDelete(pendingConnection.id);
        } else{
            return;
        }
    }

    return (
        <div className="fixed inset-0 bg-obsidian/75 backdrop-blur-md flex items-center justify-center z-50 transition-opacity">
            {/* Expanded the max-width to max-w-md for a larger popup */}
            <div className="bg-linear-to-br from-basalt to-obsidian border border-sardaukar/20 rounded-none p-8 w-full max-w-md shadow-[0_12px_50px_rgba(0,0,0,0.85)] transform transition-all m-4">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="relationType" className="block text-[10px] tracking-[0.25em] uppercase font-mono-fremen text-sand mb-3">
                            [ LINK RELATION telemetry ]
                        </label>
                        <input
                            type="text"
                            id="relationType"
                            value={relationType}
                            onChange={(e) => setRelationType(e.target.value)}
                            placeholder="Define the connection..."
                            className="w-full text-plasteel bg-transparent placeholder-sardaukar/40 border-b border-sardaukar/30 px-1 py-2 text-sm focus:outline-none focus:border-spice-orange transition-colors font-mono-fremen"
                        />
                        <p className="text-[10px] text-sardaukar mt-3 font-mono-fremen uppercase tracking-wider">
                            * E.g. causes, leads to, is a part of, triggers
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-sardaukar/10 mt-6">
                        {/* Cancel Button with Dune Styling */}
                        <button 
                            type='button' 
                            onClick={handleCancel} 
                            className="w-full sm:w-auto bg-transparent hover:bg-basalt/40 text-sand hover:text-plasteel font-mono-fremen text-xs tracking-widest uppercase py-2.5 px-5 border border-sardaukar/30 hover:border-sardaukar transition-all duration-300 rounded-none cursor-pointer"
                        >
                            Cancel
                        </button>
                        {/* Submit Button with Dune Styling */}
                        <button 
                            type='button' 
                            onClick={handleSubmit} 
                            className="w-full sm:w-auto bg-transparent hover:bg-spice-orange text-plasteel hover:text-obsidian font-mono-fremen text-xs tracking-widest uppercase py-2.5 px-5 border border-spice-orange/60 hover:border-spice-orange transition-all duration-300 rounded-none cursor-pointer dune-shield-hover"
                        >
                            Submit
                        </button>
                        {mode === 'edit' && (
                            <button 
                                type='button'
                                onClick={handleDelete}
                                className="w-full sm:w-auto bg-transparent hover:bg-red-950/40 text-red-400 hover:text-red-300 font-mono-fremen text-xs tracking-widest uppercase py-2.5 px-5 border border-red-900/40 hover:border-red-650 transition-all duration-300 rounded-none cursor-pointer"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConnectionForm;