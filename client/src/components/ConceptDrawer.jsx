import { useEffect, useRef } from "react";
import ConceptForm from "./ConceptForm.jsx";

const ConceptDrawer = ({ isOpen, onClose, onSubmit, addConceptButtonRef }) => {
    const drawerRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const triggerButton = addConceptButtonRef?.current;

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
            if (triggerButton) {
                setTimeout(() => triggerButton.focus(), 50);
            }
        };
    }, [isOpen, onClose, addConceptButtonRef]);

    return (
        <>
            {/* Backdrop overlay for tablet/mobile */}
            {isOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-obsidian/60 backdrop-blur-xs z-35 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Docking spacer for desktop layouts to shrink canvas width smoothly */}
            <div 
                className={`hidden lg:block transition-[width] duration-300 ease-in-out shrink-0 ${
                    isOpen ? "lg:w-100" : "w-0"
                }`}
            />

            {/* The slide-out drawer dialog */}
            <div
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-title"
                className={`absolute top-0 right-0 h-full z-50 bg-gradient-to-b from-basalt to-obsidian/98 border-l border-sardaukar/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out flex flex-col
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                    w-full sm:w-85 lg:w-100`}
            >
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-sardaukar/25 bg-basalt/30 backdrop-blur-md">
                    <h2 id="drawer-title" className="text-xs font-semibold text-plasteel uppercase font-display tracking-[0.12em]">
                        Create Concept
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close drawer"
                        className="text-sand hover:text-plasteel p-2 rounded-none hover:bg-basalt/30 transition-all border border-transparent hover:border-sardaukar/20 focus:outline-none cursor-pointer"
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
