"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
    { href: "/dashboard", label: "Accueil" },
    { href: "/projets", label: "Projets" },
    { href: "/settings", label: "Paramètres" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav style={{ background: "#1e2140", borderBottom: "1px solid #3a3f6b" }} className="w-full relative">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <span className="text-lg font-bold text-white tracking-tight select-none">
                    Task<span style={{ color: "#6366f1" }}>Guard</span>
                </span>

                {/* Liens desktop */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium cursor-pointer transition-colors text-white"
                            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#6366f1")}
                            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#ffffff")}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Bouton burger mobile */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Menu mobile déroulant */}
            {isOpen && (
                <div
                    className="md:hidden flex flex-col px-6 pb-4 gap-4"
                    style={{ background: "#1e2140" }}
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}