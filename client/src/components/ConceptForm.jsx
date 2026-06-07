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
        const baseClass = "w-full px-4 py-3 bg-white/4 border rounded-lg text-[#F8FAFC] placeholder-[#94A3B8] transition focus:outline-none focus:ring-3 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]";
        
        if (fieldName === 'title') {
            if (isSubmitted && !formData.title.trim()) {
                return `${baseClass} border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20`;
            }
            if (formData.title.trim()) {
                return `${baseClass} border-[#22C55E]/50 focus:border-[#22C55E] focus:ring-[#22C55E]/20`;
            }
        }
        
        return `${baseClass} border-white/8`;
    };

    return (
        <div className="flex flex-col p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                    <label htmlFor="form-title" className="block text-sm font-medium text-[#94A3B8] mb-2">
                        Title <span className="text-[#EF4444]">*</span>
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
                        <p id="title-error" className="text-xs text-[#EF4444] mt-1.5 font-medium">
                            Title is required.
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="form-description" className="block text-sm font-medium text-[#94A3B8] mb-2">
                        Description
                    </label>
                    <textarea
                        id="form-description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-lg text-[#F8FAFC] placeholder-[#94A3B8] transition resize-none focus:outline-none focus:border-[#14B8A6] focus:ring-3 focus:ring-[#14B8A6]/20"
                        placeholder="Enter concept description"
                    />
                </div>

                <div>
                    <label htmlFor="form-tags" className="block text-sm font-medium text-[#94A3B8] mb-2">
                        Tags
                    </label>
                    <input
                        id="form-tags"
                        type="text"
                        name="tags"
                        value={formData.tags.join(", ")}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-lg text-[#F8FAFC] placeholder-[#94A3B8] transition focus:outline-none focus:border-[#14B8A6] focus:ring-3 focus:ring-[#14B8A6]/20"
                        placeholder="react, javascript, frontend"
                    />
                </div>

                <div>
                    <label htmlFor="form-understandingLevel" className="block text-sm font-medium text-[#94A3B8] mb-2">
                        Understanding Level
                    </label>
                    <select
                        id="form-understandingLevel"
                        name="understandingLevel"
                        value={formData.understandingLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#14B8A6] focus:ring-3 focus:ring-[#14B8A6]/20 transition cursor-pointer"
                    >
                        {understandingLevels.map((level) => (
                            <option key={level} value={level} className="bg-[#0F2030] text-[#F8FAFC]">
                                {level}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#14B8A6] hover:bg-[#0D9488] text-white font-semibold py-3 rounded-xl shadow-[0_0_24px_rgba(20,184,166,0.25)] transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/50 cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Creating...</span>
                            </>
                        ) : (
                            <span>Submit</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConceptForm;
