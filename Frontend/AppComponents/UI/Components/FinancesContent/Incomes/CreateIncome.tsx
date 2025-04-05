import { useState } from "react";
import styles from './../Styles/incomes.module.css';

interface CreateIncomeProps {
    user: any;
    setSectionShowed: any;
    setIncomes: any;
}

export default function CreateIncome({ user, setSectionShowed, setIncomes }: CreateIncomeProps) {

    const [newIncome, setNewIncome] = useState({
        date: new Date().toISOString().split("T")[0],  // Formato de fecha más amigable
        amount: '',
        currency: 'Soles',
        provenance: 'Salary'
    });
    
    // Función para agregar un nuevo ingreso
    async function addIncome() {
        if (newIncome.amount === '') {
            alert("Amount can't be null");
            return;
        }

        try {
            const response = await fetch(
                `https://fca-api-5k3h.onrender.com/users/${user.id}/incomes`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...newIncome,
                        amount: Number(parseFloat(newIncome.amount).toFixed(2)) // 🔹 Convierte de nuevo a número
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Error al agregar el ingreso');
            }

            fetch(`https://fca-api-5k3h.onrender.com/users`)
                .then((res) => res.json())
                .then((data) => setIncomes(data[data.findIndex((i: any) => i.username === user.username)].incomes))
                .then(() => setSectionShowed('incomes_container'));

        } catch (error) {
            console.error('Error al agregar el nuevo ingreso:', error);
        }
    }

    return (
        <div className={styles.new_income_container}>
            <h2>Add new income</h2>
            <form className={styles.add_form}>
                <section>
                    <label>Date:</label>
                    <input
                        type="date" value={newIncome.date}
                        onChange={e => setNewIncome({ ...newIncome, date: e.target.value })}
                    />
                </section>
                <section>
                    <label>Amount:</label>
                    <input type="number" placeholder="Enter amount..."
                        value={newIncome.amount} onChange={e => setNewIncome({ ...newIncome, amount: e.target.value })}
                    />
                </section>
                <section>
                    <label>Currency:</label>
                    <select
                        value={newIncome.currency}
                        onChange={e => setNewIncome({ ...newIncome, currency: e.target.value })}
                    >
                        <option value="Soles">Soles</option>
                        <option value="USD" disabled>USD</option>
                    </select>
                </section>
                <section>
                    <label>Provenance:</label>
                    <select
                        value={newIncome.provenance}
                        onChange={e => setNewIncome({ ...newIncome, provenance: e.target.value })}
                    >
                        <option value="Salary">Salary</option>
                        <option value="Meal per diem">Meal per diem</option>
                        <option value="Offered services">Offered services</option>
                        <option value="Return on investment">Return on investment</option>
                        <option value="Bonuses">Bonuses</option>
                        <option value="Tips">Tips</option>
                        <option value="Others">Others</option>
                    </select>
                </section>
            </form>
            <button className={styles.add_income_btn} onClick={addIncome}>
                Add
            </button>
            <button className={styles.cancel_btn} onClick={() => setSectionShowed('incomes_container')}>
                Cancel
            </button>
        </div>
    );
}
