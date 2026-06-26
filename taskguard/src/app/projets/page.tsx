"use client";

import Navbar from "@/components/ui/navbar";
import { Plus } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import ProjectCard from "@/components/projets/projectCard";
import CreateProject from "@/components/projets/createProject";
import EditProject from "@/components/projets/editProject"; 
import ProjectDetail from "@/components/projets/projectDetail";
import CreateTask from "@/components/projets/createtask";
import EditTask from "@/components/projets/editTask";
import ConfirmModal from "@/components/ui/confirmModal";

import { useProjects, Project, Task } from "@/components/lib/projects-context";

function ProjetsContent() {
    // useState pour la gestion des projets
    const { projects, setProjects, tasks, setTasks } = useProjects();
    const [open, setOpen] = useState(false);
    
    const searchParams = useSearchParams();
    const projectIdParam = searchParams.get("projectId");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [projectDate, setProjectDate] = useState("");
    // Gestion de projet
    const [menuOpen, setMenuOpen] = useState<Project | null>(null);

    const [editOpen, setEditOpen] = useState(false);
    const [confirmDeleteProject, setConfirmDeleteProject] = useState(false);

    // useState pour la gestion des taches
    const [taskOpen, setTaskOpen] = useState(false);

    const [titre, setTitre] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [priorite, setPriorite] = useState<Task["priorite"]>("Basse");
    const [dateLimite, setDateLimite] = useState("");
    const [statut, setStatut] = useState<Task["statut"]>("À faire");
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [confirmDeleteTask, setConfirmDeleteTask] = useState(false);
    
    useEffect(() => {
        if (projectIdParam && projects.length > 0) {
            const proj = projects.find(p => p.id.toString() === projectIdParam);
            if (proj && !menuOpen) {
                setMenuOpen(proj);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectIdParam, projects]);

    // Fonction pour la creation d'un projet
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim()) return;

        const newProject: Project = {
            id: projects.length + 1,
            nom: name,
            description: description,
            dateCreation: projectDate || new Date().toISOString().split("T")[0],
        };

        setProjects((prev) => [...prev, newProject]);
        setName("");
        setDescription("");
        setProjectDate("");
        setOpen(false);
    }

    // Fonction pour la supression d'un projet
    function handleDelete() {
        if (!menuOpen) return;
        setConfirmDeleteProject(true);
    }

    function executeDeleteProject() {
        if (!menuOpen) return;
        setProjects((prev) => prev.filter((p) => p.id !== menuOpen.id));
        setTasks((prev) => prev.filter((t) => t.projectId !== menuOpen.id));
        setMenuOpen(null);
        setConfirmDeleteProject(false);
    }

    // Fonction pour la modification d'un projet
    function handleEditSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || !menuOpen) return;

        setProjects((prev) =>
            prev.map((p) =>
                p.id === menuOpen.id
                    ? { ...p, nom: name, description: description }
                    : p
            )
        );

        setEditOpen(false);
        setMenuOpen(null);
        setName("");
        setDescription("");
    }

    // Fonction pour la creation d'une tache
    function handleCreateTask(e: React.FormEvent) {
        e.preventDefault();
        if (!titre.trim() || !menuOpen) return;

        const newTask: Task = {
            id: Date.now(),
            titre,
            description: taskDescription,
            priorite,
            dateLimite,
            statut,
            projectId: menuOpen.id,
            assignee: "Non assigné",
        };

        setTasks((prev) => [...prev, newTask]);

        setTitre("");
        setTaskDescription("");
        setPriorite("Basse");
        setDateLimite("");
        setStatut("À faire");
        setTaskOpen(false);
    }

    // Fonction pour la modification d'une tache
    function handleSaveTask(updatedTask: Task) {
        setTasks((prev) =>
            prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
        setEditingTask(null);
    }

    function handleDeleteTask() {
        if (!editingTask) return;
        setConfirmDeleteTask(true);
    }

    function executeDeleteTask() {
        if (!editingTask) return;
        setTasks((prev) => prev.filter((t) => t.id !== editingTask.id));
        setEditingTask(null);
        setConfirmDeleteTask(false);
    }

    return (
        <div className="min-h-screen w-full flex flex-col" style={{ background: "#1a1d2e" }}>
            <Navbar />

            <main className="flex-1 w-full max-w-7xl mx-auto py-10 px-6">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Projets</h1>
                        <p className="text-sm mt-1" style={{ color: "#8b8fa8" }}>Gérez vos projets et leurs tâches.</p>
                    </div>

                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 text-white px-4 py-2 rounded-lg font-medium transition-all"
                        style={{ background: "#6366f1" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                    >
                        <Plus className="w-4 h-4" />
                        Nouveau projet
                    </button>
                </div>

                {/* Affichage des projets */}
                <div>
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => setMenuOpen(project)}
                        />
                    ))}
                </div>
            </main>

            <CreateProject
                open={open}
                name={name}
                description={description}
                dateCreation={projectDate}
                onNameChange={setName}
                onDescriptionChange={setDescription}
                onDateCreationChange={setProjectDate}
                onSubmit={handleSubmit}
                onCancel={() => setOpen(false)}
            />

            <ProjectDetail
                project={menuOpen}
                tasks={tasks}
                onCreateTask={() => setTaskOpen(true)}
                onEdit={() => {
                    if (!menuOpen) return;
                    setName(menuOpen.nom);
                    setDescription(menuOpen.description);
                    setEditOpen(true);
                }}
                onDelete={handleDelete}
                onClose={() => setMenuOpen(null)}
                onTaskClick={(task) => setEditingTask(task)}
            />

            <EditProject
                open={editOpen}
                name={name}
                description={description}
                onNameChange={setName}
                onDescriptionChange={setDescription}
                onSubmit={handleEditSubmit}
                onCancel={() => setEditOpen(false)}
            />

            <CreateTask
                open={taskOpen && menuOpen !== null}
                projectName={menuOpen?.nom ?? ""}
                titre={titre}
                description={taskDescription}
                priorite={priorite}
                dateLimite={dateLimite}
                onTitreChange={setTitre}
                onDescriptionChange={setTaskDescription}
                onPrioriteChange={setPriorite}
                onDateLimiteChange={setDateLimite}
                onSubmit={handleCreateTask}
                onCancel={() => setTaskOpen(false)}
            />

            <EditTask
                task={editingTask}
                onSave={handleSaveTask}
                onDelete={handleDeleteTask}
                onClose={() => setEditingTask(null)}
            />

            <ConfirmModal
                open={confirmDeleteProject}
                title="Supprimer le projet"
                message="Êtes-vous sûr de vouloir supprimer ce projet ?"
                onConfirm={executeDeleteProject}
                onCancel={() => setConfirmDeleteProject(false)}
            />

            <ConfirmModal
                open={confirmDeleteTask}
                title="Supprimer la tâche"
                message="Êtes-vous sûr de vouloir supprimer cette tâche ?"
                onConfirm={executeDeleteTask}
                onCancel={() => setConfirmDeleteTask(false)}
            />
        </div>
    );
}

export default function Projets() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white" style={{ background: "#1a1d2e" }}>Chargement...</div>}>
            <ProjetsContent />
        </Suspense>
    );
}
