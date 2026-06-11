import { useState } from 'react';

const ConnectionForm = (props) => {
    const { pendingConnection, onSubmit, onCancel, onDelete, mode } = props;
    const [relationType, setRelationType] = useState(
        mode === 'edit' && pendingConnection?.label ? pendingConnection.label : ''
    );

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
            <div className="bg-linear-to-br from-basalt to-obsidian border border-sardaukar/20 rounded-none p-5 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-[0_12px_50px_rgba(0,0,0,0.85)] transform transition-all m-4">
                <div className="flex items-center justify-between border-b border-sardaukar/25 pb-3 mb-4">
                    <h2 className="text-xs font-semibold text-plasteel uppercase font-display tracking-[0.12em]">
                        [ Connection Telemetry ]
                    </h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="relationType" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-1">
                            Relation Label
                        </label>
                        <input
                            type="text"
                            id="relationType"
                            value={relationType}
                            onChange={(e) => setRelationType(e.target.value)}
                            placeholder="Define the connection..."
                            className="w-full text-plasteel bg-transparent placeholder:text-sardaukar/60 border-b border-sardaukar/30 px-1 py-1.5 text-sm focus:outline-none focus:border-spice-orange transition-colors font-mono-fremen"
                        />
                        <p className="text-[9px] text-sardaukar/70 mt-2 font-mono-fremen uppercase tracking-wider">
                            * E.g. causes, leads to, is a part of, triggers
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-sardaukar/25 mt-4">
                        {/* Cancel Button with Dune Styling */}
                        <button 
                            type='button' 
                            onClick={handleCancel} 
                            className="w-full sm:w-auto shrink-0 bg-transparent hover:bg-basalt/30 text-sand hover:text-plasteel font-display text-xs tracking-[0.12em] font-bold uppercase py-2 px-4 border border-sardaukar/30 hover:border-sardaukar transition-all duration-300 rounded-none cursor-pointer"
                        >
                            [ CANCEL ]
                        </button>
                        {/* Submit Button with Dune Styling */}
                        <button 
                            type='button' 
                            onClick={handleSubmit} 
                            className="w-full sm:w-auto shrink-0 bg-spice-orange text-obsidian font-display text-xs tracking-[0.12em] font-bold uppercase py-2 px-4 border border-spice-orange hover:bg-spice-orange/85 transition-all duration-300 rounded-none cursor-pointer dune-shield-hover shadow-[0_4px_12px_rgba(255,107,0,0.15)]"
                        >
                            [ SUBMIT ]
                        </button>
                        {mode === 'edit' && (
                            <button 
                                type='button'
                                onClick={handleDelete}
                                className="w-full sm:w-auto shrink-0 bg-transparent hover:bg-red-950/35 text-red-400 hover:text-red-300 font-display text-xs tracking-[0.12em] font-bold uppercase py-2 px-4 border border-red-900/40 hover:border-red-600 transition-all duration-300 rounded-none cursor-pointer"
                            >
                                [ PURGE ]
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConnectionForm;