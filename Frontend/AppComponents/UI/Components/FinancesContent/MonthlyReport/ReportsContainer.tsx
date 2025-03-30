import { useState } from "react";
import styles from './../Styles/report.module.css';

export default function ReportsContainer({ reports }: { reports: any[] }) {

    const [currentIndex, setCurrentIndex] = useState(reports.length - 1);
    const prevDisabled = currentIndex === 0 ? true : false;
    const nextDisabled = currentIndex === reports.length - 1 ? true : false;

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <button
                    onClick={() => setCurrentIndex(currentIndex - 1)} disabled={prevDisabled}
                    className={prevDisabled ? styles.disabledBtn : ""}
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentIndex(currentIndex + 1)} disabled={nextDisabled}
                    className={nextDisabled ? styles.disabledBtn : ""}
                >
                    Next
                </button>
            </div>
            <hr />
            <section key={currentIndex}>
                <h1>{reports[currentIndex].date}</h1>
                <hr />
                <p>{reports[currentIndex].about_money}</p>
                <p>{reports[currentIndex].about_goals}</p>
            </section>
        </div>
    );
}