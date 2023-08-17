import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Slider, TextField, Typography } from '@mui/material';
import React, { Fragment, useState, useEffect } from 'react';
import ContentPasteSharpIcon from '@mui/icons-material/ContentPasteSharp';

const RandomPassword = () => {
    const alphabetsup = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const alphabetslw = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const specialChar = ['@', '#', '$', '&'];
    const data = { ult: alphabetsup, llt: alphabetslw, num: numbers, splchar: specialChar };
    const [record, setRecord] = useState({
        wname: "",
        password: ""
    });
    const [storage, setStorage] = useState([]);

    const [length, setLength] = useState(8);
    const [checked, setChecked] = useState({
        ult: true,
        llt: false,
        num: false,
        splchar: false
    })
    const [pool, setPool] = useState([]);
    const [active, setActive] = useState(true);
    //     const Container = styled.div`
    // background-color:black
    // `
    useEffect(() => {
        if (localStorage.getItem("password-record") !== null) {
            // console.log(localStorage.getItem)
            setStorage(JSON.parse(localStorage.getItem("password-record")));
        }
    }, [])
    useEffect(() => {

        let newpool = [];
        Object.keys(checked).forEach(ele => {
            // console.log(ele);
            if (checked[ele] == true) {
                newpool = [...newpool, ...data[ele]]
            }
        });
        // console.log(newpool);
        setPool([...newpool]);

    }, [checked])
    // useEffect(() => {
    //     localStorage.setItem("password-record", storage);
    // }, [storage])
    // const activeProp = {
    //     backgroundColor: 'blue'
    // }
    // const inactiveProp = {
    //     backgroundColor: 'grey'
    // }
    function generatePassword() {
        // console.log(pool);
        if (pool.length == 0) {
            alert("Choose a option from the checkbox");
        }
        let pswd = "";
        for (let i = 0; i < length; i++) {
            pswd += pool[Math.floor(pool.length * Math.random(pool.length))];
        }
        setRecord({ ...record, password: pswd });
    }
    function saveDetails() {

        if (record.wname !== "" && record.password !== "") {
            setStorage([...storage, record]);
            localStorage.setItem("password-record", JSON.stringify([...storage, record]));
            setRecord({ wname: "", password: "" });
        }
        else {
            alert("Enter the fields correctly");
        }
    }
    function handleAction(event, attr) {

        setChecked(checked => ({ ...checked, [attr]: event.target.checked }))


    }
    return (
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

            {
                active ? <Container maxWidth="sm" sx={{ border: 3, borderColor: 'primary.main', p: 4, borderRadius: 4 }} >
                    <TextField label="Website Name" focused sx={{ m: 2 }} value={record.wname} onChange={(e) => { setRecord(record => ({ ...record, wname: e.target.value })) }} />
                    <TextField label="Generated Password" focused value={record.password} sx={{ m: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>

                        <Button variant='outlined' onClick={generatePassword}>Generate</Button>
                        <Button variant='outlined' onClick={saveDetails}>Save</Button>
                    </Box>



                    <Slider
                        size="small"
                        defaultValue={8}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        min={4}
                        max={15}
                        onChange={(e) => setLength(e.target.value)}
                    />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} onChange={(e) => handleAction(e, "ult")} label="Alphabets Uppercase" />
                        <FormControlLabel control={<Checkbox />} onChange={(e) => handleAction(e, "llt")} label="Alphabets Lowercase" />
                        <FormControlLabel control={<Checkbox />} onChange={(e) => handleAction(e, "num")} label="Numbers" />
                        <FormControlLabel control={<Checkbox />} onChange={(e) => handleAction(e, "splchar")} label="Special Characters" />
                    </FormGroup>
                </Container>
                    :
                    <Container maxWidth="sm" sx={{ border: 3, borderColor: 'primary.main', p: 4, borderRadius: 4, height: 400, overflow: 'scroll' }}>
                        {storage.length > 0 ? storage.map((ele) => (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'rgb(95, 175, 237)', my: 1, borderRadius: 3 }}>
                                    <Typography m={2}>{ele.wname}</Typography>
                                    <Typography m={2}>{ele.password}</Typography>
                                    <Button sx={{ backgroundColor: 'transparent', color: 'black' }}
                                        onClick={() => navigator.clipboard.writeText(ele.password)}
                                    >
                                        < ContentPasteSharpIcon />
                                    </Button>
                                </Box>

                            </>
                        )) : null}
                    </Container>
            }
        </Fragment >
    )
}

export default RandomPassword