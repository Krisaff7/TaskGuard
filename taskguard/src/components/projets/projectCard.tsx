type Project = {
    id: number;
    nom: string;
    description: string;
    dateCreation?: string;
};

type ProjectCardProps = {
    project: Project;
    onClick: () => void;
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <button
            onClick={onClick}
            className="block w-full text-left p-4 rounded-xl mb-4 transition-all cursor-pointer"
            style={{ background: "#252843", border: "1px solid #3a3f6b" }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#6366f1";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#3a3f6b";
            }}
        >
            <div className="flex justify-between items-start">
                <h2 className="text-base font-bold text-white">{project.nom}</h2>
                {project.dateCreation && (
                    <span
                        className="text-xs font-medium px-2 py-1 rounded"
                        style={{ background: "#2e3154", color: "#8b8fa8" }}
                    >
                        {new Date(project.dateCreation).toLocaleDateString("fr-FR")}
                    </span>
                )}
            </div>
            <p className="mt-2 text-sm line-clamp-2" style={{ color: "#8b8fa8" }}>
                {project.description}
            </p>
        </button>
    );
}
