import { Card, CardContent, Container, Grid2, List, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {TaskList} from "./TaskList";
import {Tasks} from "./Tasks";
import {useState} from "react";

function Dashboard() {
  const [selectedTaskListId, setSelectedTaskListId] = useState<string | null>(null);
  const [selectedTaskListName, setSelectedTaskListName] = useState<string | null>(null);

  const handleSelectTaskList = (id: string, name: string) => {
    setSelectedTaskListId(id);
    setSelectedTaskListName(name);
  };

  const handleDeleteSelectedTaskList = () => {
    setSelectedTaskListId(null);
    setSelectedTaskListName(null);
  };

  return (
    <Container 
      sx={{ 
        marginY: 3,
        paddingLeft: 0,
        paddingRight: 0,
        maxWidth: '100%'
      }}
    >
      <Grid2 container spacing={2} sx={{ margin: 0, width: '100%' }}>
      <Grid2 size={{xs:12, md:5, lg:4}}>
          <TaskList 
            onSelectTaskList={handleSelectTaskList} 
            onDeleteSelectedTaskList={handleDeleteSelectedTaskList} 
            selectedTaskListId={selectedTaskListId} 
          />
        </Grid2>
        <Grid2 size={{xs:12, md:7, lg:8}}>
          {selectedTaskListId ? (
            <Tasks taskListId={selectedTaskListId} taskListName={selectedTaskListName} />
          ) : null}
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default Dashboard;