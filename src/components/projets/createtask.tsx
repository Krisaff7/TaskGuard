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

type Priorite = "Basse" | "Moyenne" | "Haute" | "Critique";

type NewTaskModalProps = {
    open: boolean;
    projectName: string;
    titre: string;
    description: string;
    priorite: Priorite;
    dateLimite: string;
    onTitreChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onPrioriteChange: (value: Priorite) => void;
    onDateLimiteChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
};

export default function CreateTask({
    open,
    projectName,
    titre,
    description,
    priorite,
    dateLimite,
    onTitreChange,
    onDescriptionChange,
    onPrioriteChange,
    onDateLimiteChange,
    onSubmit,
    onCancel,
}: NewTaskModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.6)" }}>
            <div
                className="p-8 rounded-xl w-full max-w-md"
                style={{ background: "#252843", border: "1px solid #3a3f6b" }}
            >
                <h2 className="text-xl font-bold mb-1 text-white">Nouvelle tâche</h2>
                <p className="text-sm mb-6 text-white" >Projet : {projectName}</p>

                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="task-titre" style={labelStyle}>Titre</label>
                        <input
                            type="text"
                            id="task-titre"
                            value={titre}
                            onChange={(e) => onTitreChange(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            required
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="task-description" style={labelStyle}>Description</label>
                        <textarea
                            id="task-description"
                            value={description}
                            onChange={(e) => onDescriptionChange(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all resize-none"
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="task-priorite" style={labelStyle}>Priorité</label>
                        <select
                            id="task-priorite"
                            value={priorite}
                            onChange={(e) => onPrioriteChange(e.target.value as Priorite)}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                            required
                        >
                            <option value="Basse">Basse</option>
                            <option value="Moyenne">Moyenne</option>
                            <option value="Haute">Haute</option>
                            <option value="Critique">Critique</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="task-date" style={labelStyle}>Date limite</label>
                        <input
                            type="date"
                            id="task-date"
                            value={dateLimite}
                            onChange={(e) => onDateLimiteChange(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                            required
                        />
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button
                            type="submit"
                            className="flex-1 py-2.5 rounded-lg font-semibold text-white text-sm transition-all cursor-pointer"
                            style={{ background: "#6366f1" }}
                            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                        >
                            Créer
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-2.5 rounded-lg font-semibold text-white text-sm transition-all cursor-pointer"
                            style={{ background: "#2e3154", border: "1px solid #3a3f6b" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#6366f1")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#3a3f6b")}
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
