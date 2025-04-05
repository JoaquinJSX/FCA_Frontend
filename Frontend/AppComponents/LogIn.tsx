import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Styles/logIn.module.css";

interface LogInProps {
    users: any;
    setUserLoggedIn: any;
}

export default function LogIn({ users, setUserLoggedIn }: LogInProps) {
    const navigate = useNavigate();
    const [inputUser, setInputUser] = useState({ username: "", password: "" });
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                signIn();
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [inputUser.username, inputUser.password]);

    useEffect(() => {
        if (inputUser.password.length > 0) {
            passwordRef.current?.style.removeProperty("border");
            setPasswordError("");
        }
    }, [inputUser.password]);

    useEffect(() => {
        if (inputUser.username.length > 0) {
            usernameRef.current?.style.removeProperty("border");
            setUsernameError("");
        }
    }, [inputUser.username]);

    function signIn() {
        let userId = 0;
        setPasswordError(""); // Reset error

        if (inputUser.username.length === 0) {
            setUsernameError("Enter username");
            if (usernameRef.current) {
                usernameRef.current.focus();
                usernameRef.current.style.outline = "none";
                usernameRef.current.style.border = "1px solid red";
            }
        } else if (users.length == 0) {
            setUsernameError("User not found");
            if (usernameRef.current) {
                usernameRef.current.focus();
                usernameRef.current.style.outline = "none";
                usernameRef.current.style.border = "1px solid red";
            }
        } else {
            for (const i in users) {
                if (users[i].username !== inputUser.username) {
                    userId++;
                    if (userId === users.length) {
                        setUsernameError("User not found");
                        if (usernameRef.current) {
                            usernameRef.current.focus();
                            usernameRef.current.style.outline = "none";
                            usernameRef.current.style.border = "1px solid red";
                        }
                    }
                } else {
                    if (inputUser.password.length === 0) {
                        passwordRef.current?.focus();
                        if (passwordRef.current) {
                            setPasswordError("Enter password");
                            passwordRef.current.style.outline = "none";
                            passwordRef.current.style.border = "1px solid red";
                        }
                    } else if (users[userId].password !== inputUser.password) {
                        setPasswordError("Incorrect password");
                        passwordRef.current?.focus();
                        if (passwordRef.current) {
                            setInputUser({ ...inputUser, password: "" });
                            passwordRef.current.style.outline = "none";
                            passwordRef.current.style.border = "1px solid red";
                        }

                    } else {
                        setUserLoggedIn(userId)
                        .then(() => navigate("/finantial_control"));
                    }
                }
            }
        }
    }

    return (
        <div className={styles.container}>
            <main className={styles.form}>
                <h1>Log In</h1>
                <form>
                    <label>Username:</label><br />
                    <input
                        ref={usernameRef}
                        type="text"
                        value={inputUser.username}
                        onChange={(e) => setInputUser({ ...inputUser, username: e.target.value })}
                    />
                    {usernameError && <p className={styles.errorText}>
                        <em>{usernameError}</em></p>}
                    {!usernameError && <br />}
                    <br />
                    <label>Password:</label><br />
                    <input
                        ref={passwordRef}
                        type="password"
                        value={inputUser.password}
                        onChange={(e) => setInputUser({ ...inputUser, password: e.target.value })}
                        className={passwordError ? styles.errorInput : ""}
                    />
                    {passwordError && <p className={styles.errorText}>
                        <em>{passwordError}</em></p>}
                </form>
                <button onClick={signIn} style={{ marginTop: !passwordError ? "20px" : 0 }}>
                    Enter
                </button><br />
                <Link to={'/sign-up'}>Don't have an account?</Link>
                <footer className={styles.footer}>
                    &copy; {new Date().getFullYear()} Limitless
                </footer>
            </main>
        </div>
    );
}
