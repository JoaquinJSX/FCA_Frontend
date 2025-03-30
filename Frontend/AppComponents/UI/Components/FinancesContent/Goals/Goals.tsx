import GoalsContainer from "./GoalsContainer";
import CreateGoal from "./CreateGoal";
import { useState } from "react";
import styles from './../Styles/goals.module.css';

interface GoalsProps {
    user: any;
    goals: any;
    achievedGoals: any;
    setGoals: any;
    setAchievedGoals: any;
}

export default function Goals({ user, goals, achievedGoals, setGoals, setAchievedGoals }: GoalsProps) {

    const [sectionShowed, setSectionShowed] = useState('goals_container');

    return (
        <div className={styles.goals}>
            {sectionShowed === 'goals_container' ?
                <GoalsContainer
                    user={user}
                    goals={goals}
                    setGoals={setGoals}
                    sectionShowed={sectionShowed}
                    setSectionShowed={setSectionShowed}
                    achievedGoals={achievedGoals}
                    setAchievedGoals={setAchievedGoals}
                />
                :
                <CreateGoal
                    user={user}
                    setSectionShowed={setSectionShowed}
                    setGoals={setGoals}
                />}
        </div>
    );
}