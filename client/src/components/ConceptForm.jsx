import { useState } from 'react';

const understandingLevels = ['Beginner', 'Intermediate', 'Advanced'];

const ConceptForm = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: [],
        understandingLevel: understandingLevels[0]
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true);

        // Simple validation check: title is required
        if (!formData.title.trim()) {
            return;
        }

        setLoading(true);
        try {
            await props.onSubmit(formData);
            setFormData({
                title: '',
                description: '',
                tags: [],
                understandingLevel: understandingLevels[0]
            });
        } finally {
            setLoading(false);
            setIsSubmitted(false);
        }
    };

    // Helper to determine validation border color classes
    const getInputClass = (fieldName) => {
        const baseClass = "w-full px-1 py-1.5 bg-transparent border-b text-plasteel placeholder:text-sardaukar/60 transition-colors focus:outline-none font-mono-fremen text-sm";
        
        if (fieldName === 'title') {
            if (isSubmitted && !formData.title.trim()) {
                return `${baseClass} border-red-500/80 focus:border-red-500`;
            }
            if (formData.title.trim()) {
                return `${baseClass} border-sardaukar/50 focus:border-spice-orange`;
            }
        }
        
        return `${baseClass} border-sardaukar/30 focus:border-spice-orange`;
    };

    return (
        <div className="flex flex-col h-full overflow-hidden p-6">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden" noValidate>
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-2">
                    <div>
                        <label htmlFor="form-title" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-1">
                            <span className="text-sardaukar/50 text-[9px] mr-1.5 font-mono">01 //</span> Title <span className="text-spice-orange">*</span>
                        </label>
                        <input
                            id="form-title"
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className={getInputClass('title')}
                            placeholder="Enter concept title"
                            aria-required="true"
                            aria-invalid={isSubmitted && !formData.title.trim() ? "true" : "false"}
                            aria-describedby={isSubmitted && !formData.title.trim() ? "title-error" : undefined}
                        />
                        {isSubmitted && !formData.title.trim() && (
                            <p id="title-error" className="text-xs text-red-400/90 mt-2 font-mono-fremen uppercase tracking-wider">
                                Title is required.
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="form-description" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-1">
                            <span className="text-sardaukar/50 text-[9px] mr-1.5 font-mono">02 //</span> Description
                        </label>
                        <textarea
                            id="form-description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-1 py-1.5 bg-transparent border-b border-sardaukar/30 text-plasteel placeholder:text-sardaukar/60 transition-colors resize-none focus:outline-none focus:border-spice-orange font-mono-fremen text-sm"
                            placeholder="Enter concept description"
                        />
                    </div>

                    <div>
                        <label htmlFor="form-tags" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-1">
                            <span className="text-sardaukar/50 text-[9px] mr-1.5 font-mono">03 //</span> Tags
                        </label>
                        <input
                            id="form-tags"
                            type="text"
                            name="tags"
                            value={formData.tags.join(", ")}
                            onChange={handleChange}
                            className="w-full px-1 py-1.5 bg-transparent border-b border-sardaukar/30 text-plasteel placeholder:text-sardaukar/60 transition-colors focus:outline-none focus:border-spice-orange font-mono-fremen text-sm"
                            placeholder="e.g. stillsuit, melange, arrakis"
                        />
                    </div>

                    <div>
                        <label htmlFor="form-understandingLevel" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-1">
                            <span className="text-sardaukar/50 text-[9px] mr-1.5 font-mono">04 //</span> Cognitive Depth
                        </label>
                        <select
                            id="form-understandingLevel"
                            name="understandingLevel"
                            value={formData.understandingLevel}
                            onChange={handleChange}
                            className="w-full px-1 py-1.5 bg-transparent border-b border-sardaukar/30 text-plasteel focus:outline-none focus:border-spice-orange transition-colors cursor-pointer font-mono-fremen text-sm"
                        >
                            {understandingLevels.map((level) => (
                                <option key={level} value={level} className="bg-obsidian text-plasteel">
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pt-4 border-t border-sardaukar/25 mt-3 shrink-0">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-spice-orange text-obsidian text-xs tracking-[0.15em] font-bold font-display uppercase py-2.5 border border-spice-orange hover:bg-spice-orange/85 transition-all duration-300 flex items-center justify-center space-x-2 rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dune-shield-hover shadow-[0_4px_12px_rgba(255,107,0,0.15)]"
                    >
                        {loading ? (
                            <span className="animate-pulse">[ INITIALIZING INGESTION... ]</span>
                        ) : (
                            <span>[ CREATE CONCEPT ]</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConceptForm;
