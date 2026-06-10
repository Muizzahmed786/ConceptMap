import { useState } from 'react';

const understandingLevels = ['Beginner', 'Intermediate', 'Advanced'];

const Sidebar = (props) => {
    const { currentConcept, onSave, onClose, onDelete } = props;
    const [formData, setFormData] = useState({
        title: currentConcept?.title || '',
        description: currentConcept?.description || '',
        tags: currentConcept?.tags || [],
        understandingLevel: currentConcept?.understandingLevel || 'Beginner'
    });
    const [isSaving, setIsSaving] = useState(false);
    const [newNote, setNewNote] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value
        }));
    };

    const handleSave = async (event) => {
        event.preventDefault();
        if (!formData.title.trim()) return;

        setIsSaving(true);
        try {
            await onSave(currentConcept._id, formData);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    // Handle adding a new note to the concept
    const handleAddNote = () => {
        const updatedNotes = [...(currentConcept.notes || []), {content: newNote.trim()}];
        onSave(currentConcept._id, {...formData, notes: updatedNotes});
        setNewNote('');
    };

    // Handle deleting a note from the concept
    const handleDeleteNote = (noteId) => {
        const updatedNotes = currentConcept.notes.filter((note) => note._id !== noteId);
        onSave(currentConcept._id, {...formData, notes: updatedNotes});
    };

    if (!currentConcept) return null;

    return (
        <div className="w-85 shrink-0 bg-linear-to-br from-basalt to-obsidian/95 border-l border-sardaukar/20 h-full rounded-none shadow-[0_12px_40px_rgba(0,0,0,0.75)] p-6 flex flex-col relative z-20 backdrop-blur-md">
            {/* Close Button */}
            <button
                onClick={onClose}
                aria-label="Close details"
                className="absolute top-6 right-6 text-sand hover:text-plasteel p-1.5 border border-transparent hover:border-sardaukar/25 hover:bg-basalt/30 transition-all focus:outline-none rounded-none cursor-pointer"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h2 className="text-xs font-semibold text-plasteel uppercase font-display tracking-[0.12em] border-b border-sardaukar/25 pb-4 mb-5">Concept Details</h2>
 
            <form onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-2">
                    <div>
                        <label htmlFor="edit-title" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-1">
                            <span className="text-sardaukar/50 text-[9px] mr-1.5 font-mono">01 //</span> Title
                        </label>
                        <input
                            id="edit-title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-1 py-1.5 bg-transparent border-b border-sardaukar/30 text-plasteel placeholder:text-sardaukar/60 text-sm focus:outline-none focus:border-spice-orange transition-colors font-mono-fremen"
                        />
                    </div>
 
                    <div>
                        <label htmlFor="edit-description" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-1">
                            <span className="text-sardaukar/50 text-[9px] mr-1.5 font-mono">02 //</span> Description
                        </label>
                        <textarea
                            id="edit-description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-1 py-1.5 bg-transparent border-b border-sardaukar/30 text-plasteel placeholder:text-sardaukar/60 text-sm resize-none focus:outline-none focus:border-spice-orange transition-colors font-mono-fremen"
                        />
                    </div>
 
                    <div>
                        <label htmlFor="edit-tags" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-1">
                            <span className="text-sardaukar/50 text-[9px] mr-1.5 font-mono">03 //</span> Tags (comma-separated)
                        </label>
                        <input
                            id="edit-tags"
                            type="text"
                            name="tags"
                            value={formData.tags.join(', ')}
                            onChange={handleChange}
                            className="w-full px-1 py-1.5 bg-transparent border-b border-sardaukar/30 text-plasteel placeholder:text-sardaukar/60 text-sm focus:outline-none focus:border-spice-orange transition-colors font-mono-fremen"
                        />
                    </div>
 
                    <div>
                        <label htmlFor="edit-understandingLevel" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-1">
                            <span className="text-sardaukar/50 text-[9px] mr-1.5 font-mono">04 //</span> Cognitive Depth
                        </label>
                        <select
                            id="edit-understandingLevel"
                            name="understandingLevel"
                            value={formData.understandingLevel}
                            onChange={handleChange}
                            className="w-full px-1 py-1.5 bg-transparent border-b border-sardaukar/30 text-plasteel text-sm focus:outline-none focus:border-spice-orange transition-colors cursor-pointer font-mono-fremen"
                        >
                            {understandingLevels.map((level) => (
                                <option key={level} value={level} className="bg-obsidian text-plasteel">
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>
 
                    <div>
                        <label htmlFor="edit-notes" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-1">
                            <span className="text-sardaukar/50 text-[9px] mr-1.5 font-mono">05 //</span> Field Notes
                        </label>
                        <div>
                            {currentConcept.notes && currentConcept.notes.length > 0 ? (
                                <ul className="space-y-2 max-h-36 overflow-y-auto pr-2">
                                    {currentConcept.notes.map((note) => (
                                        <li key={note._id} className="bg-basalt/30 border border-sardaukar/10 hover:border-spice-orange/30 p-2.5 rounded-none relative group flex items-center justify-between text-xs text-sand font-mono-fremen leading-relaxed">
                                            <span>{note.content}</span>
                                            <button 
                                                type="button" 
                                                onClick={() => handleDeleteNote(note._id)}
                                                className="text-sardaukar/40 hover:text-red-400 text-[10px] opacity-0 group-hover:opacity-100 transition-all cursor-pointer focus:outline-none ml-2"
                                                title="Delete note"
                                            >
                                                [ X ]
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-[10px] text-sardaukar/60 font-mono-fremen uppercase tracking-wider mb-2">
                                    No notes to display as of now
                                </p>
                            )}
                        </div>
 
                        <div className="flex gap-2 items-center mt-3">
                            <input 
                                id="edit-notes"
                                type="text"
                                name="notes"
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Enter new field note..."
                                className="flex-1 px-1 py-1.5 bg-transparent border-b border-sardaukar/30 text-plasteel placeholder:text-sardaukar/60 text-sm focus:outline-none focus:border-spice-orange transition-colors font-mono-fremen"
                            />
                            <button 
                                type="button" 
                                onClick={handleAddNote}
                                disabled={!newNote.trim()}
                                className="px-3.5 py-1.5 shrink-0 border border-sardaukar/30 hover:border-spice-orange/60 text-plasteel hover:bg-spice-orange hover:text-obsidian transition-all duration-300 text-xs font-mono-fremen font-bold tracking-wider uppercase rounded-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                [ ADD ]
                            </button>
                        </div>
                    </div>
                </div>
 
                <div className="pt-4 border-t border-sardaukar/25 mt-3 shrink-0">
                    <button
                        type="submit"
                        disabled={isSaving || !formData.title.trim()}
                        className="w-full bg-spice-orange text-obsidian text-xs tracking-[0.15em] font-bold font-display uppercase py-2.5 border border-spice-orange hover:bg-spice-orange/85 transition-all duration-300 flex items-center justify-center space-x-2 rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dune-shield-hover shadow-[0_4px_12px_rgba(255,107,0,0.15)]"
                    >
                        {isSaving ? (
                            <span className="animate-pulse">[ SAVING CHANGES... ]</span>
                        ) : (
                            <span>[ SAVE CHANGES ]</span>
                        )}
                    </button>
 
                    <button 
                        type="button"
                        onClick={() => onDelete(currentConcept._id)} 
                        className="w-full bg-transparent hover:bg-red-950/35 text-red-400 hover:text-red-300 text-xs tracking-[0.15em] font-bold font-display uppercase py-2.5 mt-3 border border-red-900/40 hover:border-red-600 transition-all duration-300 flex items-center justify-center space-x-2 rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>[ PURGE NODE ]</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Sidebar;
