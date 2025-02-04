import { Card, CardContent, Container, Grid2, List, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

function Dashboard() {
  return (
    
    <Container sx={{ marginY: 3 }}>
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

          <List>
            
          </List>

        
        </CardContent>
      </Card>
    </Container>
  );
}

export default Dashboard;
