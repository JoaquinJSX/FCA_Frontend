import { useState } from "react";
import Header from "./Components/Header";
import Finances from "./Components/FinancesContent/Finances";
import Footer from "./Components/Footer";
import styles from './../Styles/ui.module.css'

interface FinantialControlProps {
    userLoggedIn: any;
    setUserLoggedIn: any;
    users: any;
    setUsers: any;
}

export default function FinantialControl({ userLoggedIn, setUserLoggedIn, users, setUsers }: FinantialControlProps) {

    const [contentShowed, setContentShowed] = useState('incomes');

    return (
        <>
            {userLoggedIn != null && users.length > 0 ?
                <div className={styles.UI_container}>
                    <Header
                        users={users}
                        setUsers={setUsers}
                        userLoggedIn={userLoggedIn}
                        setUserLoggedIn={setUserLoggedIn}
                        contentShowed={contentShowed}
                        setContentShowed={setContentShowed}
                    />
                    <Finances
                        users={users}
                        userLoggedIn={userLoggedIn}
                        contentShowed={contentShowed}
                    />
                    <Footer />
                </div>
                :
                <h1>Loading...</h1>}
        </>
    );
}