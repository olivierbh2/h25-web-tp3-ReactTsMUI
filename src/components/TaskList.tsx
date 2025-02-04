import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Icon,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskListDS from "../data_services/TaskListDS"; 
import ITaskList from "../data_interfaces/ITaskList"; 


  export const TaskList: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [listName, setListName] = useState(""); 
  const [isTooltipOpen, setIsTooltipOpen] = useState(false); 
  const [taskLists, setTaskLists] = useState<ITaskList[]>([]); 

  //loader les liste
  const fetchTaskLists = async () => {
    const taskLists = await TaskListDS.getAll();
    setTaskLists(taskLists);
  };

  useEffect(() => {
    fetchTaskLists();
  }, []);

  //ouvrir et fermer dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setListName(""); 
    setIsTooltipOpen(false); 
  };

  // creer la liste
  const handleCreateList = async () => {
    if (listName.trim()) {
        const newTaskList: ITaskList = {
            id : uuid(),
            name : listName,
            tasks : [],
        };
        //enregistrer dans data servuice
        await TaskListDS.create(newTaskList);
        await fetchTaskLists();


      console.log("Liste créée :", listName);
      handleCloseDialog();

    } 
    else {
      setIsTooltipOpen(true);
    }
  };

  const handleDeleteList = async (taskListToRemove: ITaskList) => {
    await TaskListDS.remove(taskListToRemove); // Supprimer la liste du localStorage
    await fetchTaskLists(); // Mettre à jour les listes affichées
  };


    const card = (
        <React.Fragment>
            <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                    
                    <Typography variant="h5" 
                        sx={{ 
                        margin: 0,
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                        fontSize: '1.5rem',
                        lineHeight: 1.334,
                        letterSpacing: '0em',
                        color: 'rgb(25, 118, 210)',
                        fontWeight: 700,
                        textAlign: 'center'}}
                        >Vos listes de tâches
                    </Typography>

                    
                    {taskLists.length > 0 ? (
                            <List>
                                {taskLists.map((taskList) =>(
                                    <ListItem
                                    key={taskList.id}
                                    secondaryAction={
                                        <IconButton
                                             edge="end"
                                             aria-label="delete"
                                             onClick={ () => handleDeleteList(taskList)}
                                        >
                                        <DeleteIcon/>
                                        </IconButton>
                                    }
                                    >
                                    <ListItemText primary={taskList.name} />
                                     </ListItem>
                                ))}
                            </List>
                        ) : 
                        <Typography
                        sx={{ textAlign: "center", mt: 2, color: "text.secondary" }}>
                            Aucune liste
                        </Typography>

                    }
    
                    <Box sx={{display: "flex", justifyContent: "center", mt:2}}>
                        <Button
                        variant="contained" color="primary" onClick={handleOpenDialog}>Nouvelle liste</Button>
                    </Box>

                    
                    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                        <DialogTitle>Créer une liste</DialogTitle>
                    <DialogContent>
                        <TextField 
                        required 
                        autoFocus 
                        margin="dense" 
                        label="Nom de la liste" 
                        value={listName} 
                        slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start"></InputAdornment>,
                            },
                          }}
                          variant="standard"
                        onChange={(e) => {
                            setListName(e.target.value);
                            setIsTooltipOpen(false);
                          }}
                          error={isTooltipOpen && !listName.trim()}
                          helperText={
                            isTooltipOpen && !listName.trim() ? "Veuillez remplir ce champ" : ""
                          }
                          />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="secondary">
                            Annuler
                        </Button>
                        <Button onClick={handleCreateList} color="primary">
                            Créer
                        </Button>
                        </DialogActions>
                    </Dialog>
                    
    
    
                    </CardContent>
                </Card>
        </React.Fragment>
    )

    return card;

  }
  
