import { Card, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loginData = {
            user: {
                email, password
            }
        }
        console.log(import.meta.env.VITE_URL)
        const res = await axios.post('http://localhost:3000/auth/signIn', loginData)

        console.log(res.status)
    }

    return(
        <LoginUI setPassword={ setPassword } setEmail={ setEmail } handleSubmit = { handleSubmit }/>
    )
}

const LoginUI = ({ setPassword, setEmail, handleSubmit }) => {
    return (
        <Card sx={{ 
            width: 300, height: 250, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 'px'
            }}>
            <TextField
                id="outlined-multiline-flexible"
                label="email"
                sx={{  width: '93%', marginTop: '20px' }}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                id="outlined-multiline-flexible"
                label="password"
                sx={{ padding: '10px', width: '93%', marginTop: '20px' }}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="div" style={{ display: 'flex', gap: '60px', paddingTop: '20px' }}>
                <Button variant="contained" onClick={ (e) => { handleSubmit(e) } }>login</Button>
                <Button variant="contained" color="secondary">signup</Button>
            </div>
        </Card>
    )
}

export default Login;