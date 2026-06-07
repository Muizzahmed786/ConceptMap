import { useEffect, useRef } from "react";
import ConceptForm from "./ConceptForm.jsx";

const ConceptDrawer = ({ isOpen, onClose, onSubmit, addConceptButtonRef }) => {
    const drawerRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        // Focus the first focusable input inside the drawer
        const focusFirstInput = () => {
            const firstInput = drawerRef.current?.querySelector('input, textarea, select, button');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 50);
            }
        };
        focusFirstInput();

        // Keyboard navigation and trap focus inside the drawer
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }

            if (e.key === "Tab") {
                if (!drawerRef.current) return;
                const focusableElements = drawerRef.current.querySelectorAll(
                    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
                );
                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    // Shift + Tab: Cycle to the end if at the start
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    // Tab: Cycle to the start if at the end
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            // Restore focus to the triggering Add Concept button when drawer closes
            if (addConceptButtonRef?.current) {
                setTimeout(() => addConceptButtonRef.current.focus(), 50);
            }
        };
    }, [isOpen, onClose, addConceptButtonRef]);

    return (
        <>
            {/* Docking spacer for desktop and tablet layouts to shrink canvas width smoothly */}
            <div 
                className={`hidden md:block transition-[width] duration-250 ease-in-out shrink-0 ${
                    isOpen ? "lg:w-100 md:w-85" : "w-0"
                }`}
            />

            {/* The slide-out drawer dialog */}
            <div
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-title"
                className={`absolute top-0 right-0 h-full z-50 bg-[#0F2030]/95 backdrop-blur-lg border-l border-white/8 shadow-2xl transition-transform duration-250 ease-in-out flex flex-col
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                    w-full md:w-85 lg:w-100`}
            >
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-white/8 bg-[#0F2030]/50 backdrop-blur-md">
                    <h2 id="drawer-title" className="text-xl font-semibold text-[#F8FAFC]">
                        Create Concept
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close drawer"
                        className="text-[#94A3B8] hover:text-[#F8FAFC] p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/50"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto">
                    <ConceptForm onSubmit={onSubmit} />
                </div>
            </div>
        </>
    );
};

export default ConceptDrawer;
