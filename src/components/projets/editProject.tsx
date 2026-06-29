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

type EditProjectModalProps = {
    open: boolean;
    name: string;
    description: string;
    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
};

export default function EditProject({
    open,
    name,
    description,
    onNameChange,
    onDescriptionChange,
    onSubmit,
    onCancel,
}: EditProjectModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.6)" }}>
            <div
                className="p-8 rounded-xl w-full max-w-md"
                style={{ background: "#252843", border: "1px solid #3a3f6b" }}
            >
                <h2 className="text-xl font-bold mb-6 text-white">Modification du projet</h2>
                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="edit-name" style={labelStyle}>Nom du projet</label>
                        <input
                            type="text"
                            id="edit-name"
                            value={name}
                            onChange={(e) => onNameChange(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                            style={inputStyle}
                            required
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="edit-description" style={labelStyle}>Description</label>
                        <textarea
                            id="edit-description"
                            value={description}
                            onChange={(e) => onDescriptionChange(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all resize-none"
                            style={inputStyle}
                            required
                            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                            onBlur={(e) => (e.target.style.borderColor = "#3a3f6b")}
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
                            Modifier
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
