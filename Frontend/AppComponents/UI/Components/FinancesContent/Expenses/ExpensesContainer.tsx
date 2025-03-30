import styles from './../Styles/expenses.module.css';
import addImage from './../../../../../Images/add-image.png';

interface ExpensesContainerProps {
    expenses: any;
    setSectionShowed: any;
}

export default function ExpensesContainer({ expenses, setSectionShowed }: ExpensesContainerProps) {

    return (
        <main className={styles.expenses_container}>
            <img className={styles.addBtn}
                onClick={() => setSectionShowed('')}
                src={addImage}
                alt=""
            />
            {expenses && expenses.length !== 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((item: any, index: any) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                    {parseFloat(item.amount).toFixed(2)}
                                </td>
                                <td>{item.currency}</td>
                                <td>{item.purpose}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className={styles.no_expenses}>
                    <h1>
                        <em>No expenses to show</em>
                    </h1>
                    <h2>
                        <em>Tap "<span>+</span>" icon to add an expense</em>
                    </h2>
                </div>
            )}
        </main>
    );
}
