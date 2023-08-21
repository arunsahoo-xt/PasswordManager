import { Button, Container, Typography } from '@mui/material';
import React, { Fragment, useState, useEffect } from 'react';

import PasswodGenerator from './components/PasswodGenerator';
import PasswordManager from './components/PasswordManager';
import { MyContext } from './MyContext';

const RandomPassword = () => {

    const [active, setActive] = useState(true);
    const [storage, setStorage] = useState([]);
    useEffect(() => {
        if (localStorage.getItem("password-record") !== null) {
            setStorage(JSON.parse(localStorage.getItem("password-record")));
        }
    }, [])

    return (
        <MyContext.Provider value={{ storage, setStorage }}>

            <Fragment style={{ backgroundColor: 'white' }}>
                <Container maxWidth="md" sx={{ my: 3 }} >

                    <Button variant={active ? "contained" : "outlined"} onClick={() => setActive(!active)}>
                        <Typography variant="h6" m={2}>
                            Password Generator
                        </Typography>

                    </Button >
                    <Button variant={active ? "outlined" : "contained"} onClick={() => setActive(!active)}>
                        <Typography variant="h6" m={2}>
                            Password Manager
                        </Typography>
                    </Button>

                </Container>

                {active ? <PasswodGenerator /> : <PasswordManager />}
            </Fragment >
        </MyContext.Provider>
    )
}

export default RandomPassword