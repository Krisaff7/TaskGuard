"use client";

import Link from "next/link";

const inputStyle = {
    background: "#1a1d2e",
    border: "1px solid #3a3f6b",
    color: "#ffffffff",
} as React.CSSProperties;

const labelStyle = {
    color: "#8b8fa8",
    fontSize: "0.875rem",
    fontWeight: 500,
} as React.CSSProperties;

export default function Reinitialisation() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center px-6" style={{ background: "#1a1d2e" }}>
            {/* Logo */}
            <div className="mb-8 text-center">
                <span className="text-3xl font-bold text-white tracking-tight">
                    Task<span style={{ color: "#6366f1" }}>Guard</span>
                </span>
            </div>

            <div
                className="p-8 sm:p-10 rounded-2xl w-full max-w-md flex flex-col gap-6"
                style={{ background: "#252843", border: "1px solid #3a3f6b" }}
            >
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white">Mot de passe oublié</h1>
                    <p className="mt-2 text-sm" style={{ color: "#ffffffff" }}>
                        Entrez votre email pour obtenir un lien de réinitialisation de mot de passe.
                    </p>
                </div>

                <form className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" style={labelStyle}>Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            placeholder="vous@exemple.com"
                            required
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 w-full py-2.5 rounded-lg font-semibold text-white text-sm transition-all cursor-pointer"
                        style={{ background: "#6366f1" }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                    >
                        Envoyer le lien
                    </button>
                </form>

                <div className="flex justify-center">
                    <Link
                        href="/auth/Connexion"
                        className="text-sm font-medium hover:underline"
                        style={{ color: "#6366f1" }}
                    >
                        Retour à la connexion
                    </Link>
                </div>
            </div>
        </div>
    );
}
