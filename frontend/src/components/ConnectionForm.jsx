import { useState } from 'react';

const ConnectionForm = (props) => {
    const { pendingConnection, onSubmit, onCancel } = props;
    const [relationType, setRelationType] = useState('');

    const handleSubmit = () => {
        if (relationType.trim() === '') {
            alert('Relation type cannot be empty');
            return;
        }

        onSubmit({
            ...pendingConnection,
            relationType: relationType.trim()
        });

        setRelationType('');
    }

    const handleCancel = () => {
        setRelationType('');
        onCancel();
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
            {/* Expanded the max-width to max-w-md for a larger popup */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-md shadow-2xl transform transition-all m-4">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="relationType" className="block text-base font-semibold text-gray-200 mb-3">
                            Relation Type
                        </label>
                        <input
                            type="text"
                            id="relationType"
                            value={relationType}
                            onChange={(e) => setRelationType(e.target.value)}
                            placeholder="Define the connection..."
                            className="w-full text-white bg-gray-800 placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                        <p className="text-xs text-gray-400 mt-2 italic">
                            E.g. "causes", "is a part of", "leads to"
                        </p>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-4 pt-2">
                        {/* Cancel Button with Neon White/Gray Hover */}
                        <button 
                            type='button' 
                            onClick={handleCancel} 
                            className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white font-medium py-2.5 px-5 rounded-lg border border-gray-700 hover:border-gray-400 text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                        >
                            Cancel
                        </button>
                        {/* Submit Button with Neon Blue Hover */}
                        <button 
                            type='button' 
                            onClick={handleSubmit} 
                            className="w-full sm:w-auto bg-blue-600 hover:bg-transparent text-white hover:text-blue-400 font-medium py-2.5 px-5 rounded-lg border border-transparent hover:border-blue-500 text-sm shadow-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConnectionForm;