import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Typography} from '@mui/material';
import apiClient from './gateway_connect/api';
import { useHistory } from 'react-router-dom';

const TaskForm = ({ refreshTasks }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority_level, setPriority_Level] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post("/tasks", { title, description, priority_level });
            setTitle("");
            setDescription("");
            setPriority_Level("");
            refreshTasks();
            history.push('/task-display');
        } catch (error) {
            console.error("Error creating tasks: ", error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            sx={{
                backgroundColor: '#C8C8C8',
                color: '#C0C0C0',
                marginTop: '10px',
                boxShadow: 3,
            }}
        >

        <Typography variant="h2" sx={{color:'#FF5733', mb:2, fontSize:'1.5rem'}}>
            Create Task
        </Typography>
            <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                sx={{
                    backgroundColor: "#F5F5F5",
                    color: '#484848',
                    borderRadius: '16px',
                    width: '300px',
                }}
                InputProps={{
                    sx:{
        
                        borderRadius:"16px"
                    }
                }}
            />
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                size="large"
                margin="normal"
                multiline
                sx={{
                    backgroundColor: "#F5F5F5",
                    color: '#484848',
                    borderRadius: '16px',
                }}
                InputProps={{
                    sx:{
        
                        borderRadius:"16px"
                    }
                }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Priority Level</InputLabel>
                <Select
                    value={priority_level}
                    onChange={(e) => setPriority_Level(e.target.value)}
                    sx={{
                        backgroundColor: '#B0B0B0',
                        fontFamily: 'inherit',
                        color: '#000000',
                        width: '200px',
                    }}
                >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                    borderRadius: '16px',
                    backgroundColor: '#ff6347',
                    color: '#FFFFFF',
                    marginTop: '16px',
                }}
            >
                Submit Task
            </Button>
        </Box>
    );
};

export default TaskForm;