import React, { useEffect, useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    IconButton,
    Typography,
    Divider,
    Button,
    TextField,
    Card,
    CardContent,
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TaskDS from "../data_services/TaskDS";
import ITask from "../data_interfaces/ITask";
import { v4 as uuid } from "uuid";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from '@mui/icons-material/Add';


interface TasksProps {
    taskListId: string | null;
    taskListName: string | null; 
}


export const Tasks: React.FC<TasksProps> = ({ taskListId, taskListName }) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [newTaskName, setNewTaskName] = useState<string>("");

    useEffect(() => {
        if (taskListId) {
            fetchTasks(taskListId);
        } else {
            setTasks([]);
        }
    }, [taskListId]);

    // recuperer les taches
    const fetchTasks = async (taskListId: string) => {
        const tasks = await TaskDS.getAll(taskListId);
        setTasks(tasks);
    };

    // ajouter une tache
    const handleAddTask = async () => {
        if (!newTaskName.trim()) return;
        const newTask: ITask = {
            id: uuid(), // genere id unique
            name: newTaskName,
            important: false,
            completed: false,
        };
        await TaskDS.create(taskListId!, newTask);
        setNewTaskName("");
        fetchTasks(taskListId!);
    };

    // completer la tache
    const handleToggleTask = async (task: ITask) => {
        const updatedTask = { ...task, completed: !task.completed };
        await TaskDS.update(taskListId!, updatedTask);
        fetchTasks(taskListId!);
    };

    // toggle tachew importante
    const handleToggleImportant = async (task: ITask) => {
        const updatedTask = { ...task, important: !task.important };
        await TaskDS.update(taskListId!, updatedTask);
        fetchTasks(taskListId!);
    };

    // supprimer tache
    const handleDeleteTask = async (task: ITask) => {
        await TaskDS.remove(taskListId!, task);
        fetchTasks(taskListId!);
    };

    const tachesAFaire = tasks.filter((task) => !task.completed);
    const tachesComplete = tasks.filter((task) => task.completed);

    return (
        <Card>
            <CardContent sx={{margin:2}}>
                {taskListName && (
                    <Typography
                        variant="h5"
                        sx={{
                            margin: 0,
                            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                            fontSize: "1.5rem",
                            lineHeight: 1.334,
                            letterSpacing: "0em",
                            color: "rgb(156, 39, 176)",
                            fontWeight: 700,
                            mt: 1,
                            mb: 1,
                        }}
                    >
                        {taskListName}
                    </Typography>

                )}

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <TextField
                        label="Nouvelle tâche"
                        variant="standard"
                        value={newTaskName}
                        fullWidth
                        sx={{ mr: 2 }}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAddTask();
                            }
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddTask}>
                        <AddIcon />
                    </Button>
                </Box>
                <Typography
                    variant="h6"
                    sx={{
                        margin: "0px 0px 8px",
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        letterSpacing: "0.00938em",
                        color: "rgb(156, 39, 176)",
                        fontWeight: 700,
                    }}
                >
                    Tâches à faire
                </Typography>
                {tachesAFaire.length > 0 ? (
                    <List>
                        {tachesAFaire.map((task) => (
                            <ListItem
                                key={task.id}
                                secondaryAction={
                                    <>
                                        <IconButton onClick={() => handleToggleImportant(task)}>
                                            {task.important ? <StarIcon color="primary" /> : <StarBorderIcon />}
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteTask(task)}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </>
                                }
                            >
                                <Checkbox
                                    checked={task.completed}
                                    onChange={() => handleToggleTask(task)}
                                />
                                <ListItemText primary={task.name} />
                            </ListItem>
                        ))}
                    </List>
                ) :

                    <Typography
                        variant="body1"
                        sx={{
                            margin: "24px 0px 0px",
                            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                            fontWeight: 400,
                            fontSize: "1rem",
                            lineHeight: 1.5,
                            letterSpacing: "0.00938em",
                            fontStyle: "italic",
                            color: "grey",
                        }}
                    >
                        Aucune tâche à faire
                    </Typography>

                }

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="h6"
                    sx={{
                        margin: "0px 0px 8px",
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        letterSpacing: "0.00938em",
                        color: "rgb(156, 39, 176)",
                        fontWeight: 700,
                    }}
                >
                    Tâches complétées
                </Typography>
                {tachesComplete.length > 0 ? (
                    <List>
                        {tachesComplete.map((task) => (
                            <ListItem
                                key={task.id}
                                secondaryAction={
                                    <>
                                        <IconButton onClick={() => handleToggleImportant(task)}>
                                            {task.important ? <StarIcon color="primary" /> : <StarBorderIcon />}
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteTask(task)}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </>
                                }
                            >
                                <Checkbox
                                    checked={task.completed}
                                    onChange={() => handleToggleTask(task)}
                                />
                                <ListItemText primary={task.name} />
                            </ListItem>
                        ))}
                    </List>
                ) :

                    <Typography
                        variant="body1"
                        sx={{
                            margin: "24px 0px 0px",
                            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                            fontWeight: 400,
                            fontSize: "1rem",
                            lineHeight: 1.5,
                            letterSpacing: "0.00938em",
                            fontStyle: "italic",
                            color: "grey",
                        }}
                    >
                        Aucune tâche à faire
                    </Typography>

                }

            </CardContent>
        </Card>
    );
};