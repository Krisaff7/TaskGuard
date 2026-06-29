type Project = {
    id: number;
    nom: string;
    description: string;
    dateCreation?: string;
};

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

type ProjectDetailProps = {
    project: Project | null;
    tasks: Task[];
    onCreateTask: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onClose: () => void;
    onTaskClick: (task: Task) => void;
};

const PRIORITE_COLORS: Record<string, string> = {
    Basse:    "#22c55e",
    Moyenne:  "#f59e0b",
    Haute:    "#f97316",
    Critique: "#ef4444",
};

const STATUT_COLORS: Record<string, string> = {
    "À faire":  "#4960f9ff",
    "En cours": "#ecf163ff",
    "Terminée": "#22c55e",
};

export default function ProjectDetail({
    project,
    tasks,
    onCreateTask,
    onEdit,
    onDelete,
    onClose,
    onTaskClick,
}: ProjectDetailProps) {
    if (!project) return null;

    const projectTasks = tasks.filter((t) => t.projectId === project.id);

    return (
        <div
            className="w-full fixed inset-0 flex flex-col items-center justify-start overflow-y-auto p-6"
            style={{ background: "#1a1d2e", paddingTop: "100px" }}
        >
            {/* Header */}
            <div
                className="p-6 rounded-xl w-full max-w-2xl mb-4"
                style={{ background: "#252843", border: "1px solid #3a3f6b", }}
            >
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-white">{project.nom}</h2>
                    {project.dateCreation && (
                        <span
                            className="text-xs font-medium px-2 py-1 rounded"
                            style={{ background: "#2e3154", color: "#8b8fa8" }}
                        >
                            {new Date(project.dateCreation).toLocaleDateString("fr-FR")}
                        </span>
                    )}
                </div>
                <p className="mt-2 text-sm" style={{ color: "#8b8fa8" }}>{project.description}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full max-w-2xl mb-4">
                <button
                    onClick={onCreateTask}
                    className="flex-1 py-2 rounded-lg font-medium text-white text-sm transition-all cursor-pointer"
                    style={{ background: "#22c55e" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                >
                    Créer tâche
                </button>
                <button
                    onClick={onEdit}
                    className="flex-1 py-2 rounded-lg font-medium text-white text-sm transition-all cursor-pointer"
                    style={{ background: "#6366f1" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                >
                    Modifier projet
                </button>
                <button
                    onClick={onDelete}
                    className="flex-1 py-2 rounded-lg font-medium text-white text-sm transition-all cursor-pointer"
                    style={{ background: "#ef4444" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                >
                    Supprimer
                </button>
            </div>

            {/* Tâches */}
            <div className="w-full max-w-2xl flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8b8fa8" }}>
                    Tâches ({projectTasks.length})
                </h3>

                {projectTasks.length === 0 ? (
                    <p className="text-sm italic" style={{ color: "#8b8fa8" }}>
                        Aucune tâche pour ce projet.
                    </p>
                ) : (
                    projectTasks.map((task) => (
                        <button
                            key={task.id}
                            onClick={() => onTaskClick(task)}
                            className="text-left w-full p-4 rounded-xl transition-all cursor-pointer"
                            style={{ background: "#252843", border: "1px solid #3a3f6b" }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = "#6366f1";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = "#3a3f6b";
                            }}
                        >
                            <p className="font-semibold text-white">{task.titre}</p>
                            {task.description && (
                                <p className="text-sm mt-1 line-clamp-2" style={{ color: "#8b8fa8" }}>
                                    {task.description}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span
                                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                                    style={{ background: `${STATUT_COLORS[task.statut]}22`, color: STATUT_COLORS[task.statut] }}
                                >
                                    {task.statut}
                                </span>
                                <span
                                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                                    style={{ background: `${PRIORITE_COLORS[task.priorite]}22`, color: PRIORITE_COLORS[task.priorite] }}
                                >
                                    {task.priorite}
                                </span>
                                {task.dateLimite && (
                                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#2e3154", color: "#8b8fa8" }}>
                                        Échéance : {new Date(task.dateLimite).toLocaleDateString("fr-FR")}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))
                )}
            </div>

            {/* Fermer */}
            <div className="w-full max-w-2xl mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 rounded-lg font-medium text-white text-sm transition-all cursor-pointer"
                    style={{ background: "#2e3154", border: "1px solid #3a3f6b" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#6366f1")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#3a3f6b")}
                >
                    Fermer
                </button>
            </div>
        </div>
    );
}
