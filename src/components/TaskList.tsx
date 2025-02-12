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
  ListItemText,
  IconButton,
  ListItemButton

} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TaskListDS from "../data_services/TaskListDS";
import ITaskList from "../data_interfaces/ITaskList";
import { PlaylistAdd } from "@mui/icons-material";





interface TaskListProps {
  onSelectTaskList: (id: string, name: string) => void; // selectionner une liste
  onDeleteSelectedTaskList: () => void;
  selectedTaskListId: string | null;
}



export const TaskList: React.FC<TaskListProps> = ({ onSelectTaskList, onDeleteSelectedTaskList, selectedTaskListId, }) => {
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
        id: uuid(),
        name: listName,
        tasks: [],
      };
      //enregistrer dans le ds
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
    await TaskListDS.remove(taskListToRemove);
    await fetchTaskLists();
    if (taskListToRemove.id === selectedTaskListId) {
      onDeleteSelectedTaskList();
    }
  };


  const card = (

    <React.Fragment>
      <Card sx={{ maxWidth: 400 }}>
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
              textAlign: 'center'
            }}
          >Vos listes de tâches
          </Typography>


          {/* Liste d listes de taches */}
          {taskLists.length > 0 ? (
            <List>
              {taskLists.map((taskList) => (
                <ListItemButton
                  key={taskList.id}
                  onClick={() => onSelectTaskList(taskList.id, taskList.name)}
                >
                  <ListItemText primary={taskList.name} />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation(); // corrige un bug qui empêchait de fermer le dialog
                      handleDeleteList(taskList);
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography
              variant="body1"
              sx={{
                margin: "20px",
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: "0.00938em",
                fontStyle: "italic",
                textAlign: "center",
                color: "grey",
              }}
            >
              Aucune liste
            </Typography>

          )}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{ minWidth: 300, justifyContent: "center" }} variant="outlined" color="primary" startIcon={<PlaylistAdd />} onClick={handleOpenDialog}>Nouvelle liste</Button>
          </Box>


          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle><PlaylistAdd /> Nouvelle liste</DialogTitle>
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCreateList();
                  }
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

