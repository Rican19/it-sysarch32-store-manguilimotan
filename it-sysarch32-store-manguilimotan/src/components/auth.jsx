import { auth, googleProvider } from '../config/firebase'; // Correct import statement for auth and googleProvider
import { useState } from 'react'; 
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'; 

export const Auth = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password); 
            console.log("User signed in successfully!"); 
        } catch (error) {
            console.error("Error signing in:", error.message); 
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider); // Correct function call for signInWithPopup
            console.log("User signed in successfully!"); 
        } catch (error) {
            console.error("Error signing in:", error.message); 
        }
    };
    
    const logout = async () => {
        try {
            await signOut(auth); 
            console.log("User signed out successfully!"); 
        } catch (error) {
            console.error("Error signing out:", error.message); // Fixed log message
        }
    };

    return (
        <div>
            <input
                placeholder="Email..."
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password..."
                value={password}
                type='password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign in</button>

            <button onClick={signInWithGoogle}>Sign in With Google</button>
            <button onClick={logout}>LogOut</button>
        </div>
    );
};
