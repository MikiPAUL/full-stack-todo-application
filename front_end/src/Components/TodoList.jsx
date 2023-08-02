import axios from "axios"
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography  } from "@mui/material"
import { useEffect, useState } from "react"
import { Color, Font } from '../constants'
import AddIcon from '@mui/icons-material/Add';
import  Todo  from './Todo'
import { useNavigate } from "react-router-dom";

const TodoList = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [todoList, setTodoList] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const headers = {
                headers: {
                    authorization: `${localStorage.getItem('authorization')}`
                }
            }
            const response = await axios.get(import.meta.env.VITE_DEV_SERVER_URL+'/todos', headers)
                                .catch(err => console.log(err))
            const todos = response.data.todos
            setTodoList(todos)
            }
        )();
    }, [])

    const handleLogout = (event) => {
        event.target.style.cursor = 'pointer'
        delete localStorage.authorization
        navigate('/login')
    }

    const handleAdd = async () => {
        const resBody = await axios.post(import.meta.env.VITE_DEV_SERVER_URL+'/todos', {
            todo: { title, body }}, { headers: { authorization: `${localStorage.authorization}` } }
        )
        const newTodo = resBody.data.todo
        setTodoList((todos) => { todos.push(newTodo); return todos })
        setOpenDialog(false)
    }

    return <TodoListUI 
            todoList={todoList} 
            setTodoList={setTodoList} 
            handleLogout={handleLogout}
            handleAdd={handleAdd}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            setBody={setBody}
            setTitle={setTitle}
        />
}

const TodoListUI = ({
            todoList, 
            setTodoList, 
            handleLogout, 
            handleAdd, 
            openDialog, 
            setOpenDialog,
            setBody, 
            setTitle
    }) => {
    return (
        <>  
            <AppBar position="static" 
                        sx={{ 
                            backgroundColor:'RGB(33, 29, 30)', 
                            fontFamily: Font.title,
                            padding: '6px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            paddingLeft: '50px',
                            paddingRight: '50px'
            }}>
                <Typography sx={{ fontFamily: Font.title, fontSize: '24px' }}>TodoList</Typography>
                <Typography sx={{ fontFamily: Font.title, fontSize: '18px' }} 
                    onClick={handleLogout} style={{ cursor: 'pointer' }}
                >Logout</Typography>
            </AppBar>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth={true}>
                <DialogTitle>
                    <Typography sx={{ fontFamily: Font.title, fontSize: '24px' }}> Add Todo </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontFamily: Font.paragraph, fontSize: '18px'}}>
                        Title 
                    </DialogContentText>
                    <TextField multiline fullWidth={true} onChange={(e) => setTitle(e.target.value)}/>                        
                
                    <DialogContentText sx={{ fontFamily: Font.paragraph, fontSize: '18px'}}>
                        Body
                    </DialogContentText>
                    <TextField multiline fullWidth={true} onChange={(e) => setBody(e.target.value)}/>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '60px' }}>
                    <Button variant="contained" color="primary" onClick={handleAdd}>
                        Add
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => setOpenDialog(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <div 
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', 
                alignItems: 'center', paddingTop: '60px'}}
            >   
                <AddIcon 
                    sx={{ position: 'relative', right: '260px', paddingBottom: '20px'}}
                    onClick={() => {setOpenDialog(true)}} style={{ cursor: 'pointer' }}
                />
                <Stack spacing={1} sx={{ paddingBottom: "100px" }}>
                    {todoList.map((todo) => <Todo todo={todo} setTodoList={setTodoList} todoList={todoList} key={todo._id}/>)}
                </Stack>
            </div>
        </>
    )
}

export default TodoList;