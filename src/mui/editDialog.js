import PropTypes from 'prop-types';
import { Context } from '../utils/ContextProvider';
import { Dialog, DialogTitle, Button, Stack, TextField, InputLabel, FormControl, Select, MenuItem } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';

export default function EditDialog(props) {
  const { onClose, open, jobName, jobPriority, jobId } = props;
  const { register, handleSubmit, getValues, setValue, formState, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: jobName,
      priority: jobPriority,
    },
    validationFields: ['priority']
  });

  const values = getValues();

  const handleClose = () => {
    onClose(false);
  };
  const handleSave = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"xs"} fullWidth>
      <DialogTitle textAlign={"center"}>Edit Job</DialogTitle>

      <form onSubmit={handleSubmit((data) => {
        handleSave({ id: jobId, data: data });
      })}>
        <Stack direction="column" spacing={3} alignSelf={"center"} paddingX={3}  >
          <Controller
            name="name"
            padding={3}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Job Name"
                size="small"
                disabled
                value={formState.name}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                {...register('name', {
                  pattern: {
                    value: /^[A-Za-z0-9 ıİüÜğĞçÇöÖşŞ]{1,255}$/,
                    message: 'Only Alphanumeric chars'
                  }
                })}
                {...register('name', { maxLength: { value: 255, message: "max 255 chars" } })}
              />
            )}
            rules={{ required: 'Job name required' }}
          />

          <Context.Consumer>
            {context => (
              <Controller
                control={control}
                name="priority"
                render={({ field: { onChange, onBlur, value, ref }, formState }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small">Priority</InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-select-small"
                      id="demo-select-small"
                      label="Priority"
                      value={value}
                      defaultValue={values.priority}
                      onBlur={onBlur}
                      onChange={e => setValue('priority', e.target.value, true)}
                      {...register("priority", {
                        required: "Required",
                      })}
                    >
                      {Object.keys(context.priority).map(pid => (
                        <MenuItem key={pid} value={context.priority[pid]}>{context.priority[pid]}</MenuItem>
                      ))}

                    </Select>
                  </FormControl>
                )}
              />
            )}
          </Context.Consumer>

        </Stack>
        <Stack direction="row" spacing={4} justifyContent="center" padding={4} >
          <Button variant="contained" size='small' fullWidth
            onClick={() => handleClose()}>Cancel</Button>
          <Button type="submit" size="small" variant="contained" color='error' fullWidth>Save</Button>
        </Stack>
      </form>
    </Dialog>
  );
}
EditDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  jobName: PropTypes.string.isRequired,
  jobPriority: PropTypes.string.isRequired,
  jobId: PropTypes.string.isRequired,
};