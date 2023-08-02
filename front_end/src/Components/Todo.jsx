import { Typography, Paper, Checkbox } from "@mui/material"
import { Color, Font } from '../constants'
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'inline-block',
    width: '500px'
}));
  

const Todo = ({ todo, setTodoList, todoList }) => {
    const [itemColor, setItemColor] = useState(Color.additionalColors[0])
    const [completedStatus, setCompletedStatus] = useState(todo.completedStatus)

    const handleMouseOver = (event) => {
        setItemColor(Color.additionalColors[1])
    };
      
    const handleMouseOut = (event) => {
        setItemColor(Color.additionalColors[0])
    };

    const headers = {
        headers: {
            authorization: `${localStorage.getItem('authorization')}`
        }
    }

    const getDataId = (event) => {
        const item = event.target.closest('[data-id]');
        return item.getAttribute('data-id')
    }

    const handleUpdate = async (event) => {
        console.log(event.target.checked)
        const id = getDataId(event)
        const update = {
            todo: {
                completedStatus: event.target.checked
            }
        }
        const res = await axios.put(import.meta.env.VITE_DEV_SERVER_URL + `/todo/${id}`, update, headers)
        setCompletedStatus(!event.target.checked)
        if(res.status !== 200){
            console.log("Unable to update todo")
        }
    }

    const handleDelete = async (event) => {
        const id = getDataId(event)
        const res = await axios.delete(import.meta.env.VITE_DEV_SERVER_URL + `/todo/${id}`, headers)
        setTodoList(todoList.filter((todo) => todo._id !== id))
    }

    return <TodoUI 
                todo={todo} handleDelete={handleDelete} handleUpdate={handleUpdate} completedStatus={completedStatus}
                handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut} itemColor={itemColor}>
            </TodoUI>
}

const TodoUI = ({todo, handleDelete, handleUpdate, handleMouseOver, handleMouseOut, itemColor, completedStatus}) => {
    const label = { inputProps: { 'aria-label': 'todo completed' } };
    return (
        <div style={{ display: "flex" }} data-id={todo._id}>
            <Checkbox 
                {...label} sx={{ position: 'relative', bottom: '5px' }} onClick={handleUpdate}
                checked={completedStatus}
            />
            <Item key={todo._id}
                onMouseOver={e => handleMouseOver(e)}
                onMouseOut={e => handleMouseOut(e)}
                sx={{ backgroundColor: itemColor }}
            >
                <Typography sx={{ fontFamily: Font.paragraph, color: Color.text}}>
                    {todo.title}
                </Typography>
            </Item>
            <DeleteIcon sx={{ color: Color.additionalColors[1] }} onClick={handleDelete} style={{ cursor: 'pointer' }}/>
        </div>
    )
}

export default Todo