import React from "react";

type Task = {
    id: number;
    titre: string;
    description: string;
    priorite: "Basse" | "Moyenne" | "Haute" | "Critique";
    dateLimite: string;
    statut: "À faire" | "En cours" | "Terminée";
    projectId: number;
    assignee: string;
};

const UTILISATEURS = ["Non assigné", "Kris", "Paul", "Tom"];

type EditTaskProps = {
    task: Task | null;
    onSave: (updatedTask: Task) => void;
    onDelete: () => void;
    onClose: () => void;
};

const inputStyle = {
    background: "#1a1d2e",
    border: "1px solid #3a3f6b",
    color: "#ffffffff",
} as React.CSSProperties;

const labelStyle = {
    color: "#ffffffff",
    fontSize: "0.875rem",
    fontWeight: 500,
} as React.CSSProperties;

export default function EditTask({ task, onSave, onDelete, onClose }: EditTaskProps) {
    if (!task) return null;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const updatedTask: Task = {
            ...(task as Task),
            titre: formData.get("titre") as string,
            description: formData.get("description") as string,
            priorite: formData.get("priorite") as Task["priorite"],
            statut: formData.get("statut") as Task["statut"],
            assignee: formData.get("assignee") as string,
        };

        onSave(updatedTask);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.6)" }}>
            <div
                className="p-8 rounded-xl w-full max-w-md overflow-y-auto max-h-screen"
                style={{ background: "#252843", border: "1px solid #3a3f6b" }}
            >
                <h2 className="text-xl font-bold mb-6 text-white">Modifier la tâche</h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="titre" style={labelStyle}>Titre</label>
                        <input
                            type="text"
                            id="titre"
                            name="titre"
                            defaultValue={task.titre}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            required
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="description" style={labelStyle}>Description</label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={task.description}
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all resize-none"
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="priorite" style={labelStyle}>Priorité</label>
                        <select
                            id="priorite"
                            name="priorite"
                            defaultValue={task.priorite}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                        >
                            <option value="Basse">Basse</option>
                            <option value="Moyenne">Moyenne</option>
                            <option value="Haute">Haute</option>
                            <option value="Critique">Critique</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="statut" style={labelStyle}>Statut</label>
                        <select
                            id="statut"
                            name="statut"
                            defaultValue={task.statut}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                        >
                            <option value="À faire">À faire</option>
                            <option value="En cours">En cours</option>
                            <option value="Terminée">Terminée</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="assignee" style={labelStyle}>Assigné à</label>
                        <select
                            id="assignee"
                            name="assignee"
                            defaultValue={task.assignee}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                        >
                            {UTILISATEURS.map((user) => (
                                <option key={user} value={user}>{user}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button
                            type="submit"
                            className="flex-1 py-2.5 rounded-lg font-semibold text-white text-sm transition-all cursor-pointer"
                            style={{ background: "#6366f1" }}
                            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                        >
                            Enregistrer
                        </button>
                        <button
                            type="button"
                            onClick={onDelete}
                            className="flex-1 py-2.5 rounded-lg font-semibold text-white text-sm transition-all cursor-pointer"
                            style={{ background: "#ef4444" }}
                            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                        >
                            Supprimer
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-lg font-semibold text-white text-sm transition-all cursor-pointer"
                            style={{ background: "#2e3154", border: "1px solid #3a3f6b" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#6366f1")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#3a3f6b")}
                        >
                            Fermer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
