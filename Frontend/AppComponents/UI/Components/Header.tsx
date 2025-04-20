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
        navigate('/log-in');
        setUserLoggedIn(null);
    }

    function deleteAccount() {
        if (confirm('Are you sure that you want to delete your account?')) {
            fetch(`https://fca-api-5k3h.onrender.com/${users[userLoggedIn].id}`, {
                method: 'DELETE',
            }).then(() => {
                fetch('https://fca-api-5k3h.onrender.com')
                    .then(response => response.json())
                    .then(data => setUsers(data))
            })
            navigate('/');
        }
    }

    function changeSectionShowed(section: string) {
        setContentShowed(section);
        setIsShowingSettings(false);
    }

    return (
        <header className={styles.header}>
            <section className={styles.title_and_settings}>
                    <img
                        onClick={() => setIsShowingSettings(isShowingSettings ? false : true)}
                        className={styles.configBtn}
                        src="https://us.123rf.com/450wm/pytyczech/pytyczech1802/pytyczech180200242/96360239-icono-de-l%C3%ADnea-de-tres-barras.jpg"
                        alt="config"
                    />
                <h1>Welcome {users[userLoggedIn].username}!</h1>
                {isShowingSettings ?
                    <nav className={styles.settings}>
                        <button onClick={logOut}>Log out</button>
                        <button onClick={deleteAccount}>Delete account</button>
                    </nav> : null}
            </section>
            <nav className={styles.main_content_options}>
                <button
                    className={contentShowed == 'incomes' ? styles.activeBtn : ''}
                    onClick={() => changeSectionShowed('incomes')}
                >
                    Incomes
                </button>
                <button
                    className={contentShowed == 'expenses' ? styles.activeBtn : ''}
                    onClick={() => changeSectionShowed('expenses')}
                >
                    Expenses
                </button>
                <button
                    className={contentShowed == 'goals' ? styles.activeBtn : ''}
                    onClick={() => changeSectionShowed('goals')}
                >
                    Goals
                </button>
                <button
                    className={contentShowed == 'monthly_report' ? styles.activeBtn : ''}
                    onClick={() => changeSectionShowed('monthly_report')}
                >
                    Monthly report
                </button>
            </nav>
        </header>
    );
}
