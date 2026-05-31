import { useState, useEffect } from 'react';

const understandingLevels = ['Beginner', 'Intermediate', 'Advanced'];

const Sidebar = (props) => {
    const { currentConcept, onSave, onClose } = props;
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: [],
        understandingLevel: 'Beginner'
    });
    const [isSaving, setIsSaving] = useState(false);

    // Sync input states when the selected concept changes
    useEffect(() => {
        if (currentConcept) {
            setFormData({
                title: currentConcept.title || '',
                description: currentConcept.description || '',
                tags: currentConcept.tags || [],
                understandingLevel: currentConcept.understandingLevel || 'Beginner'
            });
        }
    }, [currentConcept]);

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

    if (!currentConcept) return null;

    return (
        <div className="w-80 bg-[#0F2030] border-l border-white/8 h-full rounded-tl-3xl rounded-bl-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6 flex flex-col relative z-20">
            {/* Close Button */}
            <button
                onClick={onClose}
                aria-label="Close details"
                className="absolute top-6 right-6 text-[#94A3B8] hover:text-[#F8FAFC] p-1.5 rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h2 className="text-xl font-semibold text-[#F8FAFC] mb-6">Concept Details</h2>

            <form onSubmit={handleSave} className="space-y-5 flex-1 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="edit-title" className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                            Title
                        </label>
                        <input
                            id="edit-title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-lg text-[#F8FAFC] placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="edit-description" className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                            Description
                        </label>
                        <textarea
                            id="edit-description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-lg text-[#F8FAFC] placeholder-[#94A3B8] text-sm resize-none focus:outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="edit-tags" className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                            Tags (comma separated)
                        </label>
                        <input
                            id="edit-tags"
                            type="text"
                            name="tags"
                            value={formData.tags.join(', ')}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-lg text-[#F8FAFC] placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="edit-understandingLevel" className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                            Understanding Level
                        </label>
                        <select
                            id="edit-understandingLevel"
                            name="understandingLevel"
                            value={formData.understandingLevel}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-white/4 border border-white/8 rounded-lg text-[#F8FAFC] text-sm focus:outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 transition cursor-pointer"
                        >
                            {understandingLevels.map((level) => (
                                <option key={level} value={level} className="bg-[#0F2030] text-[#F8FAFC]">
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSaving || !formData.title.trim()}
                        className="w-full bg-[#14B8A6] hover:bg-[#0D9488] text-white text-sm font-semibold py-2.5 rounded-xl shadow-[0_0_16px_rgba(20,184,166,0.2)] transition duration-200 flex items-center justify-center space-x-1.5 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Saving...</span>
                            </>
                        ) : (
                            <span>Save Changes</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Sidebar;