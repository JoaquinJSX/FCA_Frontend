import { useState } from "react";
import styles from './../Styles/goals.module.css';

interface CreateGoalProps {
    user: any;
    setSectionShowed: any;
    setGoals: any;
}

export default function CreateGoal({ user, setSectionShowed, setGoals }: CreateGoalProps) {

    const [newGoal, setNewGoal] = useState('');

    // Función para agregar una nueva meta
    async function addGoal(e: any) {
        e.preventDefault();

        if (newGoal === '') {
            alert("Goal field can't be empty");
            return;
        }

        try {
            const response = await fetch(
                `http://127.0.0.1:5000/users/${user.id}/goals`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newGoal),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                alert(data.message);
                return;
            } else {
                fetch(`http://127.0.0.1:5000/users`)
                    .then((res) => res.json())
                    .then(data => {
                        setGoals(data[data.findIndex((i: any) => i.username === user.username)].goals);
                    })
                    .then(() => setSectionShowed('goals_container'));
            }
        } catch (error) {
            console.error("Error al agregar la nueva meta:", error);
            alert("Ocurrió un error al agregar la nueva meta. Inténtalo de nuevo.");
        }
    }

    return (
        <div className={styles.create_goal}>
            <h1>Write a new goal</h1>
            <h3>If you write your goals, you are more close to achieve it!</h3>
            <hr />
            <form>
                <input type="text" value={newGoal} onChange={e => setNewGoal(e.target.value)} placeholder="Write a goal..." /> <br />
                <button onClick={e => addGoal(e)}>Add</button>
                <button className={styles.cancelBtn} onClick={() => setSectionShowed('goals_container')}>Cancel</button>
            </form>
        </div>
    );
}