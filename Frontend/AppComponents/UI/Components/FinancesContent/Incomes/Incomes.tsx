import { useState, useEffect } from "react";
import CreateIncome from "./CreateIncome";
import IncomesContainer from "./IncomesContainer";
import styles from './../Styles/incomes.module.css';

interface IncomesProps {
    user: any;
    incomes: any;
    setIncomes: any;
}

export default function Incomes({ user, incomes, setIncomes }: IncomesProps) {

    const [sectionShowed, setSectionShowed] = useState('incomes_container');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (incomes !== null) {
            setLoading(false);
        }
    }, [incomes]);

    return (
        <>
            {loading ? <h1>Loading...</h1>
                :
                incomes ?
                    <div
                        className={styles.incomes}
                        style={{ overflowY: incomes.length > 16 && sectionShowed == 'incomes_container' ? 'scroll' : 'hidden' }}
                    >
                        {sectionShowed == 'incomes_container' ?
                            <IncomesContainer incomes={incomes} setContentShowed={setSectionShowed} />
                            :
                            <CreateIncome user={user} setSectionShowed={setSectionShowed} setIncomes={setIncomes} />}
                    </div> : null}
        </>
    );
}