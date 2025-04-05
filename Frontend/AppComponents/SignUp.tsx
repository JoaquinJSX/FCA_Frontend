import { useNavigate } from "react-router-dom";
import styles from './Styles/signUp.module.css';
import { useState, useEffect, useRef } from "react";

interface SignUpProps {
    users: any;
    setUsers: any;
    setUserLoggedIn: any;

}

export default function SignUp({ users, setUsers, setUserLoggedIn }: SignUpProps) {

    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({ username: '', password: '' });
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                register();
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [newUser.username, newUser.password]);

    useEffect(() => {
        if (newUser.password.length > 0) {
            passwordRef.current?.style.removeProperty("border");
            setPasswordError("");
        }
    }, [newUser.password]);

    useEffect(() => {
        if (newUser.username.length > 0) {
            usernameRef.current?.style.removeProperty("border");
            setUsernameError("");
        }
    }, [newUser.username]);

    function register() {
        if (newUser.username.length < 5) {
            setUsernameError('Username must have 5 characters at least');
            if (usernameRef.current) {
                usernameRef.current.focus();
                usernameRef.current.style.outline = "none";
                usernameRef.current.style.border = "1px solid red";
            }
        } else if (users.some((user: any) => user.username === newUser.username)) {
            setUsernameError('Please choose another username, this already exists');
            if (usernameRef.current) {
                usernameRef.current.focus();
                usernameRef.current.style.outline = "none";
                usernameRef.current.style.border = "1px solid red";
            }
        } else if(newUser.password.length === 0) {
            setPasswordError('Enter a password');
            if (passwordRef.current) {
                passwordRef.current.focus();
                passwordRef.current.style.outline = "none";
                passwordRef.current.style.border = "1px solid red";
            }
        } else if (newUser.password.length < 4) {
            setPasswordError('Password must have 4 characters at least');
            if (passwordRef.current) {
                passwordRef.current.focus();
                passwordRef.current.style.outline = "none";
                passwordRef.current.style.border = "1px solid red";
            }
        } else {
            fetch('https://fca-api-5k3h.onrender.com/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
                .then(() => fetch('https://fca-api-5k3h.onrender.com/users'))
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                    const index = data.findIndex((user: any) => user.username === newUser.username);
                    setUserLoggedIn(index);
                    navigate('/finantial_control');
                })
                .catch(err => console.log(err));
        }
    }
    return (
        <div className={styles.container}>
            <main className={styles.form}>
                <h1>Create account</h1>
                <form>
                    <label>Username:</label><br />
                    <input type="text" ref={usernameRef} value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} /><br />
                    {usernameError && <p className={styles.error}><em>{usernameError}</em></p>}
                    <label>Password:</label><br />
                    <input type="password" ref={passwordRef} value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                    {passwordError && <p className={styles.error}><em>{passwordError}</em></p>}
                </form>
                <button onClick={register}>Create</button><br />
                <footer className={styles.footer}>
                    &copy; {new Date().getFullYear()} Limitless
                </footer>
            </main>
        </div>
    );
}