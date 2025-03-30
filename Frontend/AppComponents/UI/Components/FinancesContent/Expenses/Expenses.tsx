import { useState, useEffect } from "react";
import CreateExpense from "./CreateExpense";
import ExpensesContainer from "./ExpensesContainer";
import styles from './../Styles/expenses.module.css';

interface IncomesProps {
    user: any;
    expenses: any;
    setExpenses: any;
}

export default function Incomes({ user, expenses, setExpenses }: IncomesProps) {

    const [sectionShowed, setSectionShowed] = useState('expenses_container');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (expenses !== null) {
            setLoading(false);
        }
    }, [expenses]);

    return (
        <>
            {loading ? <h1>Loading...</h1>
                :
                expenses ?
                    <div
                        className={styles.expenses}
                        style={{ overflowY: expenses.length > 16 && sectionShowed == 'expenses_container' ? 'scroll' : 'hidden' }}
                    >
                        {sectionShowed == 'expenses_container' ?
                            <ExpensesContainer expenses={expenses} setSectionShowed={setSectionShowed} />
                            :
                            <CreateExpense user={user} setSectionShowed={setSectionShowed} setExpenses={setExpenses} />}
                    </div> : null}
        </>
    );
}