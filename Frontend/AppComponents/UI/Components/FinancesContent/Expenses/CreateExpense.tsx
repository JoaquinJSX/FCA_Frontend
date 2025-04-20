import { useState } from "react";
import styles from './../Styles/expenses.module.css';

interface CreateExpenseProps {
    user: any;
    setSectionShowed: any;
    setExpenses: any;
}

export default function CreateIncome({ user, setSectionShowed, setExpenses }: CreateExpenseProps) {

    const [newExpense, setNewExpense] = useState({
        date: new Date().toISOString().split("T")[0],
        amount: '',
        currency: 'Soles',
        purpose: 'Housing rent'
    });

    // Función para agregar un gasto
    async function addExpense() {
        if (newExpense.amount === '') {
            alert("Amount can't be null");
            return;
        }

        try {
            const response = await fetch(
                `https://fca-api-5k3h.onrender.com/${user.id}/expenses`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...newExpense,
                        amount: Number(parseFloat(newExpense.amount).toFixed(2)) // 🔹 Convierte de nuevo a número
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Error al agregar el ingreso');
            }

            fetch(`https://fca-api-5k3h.onrender.com`)
                .then((res) => res.json())
                .then((data) => setExpenses(data[data.findIndex((i: any) => i.username === user.username)].expenses))
                .then(() => setSectionShowed('expenses_container'));

        } catch (error) {
            console.error('Error al agregar el nuevo ingreso:', error);
        }
    }

    return (
        <div className={styles.new_expense_container}>
            <h2>Add new expense</h2>
            <form className={styles.add_form}>
                <section>
                    <label>Date:</label>
                    <input
                        type="date" value={newExpense.date}
                        onChange={e => setNewExpense({ ...newExpense, date: e.target.value })}
                    />
                </section>
                <section>
                    <label>Amount:</label>
                    <input type="number" placeholder="Enter amount..."
                        value={newExpense.amount} onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                    />
                </section>
                <section>
                    <label>Currency:</label>
                    <select
                        value={newExpense.currency}
                        onChange={e => setNewExpense({ ...newExpense, currency: e.target.value })}
                    >
                        <option value="Soles">Soles</option>
                        <option value="USD" disabled>USD</option>
                    </select>
                </section>
                <section>
                    <label>Purpose:</label>
                    <select
                        value={newExpense.purpose}
                        onChange={e => setNewExpense({ ...newExpense, purpose: e.target.value })}
                    >
                        <option value="Housing rent">Housing rent</option>
                        <option value="Food">Food</option>
                        <option value="Investments">Investments</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Phone plan">Phone plan</option>
                        <option value="Electric bill">Electric bill</option>
                        <option value="Other bills">Other bills</option>
                        <option value="Health">Health</option>
                        <option value="Fares">Fares</option>
                        <option value="Others">Others</option>
                    </select>
                </section>
            </form>
            <button className={styles.add_income_btn} onClick={addExpense}>
                Add
            </button>
            <button className={styles.cancel_btn} onClick={() => setSectionShowed('expenses_container')}>
                Cancel
            </button>
        </div>
    );
}
