"use client";

import Navbar from "@/components/ui/navbar";
import { Search, ListTodo, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useProjects } from "@/components/lib/projects-context";
import { useState } from "react";

export default function Dashboard() {
    const { projects, tasks } = useProjects();
    const [searchQuery, setSearchQuery] = useState("");

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.statut === "Terminée").length;
    const inProgressTasks = tasks.filter((t) => t.statut === "En cours").length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdueTasks = tasks.filter((t) => {
        if (t.statut === "Terminée" || !t.dateLimite) return false;
        const limitDate = new Date(t.dateLimite);
        limitDate.setHours(0, 0, 0, 0);
        return limitDate < today;
    }).length;

    const filteredProjects = projects.filter((p) =>
        p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = [
        { label: "Tâches totales",  value: totalTasks,      icon: <ListTodo    className="w-5 h-5" style={{ color: "#6366f1" }} />, accent: "#6366f1" },
        { label: "Terminées",       value: completedTasks,   icon: <CheckCircle className="w-5 h-5" style={{ color: "#22c55e" }} />, accent: "#22c55e" },
        { label: "En cours",        value: inProgressTasks,  icon: <Clock       className="w-5 h-5" style={{ color: "#f59e0b" }} />, accent: "#f59e0b" },
        { label: "En retard",       value: overdueTasks,     icon: <AlertTriangle className="w-5 h-5" style={{ color: "#ef4444" }} />, accent: "#ef4444" },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col" style={{ background: "#1a1d2e" }}>
            <Navbar />

            <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 py-10 px-6">
                <h1 className="text-4xl font-bold text-white">Dashboard</h1>

                {/* Statistiques */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold text-white">Mes Statistiques</h2>
                    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                className="rounded-xl p-5 flex flex-col gap-3"
                                style={{ background: "#252843", border: "1px solid #3a3f6b" }}
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium" style={{ color: "#8b8fa8" }}>{s.label}</p>
                                    {s.icon}
                                </div>
                                <p className="text-3xl font-bold text-white">{s.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projets */}
                <section className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-xl font-semibold text-white">Mes Projets</h2>

                        {/* Barre de recherche */}
                        <div className="relative w-full sm:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4" style={{ color: "#ffffffff" }} />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher un projet..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 text-sm text-white placeholder-[#8b8fa8] rounded-lg outline-none transition-all"
                                style={{
                                    background: "#1a1d2e",
                                    border: "1px solid #3a3f6b",
                                    color:"#ffffffff"
                                }}
                                onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                                onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                            />
                        </div>
                    </div>

                    <div
                        className="w-full rounded-xl p-6"
                        style={{ background: "#252843", border: "1px solid #3a3f6b" }}
                    >
                        {filteredProjects.length === 0 ? (
                            <div className="text-center py-4">
                                <p style={{ color: "#8b8fa8" }}>Aucun projet trouvé.</p>
                                <Link
                                    href="/projets"
                                    className="mt-2 inline-block text-sm font-medium hover:underline"
                                    style={{ color: "#6366f1" }}
                                >
                                    Voir tous mes projets
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {filteredProjects.map((project) => (
                                    <Link
                                        key={project.id}
                                        href={`/projets?projectId=${project.id}`}
                                        className="block p-4 rounded-lg transition-all"
                                        style={{
                                            background: "#2e3154",
                                            border: "1px solid #3a3f6b",
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.borderColor = "#6366f1";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.borderColor = "#3a3f6b";
                                        }}
                                    >
                                        <h3 className="font-bold text-white truncate">{project.nom}</h3>
                                        <p className="text-sm mt-1 line-clamp-2" style={{ color: "#8b8fa8" }}>
                                            {project.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}