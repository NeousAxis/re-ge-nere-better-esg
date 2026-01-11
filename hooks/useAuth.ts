
import { useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    User as FirebaseUser,
    AuthError
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { User } from '../types';


export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Check for forced demo session (fallback mode)
        const isDemo = localStorage.getItem('better_esg_demo_session');
        if (isDemo === 'true') {
            setCurrentUser({ uid: 'demo-user-123', email: 'demo@re-ge-nere.com' });
            setLoading(false);
            return;
        }

        // 2. Failsafe timeout: If Firebase config is invalid, onAuthStateChanged might never fire.
        // This forces the loading state to false after 1.5 seconds so the user isn't stuck.
        const failsafeTimer = setTimeout(() => {
            setLoading((prev) => {
                if (prev) {
                    console.warn("Auth loading timed out (likely due to missing Firebase keys). Unblocking UI.");
                    return false;
                }
                return prev;
            });
        }, 1500);

        // 3. Standard Firebase listener
        try {
            if (auth && typeof onAuthStateChanged === 'function') {
                const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
                    if (firebaseUser) {
                        setCurrentUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email || 'N/A'
                        });
                    } else {
                        // Only clear if we are not in forced demo mode (double check)
                        if (localStorage.getItem('better_esg_demo_session') !== 'true') {
                            setCurrentUser(null);
                        }
                    }
                    setLoading(false);
                    clearTimeout(failsafeTimer);
                });
                return () => {
                    unsubscribe();
                    clearTimeout(failsafeTimer);
                };
            } else {
                // Auth not initialized correctly
                setLoading(false);
            }
        } catch (error) {
            console.warn("Firebase auth listener failed. Defaulting to local state.", error);
            setLoading(false);
            clearTimeout(failsafeTimer);
        }

        return () => clearTimeout(failsafeTimer);
    }, []);

    const login = async (email: string, password?: string): Promise<{ success: boolean; errorCode?: string; }> => {
        if (!password) return { success: false };

        // --- DEMO USER BYPASS ---
        // Allow both old and new demo emails for backward compatibility during testing
        if (email === 'demo@better-esg.com' || email === 'demo@re-ge-nere.com') {
            await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network
            localStorage.setItem('better_esg_demo_session', 'true');
            setCurrentUser({ uid: 'demo-user-123', email: 'demo@re-ge-nere.com' });
            return { success: true };
        }

        // DEMO 2 (New User Simulation)
        if (email === 'demo2@re-ge-nere.com') {
            await new Promise(resolve => setTimeout(resolve, 600));
            localStorage.setItem('better_esg_demo_session', 'demo2');
            setCurrentUser({ uid: 'demo-user-456-new', email: 'demo2@re-ge-nere.com' });
            return { success: true };
        }
        // ------------------------

        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            const authError = error as AuthError;
            console.error("Firebase login error:", authError);
            return { success: false, errorCode: authError.code };
        }
    };

    const register = async (email: string, password?: string): Promise<{ success: boolean; errorCode?: string; }> => {
        if (!password) return { success: false };

        if (email === 'demo@better-esg.com' || email === 'demo@re-ge-nere.com' || email === 'demo2@re-ge-nere.com') {
            return login(email, password);
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            const authError = error as AuthError;
            console.error("Firebase registration error:", authError);
            return { success: false, errorCode: authError.code };
        }
    };

    const logout = async () => {
        localStorage.removeItem('better_esg_demo_session');
        setCurrentUser(null);

        try {
            if (auth) await signOut(auth);
        } catch (error) {
            console.warn("Firebase logout warning:", error);
        }
    };

    return { currentUser, loading, login, register, logout };
};
