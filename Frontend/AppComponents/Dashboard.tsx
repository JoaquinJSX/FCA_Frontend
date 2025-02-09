import styles from './Styles/dashboard.module.css';
import image1 from './../Images/finances_control.png';
import image2 from './../Images/expense_image.png';
import image3 from './../Images/goal_image.png';


export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Finantial Control App</h1>
                <nav className={styles.nav}>
                    <button>Log In</button>
                    <button>Sign Up</button>
                </nav>
                <p>
                    Are you looking for an app that will give you full control over your finances?
                    Well, you are in the right place.
                </p>
            </header>
            <section className={styles.about}>
                <main>
                    <figure>
                        <img src={image2} alt="" />
                        <figcaption>
                            Have the control over your expenses.
                        </figcaption>
                    </figure>
                    <figure>
                        <img src={image1} alt="" />
                        <figcaption>
                            Manage your finances.
                        </figcaption>
                    </figure>
                    <figure>
                        <img src={image3} alt="" />
                        <figcaption>
                            Achieve your finantial goal.
                        </figcaption>
                    </figure>
                </main>
                <h3>
                    <em>To control your finances is to control your life; every penny counts.</em>
                </h3>
            </section>
            <footer className={styles.footer}>
                &copy; {new Date().getFullYear()} Limitless
            </footer>
        </div>
    );
}