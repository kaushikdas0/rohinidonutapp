import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Cookie } from '@phosphor-icons/react';

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Cookie size={64} weight="duotone" />
        <Typography variant="h3" sx={{ mt: 2 }}>
          Rohini Donut App
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Foundation verified: MUI ThemeProvider, Phosphor Icons, and Quicksand
          font are all wired up and working.
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }}>
          MUI Button Works
        </Button>
      </Box>
    </Container>
  );
}

export default App;
