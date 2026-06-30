import { useState } from 'react';
import { registerUser } from "../services/api.js";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            await registerUser(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-obsidian flex items-center justify-center overflow-y-auto relative py-8">
            {/* Cinematic overlays */}
            <div className="dune-grain" />
            <div className="dune-vignette" />

            {/* Ambient background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-spice-orange/3 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-spice-gold/2 blur-[100px] pointer-events-none" />

            {/* Register card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                {/* Decorative corner brackets */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-spice-orange/40" />
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-spice-orange/40" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-spice-orange/40" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-spice-orange/40" />

                {/* Main panel */}
                <div className="bg-linear-to-br from-basalt to-obsidian/95 border border-sardaukar/20 shadow-[0_12px_40px_rgba(0,0,0,0.75)] backdrop-blur-md">
                    {/* Header */}
                    <div className="border-b border-sardaukar/25 bg-basalt/30 backdrop-blur-md px-8 py-6">
                        <div className="flex items-center gap-3 mb-1">
                            {/* Spice glyph */}
                            <div className="w-2 h-2 bg-spice-orange shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
                            <div className="w-1.5 h-1.5 bg-spice-gold/60" />
                            <div className="w-1 h-1 bg-dust-gold/40" />
                        </div>
                        <h1 className="text-sm font-semibold text-plasteel uppercase font-display tracking-[0.2em] mt-3">
                            ConceptMap
                        </h1>
                        <p className="text-[10px] text-sardaukar font-mono-fremen uppercase tracking-[0.15em] mt-1.5">
                            // Generate credentials
                        </p>
                    </div>

                    {/* Scan line animation */}
                    <div className="relative overflow-hidden h-px">
                        <div className="absolute top-0 left-0 h-full w-16 bg-linear-to-r from-transparent via-spice-orange/50 to-transparent animate-[scan-line_4s_ease-in-out_infinite]" />
                    </div>

                    {/* Form body */}
                    <form onSubmit={handleSubmit} className="px-8 py-5 space-y-5">
                        {/* Username field */}
                        <div>
                            <label htmlFor="register-username" className="block text-[10px] tracking-[0.12em] uppercase font-mono-fremen text-spice-gold mb-2">
                                <span className="text-sardaukar/50 text-[9px] mr-1.5">01 //</span> Alias
                            </label>
                            <input
                                id="register-username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
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
                                value={formData.email}
                                onChange={handleChange}
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
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••••"
                                required
                                autoComplete="new-password"
                                className="w-full px-1 py-2 bg-transparent border-b border-sardaukar/30 text-plasteel placeholder:text-sardaukar/40 text-sm focus:outline-none focus:border-spice-orange transition-colors duration-300 font-mono-fremen"
                            />
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="border border-red-900/40 bg-red-950/20 px-4 py-2.5 flex items-center gap-2.5">
                                <div className="w-1.5 h-1.5 bg-red-500 shrink-0 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
                                <p className="text-red-400 text-[11px] font-mono-fremen uppercase tracking-wider">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Submit button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-spice-orange text-obsidian text-xs tracking-[0.15em] font-bold font-display uppercase py-3 border border-spice-orange hover:bg-spice-orange/85 transition-all duration-300 flex items-center justify-center rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dune-shield-hover shadow-[0_4px_12px_rgba(255,107,0,0.15)]"
                            >
                                {loading ? (
                                    <span className="animate-pulse">[ Registering... ]</span>
                                ) : (
                                    <span>[ Create Credentials ]</span>
                                )}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-sardaukar/20" />
                            <span className="text-[9px] text-sardaukar/50 font-mono-fremen uppercase tracking-widest">or</span>
                            <div className="flex-1 h-px bg-sardaukar/20" />
                        </div>

                        {/* Login link */}
                        <p className="text-center text-xs text-sand font-mono-fremen">
                            Already verified?{' '}
                            <Link
                                to="/login"
                                className="text-spice-gold hover:text-spice-orange transition-colors duration-300 uppercase tracking-wider text-[11px] border-b border-spice-gold/30 hover:border-spice-orange pb-0.5"
                            >
                                Login
                            </Link>
                        </p>
                    </form>

                    {/* Footer status bar */}
                    <div className="border-t border-sardaukar/15 px-8 py-3 flex items-center justify-between bg-basalt/20">
                        <span className="text-[9px] text-sardaukar/40 font-mono-fremen uppercase tracking-wider">
                            
                        </span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-emerald-500/60 animate-pulse" />
                            <span className="text-[9px] text-sardaukar/40 font-mono-fremen uppercase tracking-wider">
                                Secure
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;