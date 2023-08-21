import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Slider, TextField } from '@mui/material'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { MyContext } from '../MyContext';


const PasswodGenerator = () => {
    const [length, setLength] = useState(8);
    const alphabetsup = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const alphabetslw = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const specialChar = ['@', '#', '$', '&'];
    const data = { ult: alphabetsup, llt: alphabetslw, num: numbers, splchar: specialChar };

    const { storage, setStorage } = useContext(MyContext);

    const [checked, setChecked] = useState({
        ult: true,
        llt: false,
        num: false,
        splchar: false
    })


    const [state, dispatch] = useReducer((state, action) => {

        if (action.type === "SET_PASSWORD") {
            return {
                ...state, record: { ...state.record, password: action.payload }
            }
        }
        else if (action.type === "SET_WNAME") {

            return {
                ...state, record: { ...state.record, wname: action.payload }
            }
        }
        else if (action.type === "RESET_RECORD") {
            return {
                ...state, record: { wname: "", password: "" }
            }
        }
        else if (action.type === "SET_STORAGE") {
            setStorage([...state.storage, action.payload]);
            return {
                ...state, storage: [...state.storage, action.payload]
            }
        }
        else {
            return state
        }
    },
        {
            record: { wname: "", password: "" },
            storage: storage.length > 0 ? [...storage] : []
        });


    function generatePassword() {
        let pool = [];
        Object.keys(checked).forEach(ele => {
            if (checked[ele] === true) {
                pool = [...pool, ...data[ele]]
            }
        });

        if (pool.length === 0) {
            alert("Choose a option from the checkbox");
        }
        let pswd = "";
        for (let i = 0; i < length; i++) {
            pswd += pool[Math.floor(pool.length * Math.random(pool.length))];
        }
        dispatch({ type: "SET_PASSWORD", payload: pswd });

    }
    function saveDetails() {

        if (state.record.wname !== "" && state.record.password !== "") {
            dispatch({ type: "SET_STORAGE", payload: state.record });
            localStorage.setItem("password-record", JSON.stringify([...state.storage, state.record]));
            dispatch({ type: "RESET_RECORD" })
        }
        else {
            alert("Enter the fields correctly");
        }
    }
    function handleAction(event, attr) {

        setChecked(checked => ({ ...checked, [attr]: event.target.checked }))


    }
    return (
        <Container maxWidth="sm" sx={{ border: 3, borderColor: 'primary.main', p: 4, borderRadius: 4 }} >
            <TextField label="Website Name" focused sx={{ m: 2 }} value={state.record.wname} onChange={(e) => { dispatch({ type: "SET_WNAME", payload: e.target.value }) }} />
            <TextField label="Generated Password" focused value={state.record.password} sx={{ m: 2 }} />
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
    )
}

export default PasswodGenerator