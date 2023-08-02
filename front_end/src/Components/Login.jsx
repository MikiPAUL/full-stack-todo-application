import { Card, TextField, Button, AppBar } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Font, Color }  from '../constants'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const serverUrl = import.meta.env.VITE_DEV_SERVER_URL + "/auth/signIn"

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loginData = {
            user: {
                email, password
            }
        }
        try{
            const response = await axios.post(serverUrl, loginData)
            const token = response.data.authorization
            localStorage.setItem('authorization', token)

            navigate('/todos')
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <LoginUI setPassword={ setPassword } setEmail={ setEmail } handleSubmit = { handleSubmit }/>
    )
}

const LoginUI = ({ setPassword, setEmail, handleSubmit }) => {
    return (
        <>
            <AppBar position="static" 
                    sx={{ 
                        textAlign:'center', 
                        backgroundColor:'RGB(33, 29, 30)', 
                        fontFamily: Font.title,
                        fontSize: '24px',
                        padding: '6px'
                }}
            >
                Login Page
            </AppBar>
            <div className="flex" 
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100% - 48px)'
            }}>
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
                        sx={{ padding: '10px', width: '93%', marginTop: '20px'}}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="div" style={{ display: 'flex', gap: '60px', paddingTop: '20px'}}>
                        <Button variant="contained" onClick={ (e) => { handleSubmit(e) }} 
                            sx={{ fontFamily: "'Proza Libre', sans-serif;" }}>
                            login
                        </Button>
                        <Button variant="contained" color="secondary"
                            sx={{ fontFamily: "'Proza Libre', sans-serif;" }}>
                            signup
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Login;