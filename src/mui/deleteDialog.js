import PropTypes from 'prop-types';
import { Report } from '@mui/icons-material';
import { Dialog, Button, Stack, Typography } from '@mui/material';

export default function DeleteDialog(props) {
  const { onClose, open, jobName, jobId } = props;

  const handleClose = () => {
    onClose(false);
  };
  const handleApprove = (value) => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"xs"} fullWidth>
      <Typography variant='h4' m={0} mt={2} textAlign="center">Delete Job</Typography>
      <Typography variant='p' m={1} textAlign="center">{jobName}</Typography>
      <Stack alignItems="center">
        <Report fontSize='large' color='error' />
      </Stack>

      <Stack direction="row" spacing={5} alignSelf={"center"} padding={3}>
        <Button variant="contained" fullWidth
          onClick={() => handleClose()}>Cancel</Button>
        <Button variant="contained" color='error' fullWidth
          onClick={() => handleApprove(jobId)}>Approve</Button>
      </Stack>

    </Dialog>
  );
}
DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  jobName: PropTypes.string.isRequired,
  jobId: PropTypes.string.isRequired,
};