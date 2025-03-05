import { useEffect, useState } from 'react';
import styles from './../Styles/incomes.module.css';
import addImage from './../../../../../Images/add-image.png';

interface IncomesContainerProps {
    incomes: any[] | null;
    setContentShowed: (value: string) => void;
}

export default function IncomesContainer({ incomes, setContentShowed }: IncomesContainerProps) {


    return (
        <main className={styles.incomes_container}>
            <img className={styles.addBtn}
                onClick={() => setContentShowed('')}
                src={addImage}
                alt=""
            />
            {incomes && incomes.length !== 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Provenance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomes.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                    {parseFloat(item.amount).toFixed(2)}
                                </td>
                                <td>{item.currency}</td>
                                <td>{item.provenance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h1>There are no incomes to show</h1>)}
        </main>
    );
}
