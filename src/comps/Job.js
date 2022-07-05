import { useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { Grid, IconButton, Box } from '@mui/material';

import DeleteDialog from '../mui/deleteDialog';
import EditDialog from '../mui/editDialog';
import '../mui/custom.css';

export default function Job(props) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClose = (value) => {
    setOpen(false);
    if (value !== false) {
      props.deleteClick(value);
    }
  };
  const handleCloseEdit = (value) => {
    setOpenEdit(false);
    if (value !== false) {
      props.editClick(value);
    }
  };

  return (
    <Box className="jobListLine">
      <DeleteDialog
        open={open}
        onClose={handleClose}
        jobName={props.name}
        jobId={props.jobId}
      />
      <EditDialog
        open={openEdit}
        onClose={handleCloseEdit}
        jobName={props.name}
        jobPriority={props.priority}
        jobId={props.jobId}
      />

      <Grid container spacing={1}>
        <Grid item md={8} sm={8} xs={6}>{props.name}</Grid>
        <Grid item md={2} sm={2} xs={3} textAlign="center">
          <Box className={"priorityBox priority-" + props.priority}>
            {props.priority}
          </Box>
        </Grid>
        <Grid item md={2} sm={2} xs={3} textAlign="right" paddingRight={1}>
          <IconButton aria-label="edit" size="small"
            onClick={(e) => setOpenEdit(true)} >
            <Edit fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="delete" size="small"
            onClick={(e) => setOpen(true)} >
            <Delete fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}