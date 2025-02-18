import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './../Styles/header.module.css';

interface HeaderProps {
    users: any;
    setUsers: any;
    userLoggedIn: any;
    setUserLoggedIn: any;
    contentShowed: any;
    setContentShowed: any;
}

export default function Header({ users, setUsers, userLoggedIn, setUserLoggedIn, contentShowed, setContentShowed }: HeaderProps) {

    const navigate = useNavigate();

    const [isShowingSettings, setIsShowingSettings] = useState(false);

    function logOut() {
        navigate('/');
        setUserLoggedIn(null);
    }

    function deleteAccount() {
        if (confirm('Are you sure that you want delete your account?')) {
            fetch(`http://127.0.0.1:5000/user/${users[userLoggedIn].id}`, {
                method: 'DELETE',
            }).then(() => {
                fetch('http://127.0.0.1:5000/users')
                    .then(response => response.json())
                    .then(data => setUsers(data))
            })
            navigate('/log-in');
        }
    }

    return (
        <header className={styles.header}>
            <section className={styles.title_and_settings}>
                <button className={styles.configBtn} onClick={() => setIsShowingSettings(isShowingSettings ? false : true)}>⁝</button>
                <h1>Welcome {users[userLoggedIn].username}!</h1>
                {isShowingSettings ?
                    <nav className={styles.settings}>
                        <button>Edit profile</button>
                        <button onClick={logOut}>Log out</button>
                        <button onClick={deleteAccount}>Delete account</button>
                    </nav> : null}
            </section>
            <nav className={styles.main_content_options}>
                <button
                    className={contentShowed == 'incomes' ? styles.activeBtn : ''}
                    onClick={() => setContentShowed('incomes')}
                >
                    Incomes
                </button>
                <button
                    className={contentShowed == 'expenses' ? styles.activeBtn : ''}
                    onClick={() => setContentShowed('expenses')}
                >
                    Expenses
                </button>
                <button
                    className={contentShowed == 'goals' ? styles.activeBtn : ''}
                    onClick={() => setContentShowed('goals')}
                >
                    Goals
                </button>
                <button
                    className={contentShowed == 'monthly_report' ? styles.activeBtn : ''}
                    onClick={() => setContentShowed('monthly_report')}
                >
                    Monthly report
                </button>
            </nav>
        </header>
    );
}