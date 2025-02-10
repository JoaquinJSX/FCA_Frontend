import { useNavigate } from "react-router-dom";
import styles from './Styles/signUp.module.css';
import { useState } from "react";

interface SignUpProps {
    users: any;
    setUsers: any;
    setUserLoggedIn: any;

}

export default function SignUp({ users, setUsers, setUserLoggedIn }: SignUpProps) {

    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({ username: '', password: '' });

    function register() {
        if (newUser.username.length < 5) {
            alert('Username must have 5 characters at least');
        } else if (users.some((user: any) => user.username === newUser.username)) {
            alert('Please choose another username, this already exists');
        } else if (newUser.password.length < 4) {
            alert('Password must have 4 characters at least');
        } else {
            fetch('http://127.0.0.1:5000/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
                .then(() => fetch('http://127.0.0.1:5000/users'))
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
                    <input type="text" value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} /><br />
                    <label>Password:</label><br />
                    <input type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                </form>
                <button onClick={register}>Create</button><br />
                <footer className={styles.footer}>
                    &copy; {new Date().getFullYear()} Limitless
                </footer>
            </main>
        </div>
    );
}