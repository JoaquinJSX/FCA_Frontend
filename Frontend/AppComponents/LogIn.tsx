import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from './Styles/logIn.module.css';

interface LogInProps {
    users: any;
    setUserLoggedIn: any;
}

export default function LogIn({ users, setUserLoggedIn }: LogInProps) {

    const navigate = useNavigate();

    const [inputUser, setInputUser] = useState({ username: '', password: '' });

    function signIn() {
        let userId = 0;

        if (inputUser.username.length == 0) {
            alert('Please enter username');
        } else if (users.length == 0) {
            alert('User not found');
        } else {
            for (const i in users) {
                if (users[i].username != inputUser.username) {
                    userId++;
                    if (userId == users.length) {
                        alert('User not found');
                    }
                } else {
                    if (users[userId].password != inputUser.password) {
                        alert('Incorrect password');
                    } else {
                        setUserLoggedIn(userId);
                        navigate('/finantial_control');
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
                    <input type="text" value={inputUser.username} onChange={e => setInputUser({ ...inputUser, username: e.target.value })} /><br />
                    <label>Password:</label><br />
                    <input type="password" value={inputUser.password} onChange={e => setInputUser({ ...inputUser, password: e.target.value })} />
                </form>
                <button onClick={signIn}>Enter</button><br />
                <Link to={'/sign-up'}>Don´t have an account?</Link>
                <footer className={styles.footer}>
                    &copy; {new Date().getFullYear()} Limitless
                </footer>
            </main>
        </div>
    );
}