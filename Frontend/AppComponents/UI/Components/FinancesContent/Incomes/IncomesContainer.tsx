import styles from './../Styles/incomes.module.css';
import addImage from './../../../../../Images/add-image.png';

interface IncomesContainerProps {
    incomes: any[] | null;
    setContentShowed: (value: string) => void;
}

export default function IncomesContainer({ incomes, setContentShowed }: IncomesContainerProps) {


    return (
        <main className={styles.incomes_container}>
            <img className={styles.addBtn}
                onClick={() => setContentShowed('')}
                src={addImage}
                alt=""
            />
            {incomes && incomes.length !== 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Provenance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomes.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                    {parseFloat(item.amount).toFixed(2)}
                                </td>
                                <td>{item.currency}</td>
                                <td>{item.provenance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className={styles.no_incomes}>
                    <h1>
                        <em>No incomes to show</em>
                    </h1>
                    <h2>
                        <em>Tap "<span>+</span>" icon to add an income</em>
                    </h2>
                </div>
            )}
        </main>
    );
}
