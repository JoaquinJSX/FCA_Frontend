import { lazy, Suspense } from "react";
const Incomes = lazy(() => import("./Incomes/Incomes"));
const Expenses = lazy(() => import("./Expenses/Expenses"));
const Goals = lazy(() => import("./Goals/Goals"));
const MonthlyReport = lazy(() => import("./MonthlyReport/MonthlyReport"));
import { useEffect, useState } from "react";
import styles from './../../Styles/finances.module.css';

interface FinancesProps {
    users: any;
    userLoggedIn: any;
    contentShowed: any;
}

export default function Finances({ users, userLoggedIn, contentShowed }: FinancesProps) {

    const user = users[userLoggedIn];

    const [incomes, setIncomes] = useState<any[]>([]);
    const [expenses, setExpenses] = useState<any[]>([]);
    const [goals, setGoals] = useState(user.goals);
    const [achievedGoals, setAchievedGoals] = useState(user.achieved_goals);
    const [reports, setReports] = useState(user.monthly_report);
    //Obtener el listado de ingresos
    useEffect(() => {
        fetch(`https://fca-api-5k3h.onrender.com/users/${user.id}/incomes`)
            .then(res => res.json())
            .then(data => setIncomes(data));
    }, []);

    //Obtener el listado de gastos
    useEffect(() => {
        fetch(`https://fca-api-5k3h.onrender.com/users/${user.id}/expenses`)
            .then(res => res.json())
            .then(data => setExpenses(data));
    }, []);

    return (
        <div className={styles.finances}>
            <Suspense fallback={<h1>Loading...</h1>}>
                {contentShowed === 'incomes' ?
                    <Incomes
                        user={user}
                        incomes={incomes}
                        setIncomes={setIncomes}
                    /> : null}

                {contentShowed === 'expenses' ?
                    <Expenses
                        user={user}
                        expenses={expenses}
                        setExpenses={setExpenses}
                    /> : null}

                {contentShowed === 'goals' ?
                    <Goals
                        user={user}
                        goals={goals}
                        setGoals={setGoals}
                        achievedGoals={achievedGoals}
                        setAchievedGoals={setAchievedGoals}
                    /> : null}

                {contentShowed === 'monthly_report' ?
                    <MonthlyReport
                        user={user}
                        reports={reports}
                        setReports={setReports}
                        incomes={incomes}
                        setIncomes={setIncomes}
                        expenses={expenses}
                        setExpenses={setExpenses}
                        goals={goals}
                        setGoals={setGoals}
                        achievedGoals={achievedGoals}
                        setAchievedGoals={setAchievedGoals}
                    /> : null}
            </Suspense>
        </div>
    );
}