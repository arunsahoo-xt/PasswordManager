import { Box, Button, Container, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { MyContext } from '../MyContext';
import ContentPasteSharpIcon from '@mui/icons-material/ContentPasteSharp';

const PasswordManager = () => {
    const { storage } = useContext(MyContext);
    return (
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
    )
}

export default PasswordManager