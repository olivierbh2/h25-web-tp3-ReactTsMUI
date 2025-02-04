import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

function Banner() {
  return (
    <AppBar position="static">
      <Container component="nav" disableGutters={true}>
        <Toolbar>
          <PlaylistAddCheckIcon sx={{ marginRight: 1 }} />
          <Typography variant="h6">Gestionnaire de tâches</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Banner;
