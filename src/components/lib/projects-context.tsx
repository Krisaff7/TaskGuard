"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Project = {
    id: number;
    nom: string;
    description: string;
    dateCreation?: string;
};

export type Task = {
    id: number;
    titre: string;
    description: string;
    priorite: "Basse" | "Moyenne" | "Haute" | "Critique";
    dateLimite: string;
    statut: "À faire" | "En cours" | "Terminée";
    projectId: number;
    assignee: string;
};

type ProjectsContextType = {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

// Retourne la clé unique de l'utilisateur connecté
function getUserKey(): string | null {
    try {
        const loggedUser = localStorage.getItem("taskguard_logged_in_user");
        if (!loggedUser) return null;
        const user = JSON.parse(loggedUser);
        return user?.email ? `taskguard_user_${user.email}` : null;
    } catch {
        return null;
    }
}

export function ProjectsProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [userKey, setUserKey] = useState<string | null>(null);

    // Charger les données d'un utilisateur à partir de sa clé
    function loadUserData(key: string | null) {
        if (!key) {
            setProjects([]);
            setTasks([]);
            setUserKey(null);
            return;
        }
        setUserKey(key);
        try {
            const savedProjects = localStorage.getItem(`${key}_projects`);
            const savedTasks = localStorage.getItem(`${key}_tasks`);
            setProjects(savedProjects ? JSON.parse(savedProjects) : []);
            setTasks(savedTasks ? JSON.parse(savedTasks) : []);
        } catch (e) {
            console.error("Erreur de chargement des données utilisateur :", e);
            setProjects([]);
            setTasks([]);
        }
    }

    // Chargement initial + écoute de l'événement "userChanged" (déclenché au login/logout)
    useEffect(() => {
        loadUserData(getUserKey());

        const handleUserChange = () => loadUserData(getUserKey());

        window.addEventListener("userChanged", handleUserChange);
        return () => window.removeEventListener("userChanged", handleUserChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sauvegarde automatique à chaque modification, uniquement si un utilisateur est connecté
    useEffect(() => {
        if (userKey) {
            localStorage.setItem(`${userKey}_projects`, JSON.stringify(projects));
            localStorage.setItem(`${userKey}_tasks`, JSON.stringify(tasks));
        }
    }, [projects, tasks, userKey]);

    return (
        <ProjectsContext.Provider value={{ projects, setProjects, tasks, setTasks }}>
            {children}
        </ProjectsContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error("useProjects must be used within a ProjectsProvider");
    }
    return context;
}
