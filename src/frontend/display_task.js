import React, { useState, useEffect } from 'react';
import apiClient from './gateway_connect/api';
import { Typography, List, ListItem, ListItemText, Box, MenuItem, Select, FormControl, InputLabel, Button, Grid } from '@mui/material';

const DisplayTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [priorityFilter, setPriorityFilter] = useState('');
    const [completionFilter, setCompletionFilter] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await apiClient.get("/get-tasks", {
                    params: {
                        priority: priorityFilter,
                        completed: completionFilter,
                    },
                });
                setTasks(response.data);
            } catch (error) {
                console.error("Error while fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [priorityFilter, completionFilter]);

    const backtoCreate = () => {
        window.location.href = "/create-task";
    };

    return (
        <div>
            <Typography variant="h2" sx={{color:'#FF5733', mb:2, fontSize:'1.5rem', mt: 4}}>
                Task Display
        </Typography>

            <Box sx={{ margin: '20px 0' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item> 
                    <Button variant="contained" onClick={backtoCreate} sx={{ marginBottom: '20px' }}>
                        Create
                    </Button>
                    </Grid>
                    <Grid item>
                    <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="priority-filter-label" shrink>Priority Level List</InputLabel>
                    <Select
                        labelId="priority-filter-label"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                    </Select>
                    </FormControl>
                    </Grid>
                    <Grid item> 
                    <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="completion-filter-label" shrink>Completion Status</InputLabel>
                    <Select
                        labelId="completion-filter-label"
                        value={completionFilter}
                        onChange={(e) => setCompletionFilter(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="true">Completed</MenuItem>
                        <MenuItem value="false">Not Complete</MenuItem>
                    </Select>
                </FormControl>
                    </Grid>
                </Grid>

            </Box>

            {tasks.length === 0 ? (
                <Typography variant="body1">There are no tasks added yet</Typography>
            ) : (
                <List>
                    {tasks.map((task) => (
                        <ListItem
                            key={task.TaskID}
                            sx={{
                                borderRadius: '10px',
                                backgroundColor: '#F5F5F5',
                                marginBottom: 2,
                                boxShadow: '1px 2px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Typography variant="h5" sx={{ fontWeight: '600' }}>
                                        {task.title}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body1">{task.description}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Priority Level: {task.priority_level}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default DisplayTasks;