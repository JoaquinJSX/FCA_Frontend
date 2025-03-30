import styles from './../Styles/footer.module.css';

export default function Footer() {

    return(
        <footer className={styles.footer_container}>
            <p>{new Date().getFullYear()} &copy; Limitless</p>
        </footer>
    );
}