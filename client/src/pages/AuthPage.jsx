import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api.js';

// Animated SVG representing Novak's concept map hierarchy in a Dune holographic style
const ConceptMapIllustration = () => {
    return (
        <div className="relative border border-sardaukar/20 bg-obsidian/60 p-4 w-full max-w-lg aspect-[4/3] flex flex-col justify-between overflow-hidden shadow-[inset_0_0_20px_rgba(255,107,0,0.05)] select-none">
            {/* Dot grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(139,134,128,0.15)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            {/* Glowing backdrop elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-spice-orange/5 blur-[50px] pointer-events-none" />

            {/* Scanline sweep */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="h-px w-full bg-linear-to-r from-transparent via-spice-orange/20 to-transparent absolute top-0 left-0 animate-[scan-line_6s_ease-in-out_infinite]" />
            </div>

            {/* Holographic Header */}
            <div className="relative z-10 flex justify-between items-center text-[9px] font-mono-fremen text-sardaukar tracking-wider border-b border-sardaukar/10 pb-2">
                <span>[ ARRAKIS COGNITIVE LAYER ]</span>
                <span className="text-spice-orange animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-spice-orange" />
                    LIVE MODEL
                </span>
            </div>

            {/* SVG Content */}
            <svg viewBox="0 0 400 300" className="w-full h-full relative z-10">
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#D4AF37" />
                    </marker>
                </defs>

                {/* Animated Connections (Lines) using dash-flow animation from index.css */}
                {/* Concept Maps -> consists of -> Concepts */}
                <path d="M 200 65 L 110 125" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="6" fill="none" markerEnd="url(#arrow)" className="animate-[dash-flow_5s_linear_infinite]" />
                
                {/* Concept Maps -> consists of -> Linking Words */}
                <path d="M 200 65 L 290 125" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="6" fill="none" markerEnd="url(#arrow)" className="animate-[dash-flow_5s_linear_infinite]" />

                {/* Concepts -> combines to form -> Propositions */}
                <path d="M 110 160 L 200 225" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="6" fill="none" markerEnd="url(#arrow)" className="animate-[dash-flow_5s_linear_infinite]" />

                {/* Linking Words -> combines to form -> Propositions */}
                <path d="M 290 160 L 200 225" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="6" fill="none" markerEnd="url(#arrow)" className="animate-[dash-flow_5s_linear_infinite]" />

                {/* Connecting text boxes (Linking Words labels) */}
                <g>
                    <rect x="120" y="80" width="60" height="14" fill="#121212" stroke="#2B2A29" strokeWidth="1" />
                    <text x="150" y="90" fill="#D4AF37" fontSize="8" textAnchor="middle" letterSpacing="0.05em" className="font-mono-fremen select-none">CONSISTS OF</text>
                </g>

                <g>
                    <rect x="220" y="80" width="60" height="14" fill="#121212" stroke="#2B2A29" strokeWidth="1" />
                    <text x="250" y="90" fill="#D4AF37" fontSize="8" textAnchor="middle" letterSpacing="0.05em" className="font-mono-fremen select-none">CONSISTS OF</text>
                </g>

                <g>
                    <rect x="95" y="185" width="75" height="14" fill="#121212" stroke="#2B2A29" strokeWidth="1" />
                    <text x="132" y="195" fill="#D4AF37" fontSize="8" textAnchor="middle" letterSpacing="0.05em" className="font-mono-fremen select-none">COMBINES TO</text>
                </g>

                <g>
                    <rect x="230" y="185" width="75" height="14" fill="#121212" stroke="#2B2A29" strokeWidth="1" />
                    <text x="267" y="195" fill="#D4AF37" fontSize="8" textAnchor="middle" letterSpacing="0.05em" className="font-mono-fremen select-none">COMBINES TO</text>
                </g>

                {/* Nodes (Concepts) */}
                {/* Node 1: Concept Maps */}
                <g className="cursor-pointer group">
                    <rect x="130" y="30" width="140" height="35" fill="#2B2A29" stroke="#FF6B00" strokeWidth="1.5" className="filter drop-shadow-[0_0_6px_rgba(255,107,0,0.3)] transition-all duration-300 hover:fill-basalt hover:stroke-spice-gold" />
                    <text x="200" y="51" fill="#F4F0EA" fontSize="9" textAnchor="middle" letterSpacing="0.1em" className="font-display font-semibold select-none">CONCEPT MAPS</text>
                </g>

                {/* Node 2: Concepts */}
                <g className="cursor-pointer group">
                    <rect x="50" y="125" width="120" height="35" fill="#2B2A29" stroke="#FF6B00" strokeWidth="1.5" className="filter drop-shadow-[0_0_6px_rgba(255,107,0,0.3)] transition-all duration-300 hover:fill-basalt hover:stroke-spice-gold" />
                    <text x="110" y="146" fill="#F4F0EA" fontSize="8.5" textAnchor="middle" letterSpacing="0.1em" className="font-display font-semibold select-none">CONCEPTS</text>
                </g>

                {/* Node 3: Linking Words */}
                <g className="cursor-pointer group">
                    <rect x="230" y="125" width="120" height="35" fill="#2B2A29" stroke="#FF6B00" strokeWidth="1.5" className="filter drop-shadow-[0_0_6px_rgba(255,107,0,0.3)] transition-all duration-300 hover:fill-basalt hover:stroke-spice-gold" />
                    <text x="290" y="146" fill="#F4F0EA" fontSize="8" textAnchor="middle" letterSpacing="0.05em" className="font-display font-semibold select-none">LINKING WORDS</text>
                </g>

                {/* Node 4: Propositions */}
                <g className="cursor-pointer group">
                    <rect x="120" y="225" width="160" height="35" fill="#2B2A29" stroke="#FF6B00" strokeWidth="1.5" className="filter drop-shadow-[0_0_6px_rgba(255,107,0,0.3)] transition-all duration-300 hover:fill-basalt hover:stroke-spice-gold" />
                    <text x="200" y="246" fill="#F4F0EA" fontSize="8.5" textAnchor="middle" letterSpacing="0.1em" className="font-display font-semibold select-none">PROPOSITIONS</text>
                </g>
            </svg>

            {/* Holographic Footer */}
            <div className="relative z-10 flex justify-between items-center text-[8px] font-mono-fremen text-sardaukar/60 border-t border-sardaukar/10 pt-2">
                <span>SYSTEM: COGNITIVE GRAPH V4.3</span>
                <span>STATUS: SECURED</span>
            </div>
        </div>
    );
};

const AuthPage = ({ mode = "login" }) => {
    const navigate = useNavigate();
    const isRegister = mode === "register";

    // Login Form State
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    // Register Form State
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
    const [registerError, setRegisterError] = useState('');
    const [registerLoading, setRegisterLoading] = useState(false);

    // Handle Input Changes
    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    // Handle Submits
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError('');
        try {
            const response = await loginUser(loginData);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (err) {
            setLoginError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoginLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setRegisterLoading(true);
        setRegisterError('');
        try {
            await registerUser(registerData);
            // On success, redirect to login page with smooth transition
            navigate('/login');
            // Clear register form
            setRegisterData({ username: '', email: '', password: '' });
        } catch (err) {
            setRegisterError(err.response?.data?.message || 'Registration failed');
        } finally {
            setRegisterLoading(false);
        }
    };

    // Clear errors when swapping modes
    useEffect(() => {
        setLoginError('');
        setRegisterError('');
    }, [mode]);

    return (
        <div className="h-screen bg-obsidian overflow-y-auto relative">
            {/* Cinematic overlays */}
            <div className="dune-grain" />
            <div className="dune-vignette" />

            {/* Ambient background glows */}
            <div className="absolute top-1/4 left-1/4 w-120 h-120 rounded-full bg-spice-orange/3 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-120 h-120 rounded-full bg-spice-gold/2 blur-[100px] pointer-events-none" />

            {/* Scrolling inner wrapper */}
            <div className="min-h-full w-full flex items-center justify-center py-12 px-4 lg:px-8">
                {/* Main Content Grid Container */}
                <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Left Side: Concept Map Guide (order-2 on mobile so Auth displays first) */}
                <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col space-y-8 text-left">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 bg-spice-orange shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
                            <div className="w-2 h-2 bg-spice-gold/60" />
                            <div className="w-1.5 h-1.5 bg-dust-gold/40" />
                            <span className="text-[10px] text-sardaukar font-mono-fremen uppercase tracking-[0.2em]">// INTELLIGENCE REPORT</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-plasteel uppercase font-display tracking-wider">
                            Structuring Knowledge
                        </h1>
                        <p className="text-sm text-sand leading-relaxed max-w-xl font-body">
                            A Concept Map represents relationships between ideas. Connecting concepts with linking phrases creates propositions, transforming raw information into organized, navigable structures.
                        </p>
                    </div>

                    {/* Animated SVG Diagram */}
                    <div className="w-full">
                        <ConceptMapIllustration />
                    </div>

                    {/* Key Usecases */}
                    <div className="space-y-4">
                        <h2 className="text-xs font-semibold text-spice-gold uppercase font-display tracking-widest">// STRATEGIC USE CASES</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border border-sardaukar/10 bg-basalt/10 p-4 hover:border-spice-orange/45 transition-colors duration-300">
                                <h3 className="text-xs font-bold text-plasteel uppercase tracking-wider mb-2 font-mono-fremen">01 // Mentat Analysis</h3>
                                <p className="text-[11px] text-sardaukar leading-normal font-body">Deconstruct complex, multi-tiered systems into logical hierarchies.</p>
                            </div>
                            <div className="border border-sardaukar/10 bg-basalt/10 p-4 hover:border-spice-orange/45 transition-colors duration-300">
                                <h3 className="text-xs font-bold text-plasteel uppercase tracking-wider mb-2 font-mono-fremen">02 // Mission Planning</h3>
                                <p className="text-[11px] text-sardaukar leading-normal font-body">Map tactical dependencies, resources, and routes through hazardous domains.</p>
                            </div>
                            <div className="border border-sardaukar/10 bg-basalt/10 p-4 hover:border-spice-orange/45 transition-colors duration-300">
                                <h3 className="text-xs font-bold text-plasteel uppercase tracking-wider mb-2 font-mono-fremen">03 // Lore Synthesis</h3>
                                <p className="text-[11px] text-sardaukar leading-normal font-body">Preserve historical records, connections, and Bene Gesserit timelines.</p>
                            </div>
                        </div>
                    </div>

                    {/* How to use */}
                    <div className="space-y-2 border-t border-sardaukar/10 pt-6">
                        <h2 className="text-xs font-semibold text-spice-gold uppercase font-display tracking-widest mb-4">// HOW TO NAVIGATE</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[11px] text-sardaukar font-mono-fremen">
                            <div className="flex items-start gap-2">
                                <span className="text-spice-orange font-bold">1/</span>
                                <span>Create alias nodes representing core ideas.</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-spice-orange font-bold">2/</span>
                                <span>Draw pathways to connect related concepts.</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-spice-orange font-bold">3/</span>
                                <span>Label connections with logical link phrases.</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-spice-orange font-bold">4/</span>
                                <span>Deepen hierarchy to map entire knowledge systems.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Auth Card Container */}
                <div className="order-1 lg:order-2 lg:col-span-5 w-full flex justify-center">
                    <div className="relative w-full max-w-md">
                        {/* Decorative corner brackets */}
                        <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-spice-orange/40 pointer-events-none" />
                        <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-spice-orange/40 pointer-events-none" />
                        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-spice-orange/40 pointer-events-none" />
                        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-spice-orange/40 pointer-events-none" />

                        {/* Main panel */}
                        <div className="bg-linear-to-br from-basalt to-obsidian/95 border border-sardaukar/20 shadow-[0_12px_40px_rgba(0,0,0,0.75)] backdrop-blur-md overflow-hidden">
                            
                            {/* Segmented Toggle Control */}
                            <div className="flex border-b border-sardaukar/20 relative bg-basalt/30 select-none">
                                <button
                                    onClick={() => navigate('/login')}
                                    className={`flex-1 text-center py-4 text-[10px] font-bold font-display uppercase tracking-widest transition-colors duration-300 relative z-10 cursor-pointer ${!isRegister ? 'text-obsidian' : 'text-sardaukar hover:text-plasteel'}`}
                                >
                                    Authenticate
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className={`flex-1 text-center py-4 text-[10px] font-bold font-display uppercase tracking-widest transition-colors duration-300 relative z-10 cursor-pointer ${isRegister ? 'text-obsidian' : 'text-sardaukar hover:text-plasteel'}`}
                                >
                                    Register
                                </button>
                                {/* Sliding highlight bar */}
                                <div 
                                    className="absolute top-0 bottom-0 left-0 w-1/2 bg-spice-orange transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
                                    style={{ transform: isRegister ? 'translateX(100%)' : 'translateX(0%)' }}
                                />
                            </div>

                            {/* Scan line visual animation */}
                            <div className="relative overflow-hidden h-px">
                                <div className="absolute top-0 left-0 h-full w-16 bg-linear-to-r from-transparent via-spice-orange/50 to-transparent animate-[scan-line_4s_ease-in-out_infinite]" />
                            </div>

                            {/* Sliding Carousel Body */}
                            <div className="relative overflow-hidden w-full">
                                <div 
                                    className="flex transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) w-[200%]"
                                    style={{ transform: isRegister ? 'translateX(-50%)' : 'translateX(0%)' }}
                                >
                                    {/* 1. Login Form (Width: 50% of the w-[200%] container) */}
                                    <div className="w-1/2 shrink-0 px-8 py-6 space-y-6">
                                        <div className="space-y-1">
                                            <h3 className="text-xs font-bold text-plasteel uppercase tracking-wider font-mono-fremen">// SECURE ENTRY</h3>
                                            <p className="text-[10px] text-sardaukar font-mono-fremen uppercase tracking-wider">Please input your system credentials</p>
                                        </div>

                                        <form onSubmit={handleLoginSubmit} className="space-y-5">
                                            {/* Email field */}
                                            <div>
                                                <label htmlFor="login-email" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-2">
                                                    <span className="text-sardaukar/50 text-[9px] mr-1.5">01 //</span> Identifier
                                                </label>
                                                <input
                                                    id="login-email"
                                                    type="email"
                                                    name="email"
                                                    value={loginData.email}
                                                    onChange={handleLoginChange}
                                                    placeholder="user@example.com"
                                                    required
                                                    autoComplete="email"
                                                    className="w-full px-1 py-2 bg-transparent border-b border-sardaukar/30 text-plasteel placeholder:text-sardaukar/40 text-sm focus:outline-none focus:border-spice-orange transition-colors duration-300 font-mono-fremen"
                                                />
                                            </div>

                                            {/* Password field */}
                                            <div>
                                                <label htmlFor="login-password" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-2">
                                                    <span className="text-sardaukar/50 text-[9px] mr-1.5">02 //</span> Passkey
                                                </label>
                                                <input
                                                    id="login-password"
                                                    type="password"
                                                    name="password"
                                                    value={loginData.password}
                                                    onChange={handleLoginChange}
                                                    placeholder="••••••••••"
                                                    required
                                                    autoComplete="current-password"
                                                    className="w-full px-1 py-2 bg-transparent border-b border-sardaukar/30 text-plasteel placeholder:text-sardaukar/40 text-sm focus:outline-none focus:border-spice-orange transition-colors duration-300 font-mono-fremen"
                                                />
                                            </div>

                                            {/* Error message */}
                                            {loginError && (
                                                <div className="border border-red-900/40 bg-red-950/20 px-4 py-2.5 flex items-center gap-2.5">
                                                    <div className="w-1.5 h-1.5 bg-red-500 shrink-0 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
                                                    <p className="text-red-400 text-[11px] font-mono-fremen uppercase tracking-wider">
                                                        {loginError}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Submit button */}
                                            <div className="pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={loginLoading}
                                                    className="w-full bg-spice-orange text-obsidian text-xs tracking-[0.15em] font-bold font-display uppercase py-3.5 border border-spice-orange hover:bg-spice-orange/85 transition-all duration-300 flex items-center justify-center rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dune-shield-hover shadow-[0_4px_12px_rgba(255,107,0,0.15)]"
                                                >
                                                    {loginLoading ? (
                                                        <span className="animate-pulse">[ Authenticating... ]</span>
                                                    ) : (
                                                        <span>[ Authenticate ]</span>
                                                    )}
                                                </button>
                                            </div>
                                        </form>

                                        <p className="text-center text-xs text-sand font-mono-fremen">
                                            No access credentials?{' '}
                                            <button
                                                onClick={() => navigate('/register')}
                                                className="text-spice-gold hover:text-spice-orange transition-colors duration-300 uppercase tracking-wider text-[11px] border-b border-spice-gold/30 hover:border-spice-orange pb-0.5 cursor-pointer bg-transparent"
                                            >
                                                Register
                                            </button>
                                        </p>
                                    </div>

                                    {/* 2. Register Form (Width: 50% of the w-[200%] container) */}
                                    <div className="w-1/2 shrink-0 px-8 py-6 space-y-6">
                                        <div className="space-y-1">
                                            <h3 className="text-xs font-bold text-plasteel uppercase tracking-wider font-mono-fremen">// ESTABLISH ENTRY</h3>
                                            <p className="text-[10px] text-sardaukar font-mono-fremen uppercase tracking-wider">Generate new identification sequence</p>
                                        </div>

                                        <form onSubmit={handleRegisterSubmit} className="space-y-5">
                                            {/* Username field */}
                                            <div>
                                                <label htmlFor="register-username" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-2">
                                                    <span className="text-sardaukar/50 text-[9px] mr-1.5">01 //</span> Alias
                                                </label>
                                                <input
                                                    id="register-username"
                                                    type="text"
                                                    name="username"
                                                    value={registerData.username}
                                                    onChange={handleRegisterChange}
                                                    placeholder="muad_dib"
                                                    required
                                                    autoComplete="username"
                                                    className="w-full px-1 py-2 bg-transparent border-b border-sardaukar/30 text-plasteel placeholder:text-sardaukar/40 text-sm focus:outline-none focus:border-spice-orange transition-colors duration-300 font-mono-fremen"
                                                />
                                            </div>

                                            {/* Email field */}
                                            <div>
                                                <label htmlFor="register-email" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-2">
                                                    <span className="text-sardaukar/50 text-[9px] mr-1.5">02 //</span> Identifier
                                                </label>
                                                <input
                                                    id="register-email"
                                                    type="email"
                                                    name="email"
                                                    value={registerData.email}
                                                    onChange={handleRegisterChange}
                                                    placeholder="user@example.com"
                                                    required
                                                    autoComplete="email"
                                                    className="w-full px-1 py-2 bg-transparent border-b border-sardaukar/30 text-plasteel placeholder:text-sardaukar/40 text-sm focus:outline-none focus:border-spice-orange transition-colors duration-300 font-mono-fremen"
                                                />
                                            </div>

                                            {/* Password field */}
                                            <div>
                                                <label htmlFor="register-password" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-2">
                                                    <span className="text-sardaukar/50 text-[9px] mr-1.5">03 //</span> Passkey
                                                </label>
                                                <input
                                                    id="register-password"
                                                    type="password"
                                                    name="password"
                                                    value={registerData.password}
                                                    onChange={handleRegisterChange}
                                                    placeholder="••••••••••"
                                                    required
                                                    autoComplete="new-password"
                                                    className="w-full px-1 py-2 bg-transparent border-b border-sardaukar/30 text-plasteel placeholder:text-sardaukar/40 text-sm focus:outline-none focus:border-spice-orange transition-colors duration-300 font-mono-fremen"
                                                />
                                            </div>

                                            {/* Error message */}
                                            {registerError && (
                                                <div className="border border-red-900/40 bg-red-950/20 px-4 py-2.5 flex items-center gap-2.5">
                                                    <div className="w-1.5 h-1.5 bg-red-500 shrink-0 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
                                                    <p className="text-red-400 text-[11px] font-mono-fremen uppercase tracking-wider">
                                                        {registerError}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Submit button */}
                                            <div className="pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={registerLoading}
                                                    className="w-full bg-spice-orange text-obsidian text-xs tracking-[0.15em] font-bold font-display uppercase py-3.5 border border-spice-orange hover:bg-spice-orange/85 transition-all duration-300 flex items-center justify-center rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dune-shield-hover shadow-[0_4px_12px_rgba(255,107,0,0.15)]"
                                                >
                                                    {registerLoading ? (
                                                        <span className="animate-pulse">[ Registering... ]</span>
                                                    ) : (
                                                        <span>[ Create Credentials ]</span>
                                                    )}
                                                </button>
                                            </div>
                                        </form>

                                        <p className="text-center text-xs text-sand font-mono-fremen">
                                            Already verified?{' '}
                                            <button
                                                onClick={() => navigate('/login')}
                                                className="text-spice-gold hover:text-spice-orange transition-colors duration-300 uppercase tracking-wider text-[11px] border-b border-spice-gold/30 hover:border-spice-orange pb-0.5 cursor-pointer bg-transparent"
                                            >
                                                Login
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Status Bar */}
                            <div className="border-t border-sardaukar/15 px-8 py-3 flex items-center justify-between bg-basalt/20 select-none">
                                <span className="text-[9px] text-sardaukar/40 font-mono-fremen uppercase tracking-wider">
                                    SYSTEM READY
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-emerald-500/60 animate-pulse" />
                                    <span className="text-[9px] text-sardaukar/40 font-mono-fremen uppercase tracking-wider">
                                        SECURE SHIELD
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default AuthPage;
