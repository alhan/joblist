import { Context } from '../utils/ContextProvider';
import Job from "./Job";
import { Typography, Box, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useContext, useState } from 'react';
import '../mui/custom.css';

export default function JobList() {
  const [NameState, setNameState] = useState("");
  const [PriorityState, setPriorityState] = useState("");

  const context = useContext(Context);
  const jobsAll = context.jobs;

  const jobsSort = Object.values(jobsAll).sort(function (a, b) {
    if (a.priority < b.priority) {
      return -1;
    } else if (a.priority === b.priority) {
      if (a.name < b.name) return -1;
      else return 1;
    } else return 1;
  });

  const jobsFiltered = jobsSort.filter(item => PriorityState !== "" ?
    item.priority.includes(PriorityState) : true)
    .filter(item => NameState !== "" ? item.name.includes(NameState) : true);

  return (
    <Box sx={{ my: 2 }} >
      <Typography variant="h5" gutterBottom color="black">Job List</Typography>

      <Grid container spacing={1} className="jobListFilter">
        <Grid item md={8} xs={9}>
          <TextField
            className='jobListFilterField'
            fullWidth
            id="outlined-name"
            label="Name"
            size="small"
            value={NameState}
            onChange={(e) => setNameState(e.target.value)}
          />
        </Grid>
        <Grid item md={4} xs={3} textAlign="center">
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small">Priority</InputLabel>

            <Select
              className='jobListFilterField'
              fullWidth
              labelId="demo-select-small"
              id="demo-select-small"
              label="Priority"
              value={PriorityState}
              onChange={(e) => setPriorityState(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {Object.keys(context.priority).map(pid => (
                <MenuItem
                  key={pid}
                  value={pid}>
                  {context.priority[pid]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={1} className='jobListTitles'>
        <Grid item sm={8} xs={6}>
          <Box>Name</Box>
        </Grid>
        <Grid item sm={2} xs={3} textAlign="center">Priority</Grid>
        <Grid item sm={2} xs={3} textAlign="right" paddingRight={2}>Action</Grid>
      </Grid>

      {jobsFiltered.map(jobID => (
        <Job
          key={jobID.id}
          jobId={jobID.id}
          name={jobID.name}
          priority={context.priority[jobID.priority]}
          editClick={(e) => context.editClick(e)}
          deleteClick={(e) => context.deleteClick(jobID.id)}
        />
      ))}
    </Box>
  );
}