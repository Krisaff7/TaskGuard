"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar";

export default function Settings() {
    const router = useRouter();

    // États du profil
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [profileMessage, setProfileMessage] = useState({ text: "", type: "" });

    // États de sécurité
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [securityMessage, setSecurityMessage] = useState({ text: "", type: "" });

    // Charger les informations au montage
    useEffect(() => {
        const loggedInUserStr = localStorage.getItem("taskguard_logged_in_user");
        if (loggedInUserStr) {
            const user = JSON.parse(loggedInUserStr);
            setNom(user.nom || "");
            setEmail(user.email || "");
        } else {
            router.push("/auth/Connexion");
        }
    }, [router]);

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProfileMessage({ text: "", type: "" });

        if (!nom || !email) {
            setProfileMessage({ text: "Veuillez remplir tous les champs du profil.", type: "error" });
            return;
        }

        const usersStr = localStorage.getItem("taskguard_users");
        const loggedInUserStr = localStorage.getItem("taskguard_logged_in_user");

        if (usersStr && loggedInUserStr) {
            const users = JSON.parse(usersStr);
            const currentUser = JSON.parse(loggedInUserStr);

            // Mettre à jour la liste des utilisateurs
            const updatedUsers = users.map((u: any) => {
                if (u.email === currentUser.email) {
                    return { ...u, nom, email };
                }
                return u;
            });

            // Mettre à jour l'utilisateur connecté
            const updatedCurrentUser = { ...currentUser, nom, email };

            localStorage.setItem("taskguard_users", JSON.stringify(updatedUsers));
            localStorage.setItem("taskguard_logged_in_user", JSON.stringify(updatedCurrentUser));
            window.dispatchEvent(new Event("userChanged"));

            setProfileMessage({ text: "Profil mis à jour avec succès.", type: "success" });
        }
    };

    const handleSecuritySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSecurityMessage({ text: "", type: "" });

        if (!currentPassword || !newPassword || !confirmPassword) {
            setSecurityMessage({ text: "Veuillez remplir tous les champs de sécurité.", type: "error" });
            return;
        }

        if (newPassword !== confirmPassword) {
            setSecurityMessage({ text: "Les nouveaux mots de passe ne correspondent pas.", type: "error" });
            return;
        }

        const usersStr = localStorage.getItem("taskguard_users");
        const loggedInUserStr = localStorage.getItem("taskguard_logged_in_user");

        if (usersStr && loggedInUserStr) {
            const users = JSON.parse(usersStr);
            const currentUser = JSON.parse(loggedInUserStr);

            if (currentPassword !== currentUser.password) {
                setSecurityMessage({ text: "Le mot de passe actuel est incorrect.", type: "error" });
                return;
            }

            // Mettre à jour la liste des utilisateurs
            const updatedUsers = users.map((u: any) => {
                if (u.email === currentUser.email) {
                    return { ...u, password: newPassword };
                }
                return u;
            });

            // Mettre à jour l'utilisateur connecté
            const updatedCurrentUser = { ...currentUser, password: newPassword };

            localStorage.setItem("taskguard_users", JSON.stringify(updatedUsers));
            localStorage.setItem("taskguard_logged_in_user", JSON.stringify(updatedCurrentUser));

            setSecurityMessage({ text: "Mot de passe mis à jour avec succès.", type: "success" });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("taskguard_logged_in_user");
        window.dispatchEvent(new Event("userChanged"));
    };

    return (
        <div className="min-h-screen w-full bg-app-bg flex flex-col">
            <Navbar />

            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col gap-8 py-10 px-6">
                
                {/* En-tête */}
                <div className="mb-2">
                    <h1 className="text-3xl font-bold text-white">Paramètres</h1>
                    <p className="text-gray-300 mt-1 text-sm">Gérez vos préférences de profil et de sécurité.</p>
                </div>

                {/*Profil */}
                <section className="p-8 rounded-xl shadow-sm border border-gray-100 " style={{ backgroundColor: "#252843" , border: "1px solid #3a3f6b"}}>
                    <h2 className="mb-6 text-2xl font-bold " style={{color: "#ffffffff", }}>Profil</h2>
                    <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4 max-w-md">
                        <label htmlFor="profil-name" className="text-white font-medium text-sm ">Nom :</label>
                        <input type="text" id="profil-name" name="name" value={nom} onChange={(e) => setNom(e.target.value)} style={{background: "#1a1d2e", color: "#ffffffff", border: "1px solid #111111"}} className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />

                        <label htmlFor="profil-email" className="text-white font-medium text-sm mt-2">Email :</label>
                        <input type="email" id="profil-email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{background: "#1a1d2e", color: "#ffffffff", border: "1px solid #111111"}} className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />

                        {profileMessage.text && (
                            <p className={`text-sm font-medium ${profileMessage.type === 'error' ? 'text-red-500' : 'text-green-400'}`}>
                                {profileMessage.text}
                            </p>
                        )}

                        <button type="submit" style={{ background: "#6366f1", color: "#ffffffff", fontWeight: "600" }} 
                            className="py-2.5 px-6  rounded-lg w-fit cursor-pointer transition-colors"
                            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#4f52d8")}
                            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#6366f1")}
                        >
                            Enregistrer le profil
                        </button>
                    </form>
                </section>

                {/* Séparateur */}
                <hr className="border-t-2 border-dashed border-gray-200 my-2" />

                {/*Sécurité */}
                <section className="p-8 rounded-xl shadow-sm" style={{ backgroundColor: "#252843" , border: "1px solid #3a3f6b"}}>
                    <h2 className="mb-6 text-2xl font-bold " style={{color: "#ffffffff", }}>Sécurité</h2>
                    <form onSubmit={handleSecuritySubmit} className="flex flex-col gap-4 max-w-md">
                        
                        <label htmlFor="current-password" className="text-white font-medium text-sm">Mot de passe actuel :</label>
                        <input type="password" id="current-password" name="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} style={{background: "#1a1d2e", color: "#ffffffff", border: "1px solid #111111"}} className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />

                        <label htmlFor="new-password" className="text-white font-medium text-sm">Nouveau mot de passe :</label>
                        <input type="password" id="new-password" name="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{background: "#1a1d2e", color: "#ffffffff", border: "1px solid #111111"}} className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />

                        <label htmlFor="confirm-password" className="text-white font-medium text-sm mt-2">Confirmer le mot de passe :</label>
                        <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{background: "#1a1d2e", color: "#ffffffff", border: "1px solid #111111"}} className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />

                        {securityMessage.text && (
                            <p className={`text-sm font-medium ${securityMessage.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                                {securityMessage.text}
                            </p>
                        )}

                        <button type="submit" style={{ background: "#6366f1", color: "#ffffffff", fontWeight: "600" }} 
                            className="py-2.5 px-6 mt-4 cursor-pointer transition-colors rounded-lg w-fit focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#4f52d8")}
                            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#6366f1")}
                        >
                            Mettre à jour le mot de passe
                        </button>
                    </form>
                </section>

                {/* Séparateur  */}
                <hr className="border-t-2 border-dashed border-gray-200 my-2" />

                {/* Déconnexion */}
                <div className="flex justify-center">
                    <Link
                        href="/auth/Connexion"
                        onClick={handleLogout}
                        style={{ background: "#f16363ff", color: "#ffffffff", fontWeight: "600" }} 
                        className="inline-block py-2.5 px-6  transition-colors rounded-lg w-fit focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#e04646ff")}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#f16363ff")}
                    >
                        Se déconnecter
                    </Link>
                </div>

            </main>
        </div>
    );
}