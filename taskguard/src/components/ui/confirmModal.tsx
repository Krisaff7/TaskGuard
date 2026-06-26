export default function ConfirmModal({
    open,
    title,
    message,
    onConfirm,
    onCancel,
}: {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: "rgba(0,0,0,0.6)" }}>
            <div
                className="rounded-xl w-full max-w-sm p-6 flex flex-col gap-4"
                style={{ background: "#252843", border: "1px solid #3a3f6b" }}
            >
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-sm" style={{ color: "#8b8fa8" }}>{message}</p>
                <div className="flex gap-3 mt-2 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer"
                        style={{ background: "#2e3154", color: "#8b8fa8", border: "1px solid #3a3f6b" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#6366f1")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#3a3f6b")}
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all cursor-pointer"
                        style={{ background: "#ef4444" }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}
