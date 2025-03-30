import { useEffect } from "react";
import styles from './../Styles/report.module.css';
import ReportsContainer from "./ReportsContainer";

interface MonthlyReportProps {
    user: any;
    reports: any[];
    setReports: any;
    incomes: any[];
    setIncomes: any;
    expenses: any[];
    setExpenses: any;
    goals: any[];
    setGoals: any;
    achievedGoals: any[];
    setAchievedGoals: any;
}

export default function MonthlyReport({
    user, incomes, setIncomes, expenses, setExpenses, goals, setGoals, achievedGoals, setAchievedGoals, reports, setReports
}: MonthlyReportProps) {

    const checkReportTime = async () => {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const reportMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const reportYear = currentMonth === 1 ? currentYear - 1 : currentYear;

        const reportExists = reports.some((report: any) => {
            if (!report.date) return false;
            const [monthName, year] = report.date.split(" - ");
            const reportYearParsed = parseInt(year, 10);
            const reportMonthParsed = new Date(`${monthName} 1, ${reportYearParsed}`).getMonth() + 1;
            return reportMonthParsed === reportMonth && reportYearParsed === reportYear;
        });

        const passed8AMOnFirstDay = now.getDate() === 1 && now.getHours() >= 8;
        const hasDataToReport = incomes.length > 0 || expenses.length > 0 || goals.length > 0 || achievedGoals.length > 0;

        if (passed8AMOnFirstDay && !reportExists && hasDataToReport) {
            await handleGenerateReport(reportMonth, reportYear);
        }
    };


    useEffect(() => {
        checkReportTime();
    }, [user]);

    const handleGenerateReport = async (reportMonth: number, reportYear: number) => {

        const moneyEarned: number = incomes.reduce((sum: number, income: any) => sum + income.amount, 0);
        const moneySpended: number = expenses.reduce((sum: number, expense: any) => sum + expense.amount, 0);
        const totalGoals = goals.length + achievedGoals.length;
        const percentageOfGoalsAchieved = totalGoals > 0 ? (achievedGoals.length / totalGoals) * 100 : 0;


        if (moneyEarned === 0 && moneySpended === 0 && goals.length === 0 && achievedGoals.length === 0) {
            console.log("No data to report.");
            return;
        }

        const monthName = new Date(reportYear, reportMonth - 1).toLocaleString('en-US', { month: 'long' });

        const reportData = {
            date: `${monthName} - ${reportYear}`,
            about_money: `You have earned S/. ${moneyEarned.toFixed(2)},  
            your biggest income source was ${getHighestIncomeSource(incomes)}.
            \nYou've spent S/. ${moneySpended.toFixed(2)},
            the area where you spent the most was ${getHighestExpenseCategory(expenses)}.`,
            about_goals: `You have achieved ${achievedGoals.length} of ${goals.length + achievedGoals.length} goals,
            which represents ${percentageOfGoalsAchieved.toFixed(2)}% of your goals. ${getGoalsPhrase(percentageOfGoalsAchieved)}`
        };

        try {
            const response = await fetch(`https://flask-api-0k43.onrender.com/users/${user.id}/monthly_report`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reportData),
            });

            if (!response.ok) {
                const data = await response.json();
                alert(`Error: ${data.error}`);
                return;
            }

            setReports((r: any) => [...r, reportData]);
            await clearFinancialData();

        } catch (error) {
            console.error("Error adding monthly report:", error);
            alert("There was an error adding the monthly report. Please try again.");
        }
    };

    const clearFinancialData = async () => {
        try {
            const response = await fetch(`https://flask-api-0k43.onrender.com/users/${user.id}/clear_data`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                alert(`Error: ${data.error}`);
            } else {
                setIncomes([]);
                setExpenses([]);
                setGoals([]);
                setAchievedGoals([]);
            }
        } catch (error) {
            console.error("Error clearing financial data:", error);
            alert("There was an error clearing financial data.");
        }
    };

    function getHighestIncomeSource(incomes: any[]) {
        if (!incomes || incomes.length === 0) return "No incomes";
        const incomeMap = incomes.reduce((acc, income) => {
            acc[income.provenance] = (acc[income.provenance] || 0) + income.amount;
            return acc;
        }, {} as Record<string, number>);
        const highestSource = Object.keys(incomeMap).reduce((a, b) => incomeMap[a] > incomeMap[b] ? a : b);
        return `${highestSource} with S/.${incomeMap[highestSource].toFixed(2)}`;
    }

    function getHighestExpenseCategory(expenses: any[]) {
        if (!expenses || expenses.length === 0) return "No expenses";
        const expenseMap = expenses.reduce((acc, expense) => {
            acc[expense.purpose] = (acc[expense.purpose] || 0) + expense.amount;
            return acc;
        }, {} as Record<string, number>);
        const highestCategory = Object.keys(expenseMap).reduce((a, b) => expenseMap[a] > expenseMap[b] ? a : b);
        return `${highestCategory} with S/.${expenseMap[highestCategory].toFixed(2)}`;
    }

    function getGoalsPhrase(percentageOfGoalsAchieved: number) {
        if (percentageOfGoalsAchieved === 100) return "You ate the world! Congratulations!";
        if (percentageOfGoalsAchieved >= 75) return "You're almost there! Keep going!";
        if (percentageOfGoalsAchieved >= 50) return "You're halfway there! Keep going!";
        if (percentageOfGoalsAchieved >= 25) return "You're doing well! Keep going!";
        return "You can do it! Don't give up!";
    }

    return (
        <div className={styles.report}>
            {reports.length === 0 ?
                <h1 className={styles.no_monthlyReport}>You must wait until the month ends to see your report.</h1>
                :
                <ReportsContainer reports={reports} />
            }
        </div>
    );
}
