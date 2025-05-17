import { useState, useEffect } from "react";
import styles from "./../Styles/goals.module.css";

interface GoalsContainerProps {
    user: any;
    goals: any;
    setGoals: any;
    achievedGoals: any;
    setAchievedGoals: any;
    sectionShowed: any;
    setSectionShowed: any;
}

export default function GoalsContainer({ user, goals, setGoals, achievedGoals, setAchievedGoals, sectionShowed, setSectionShowed }: GoalsContainerProps) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (goals !== null && achievedGoals !== null) {
            setLoading(false);
        }
    }, [goals, achievedGoals]);

    //Agregar meta lograda (API + Estado)
    const addAchievedGoal = async (goal: string, index: number) => {
        try {
            //Agregar a `achieved_goals` en la API
            const response = await fetch(`https://fca-api-5k3h.onrender.com/${user.id}/achieved_goals`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(goal),
            });

            if (!response.ok) throw new Error("Error adding achieved goal");

            //Eliminar la meta de `goals` en la API
            const deleteResponse = await fetch(`https://fca-api-5k3h.onrender.com/${user.id}/goals/${index}`, {
                method: "DELETE",
            });

            if (!deleteResponse.ok) throw new Error("Error deleting goal");

            //Actualizar estado local
            setGoals((prevGoals: any) => {
                const updatedGoals = [...prevGoals];
                updatedGoals.splice(index, 1);
                return updatedGoals;
            });

            setAchievedGoals((prevAchievedGoals: any) => [...prevAchievedGoals, goal]);
        } catch (error) {
            console.error(error);
        }
    };

    //Eliminar meta lograda (API + Estado)
    const cancelAchievedGoal = async (goal: string, index: number) => {
        try {
            //Agregar a `goals` en la API
            const response = await fetch(`https://fca-api-5k3h.onrender.com/${user.id}/goals`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(goal),
            });

            if (!response.ok) throw new Error("Error returning goal");

            //Eliminar la meta de `achieved_goals` en la API
            const deleteResponse = await fetch(`https://fca-api-5k3h.onrender.com/${user.id}/achieved_goals/${index}`, {
                method: "DELETE",
            });

            if (!deleteResponse.ok) throw new Error("Error deleting goal");

            //Actualizar estado local
            setAchievedGoals((prevGoals: any) => {
                const updatedGoals = [...prevGoals];
                updatedGoals.splice(index, 1);
                return updatedGoals;
            });

            setGoals((prevGoals: any) => [...prevGoals, goal]);
        } catch (error) {
            console.error(error);
        }
    };

    //Eliminar meta (API + Estado)
    async function deleteGoal(index: number) {
        const deleteResponse = await fetch(`https://fca-api-5k3h.onrender.com/${user.id}/goals/${index}`, {
            method: "DELETE",
        });

        if (!deleteResponse.ok) throw new Error("Error deleting goal");

        //Actualizar estado local
        setGoals((prevGoals: any) => {
            const updatedGoals = [...prevGoals];
            updatedGoals.splice(index, 1);
            return updatedGoals;
        });
    }

    return (
        <main className={styles.goals_content}>
            <button onClick={() => setSectionShowed("")} className={styles.add_goal_btn}>
                Add a goal
            </button>

            {loading ? (
                <h1>Loading...</h1>
            ) : goals.length > 0 || achievedGoals.length > 0 ? (
                <ul
                    className={styles.goals_container}
                    style={{
                        overflowY: goals.length + achievedGoals.length > 6 && sectionShowed === "goals_container" ? "scroll" : "hidden",
                        justifyContent: goals.length + achievedGoals.length < 7 ? "center" : "flex-start",
                    }}
                >
                    {/*Metas logradas */}
                    {achievedGoals.map((item: any, index: any) => (
                        <li key={index}
                            className={styles.goals_list}
                            style={{ textDecoration: "line-through", border: "2px solid #00FF00" }}
                        >
                            <p className={styles.goals_name}>{item}</p>
                            <input
                                type="checkbox"
                                checked={true}
                                onChange={() => cancelAchievedGoal(item, index)} //Si se desmarca, regresa a goals
                            />
                        </li>
                    ))}

                    {/*Metas pendientes */}
                    {goals.map((item: any, index: any) => (
                        <li key={index} className={styles.goals_list}>
                            <p className={styles.goals_name}>{item}</p>
                            <input
                                type="checkbox"
                                checked={false}
                                onChange={() => addAchievedGoal(item, index)} //Si se marca, se pasa a achievedGoals
                            />
                            <button 
                            style={{ position: 'relative', top: -44, left: 405 }}
                            onClick={() => deleteGoal(index)}
                            >
                                x
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles.no_goals}>
                    <h1>
                        <em>You don't have any goals yet</em>
                    </h1>
                    <h2>
                        <em>Try adding one!</em>
                    </h2>
                </div>
            )}
        </main>
    );
}
