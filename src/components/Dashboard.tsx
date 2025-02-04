import { Card, CardContent, Container, Grid2, List, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {TaskList} from "./TaskList";

function Dashboard() {
  return (
    <Container sx={{ marginY: 3 }}>
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: 5, lg: 4 }}>
        <TaskList/>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 7, lg: 8 }}>
        À FAIRE: Créer un composant qui affiche les tâches à faire et les
        tâches complétées de la liste sélectionnée.
      </Grid2>
    </Grid2>
  </Container>

  );
}

export default Dashboard;
