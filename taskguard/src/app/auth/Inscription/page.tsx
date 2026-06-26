"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inputStyle = {
    background: "#1a1d2e",
    border: "1px solid #3a3f6b",
    color: "#ffffffff",
} as React.CSSProperties;

const labelStyle = { color: "#ffffffff", fontSize: "0.875rem", fontWeight: 500 } as React.CSSProperties;

export default function Inscription() {
    const router = useRouter();
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!nom || !email || !password || !confirmPassword) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("taskguard_users") || "[]");

        if (users.some((u: any) => u.email === email)) {
            setError("Cet email est déjà utilisé.");
            return;
        }

        const newUser = { nom, email, password };
        users.push(newUser);
        localStorage.setItem("taskguard_users", JSON.stringify(users));

        localStorage.setItem("taskguard_logged_in_user", JSON.stringify(newUser));
        window.dispatchEvent(new Event("userChanged"));

        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-10" style={{ background: "#1a1d2e" }}>
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
                <h1 className="text-2xl font-bold text-center text-white">S'inscrire</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" style={labelStyle}>Nom</label>
                        <input
                            id="name"
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            placeholder="Jean Dupont"
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" style={labelStyle}>Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            placeholder="vous@exemple.com"
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" style={labelStyle}>Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            placeholder="••••••••"
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="confirmPassword" style={labelStyle}>Confirmer le mot de passe</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            placeholder="••••••••"
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                        />
                    </div>

                    {error && (
                        <p className="text-sm font-medium" style={{ color: "#ef4444" }}>{error}</p>
                    )}

                    <button
                        type="submit"
                        className="mt-2 w-full py-2.5 rounded-lg font-semibold text-white transition-all"
                        style={{ background: "#6366f1" }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#4f52d8")}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#6366f1")}
                    >
                        S'inscrire
                    </button>
                </form>

                <div className="flex flex-col items-center gap-2 text-sm">
                    <p style={{ color: "#8b8fa8" }}>
                        Vous avez déjà un compte ?{" "}
                        <Link
                            href="./Connexion"
                            className="font-medium hover:underline"
                            style={{ color: "#6366f1" }}
                        >
                            Connectez-vous
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}