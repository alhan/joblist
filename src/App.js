import { LensBlur } from '@mui/icons-material';
import ContextProvider from './utils/ContextProvider';
import JobList from './comps/JobList';
import CreateJob from './comps/CreateJob';
import { Container, Typography, Box, Grid, Divider } from '@mui/material';
import './mui/custom.css';

function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={1}>
          <Grid item>
            <LensBlur fontSize="large" color="primary" />
          </Grid>
          <Grid item>
            <Typography variant="h4" component="h2" gutterBottom color="primary">
              Logo
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <ContextProvider>
          <CreateJob />
          <Divider sx={{ my: 2 }} />
          <JobList />
        </ContextProvider>
        <Box className='footer'>
          <Typography variant="p" gutterBottom>
            Alhan Özdemir @2022
          </Typography>

        </Box>
      </Box>
    </Container>
  );
}
export default App;
