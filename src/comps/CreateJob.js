import React, { Fragment } from "react";
import { Context } from '../utils/ContextProvider';
import { Button, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';

export default function CreateJob(props) {

  const { register, handleSubmit, reset, getValues, setValue, formState, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      priority: '',
    },
    validationFields: ['priority']
  });

  const values = getValues();

  return (
    <Context.Consumer>
      {context => (
        <Fragment>
          <Typography variant="h5" gutterBottom color="black">Create New Job</Typography>

          <form onSubmit={handleSubmit((data) => {
            context.saveData(data);
            reset({
              name: '',
              priority: '',
            });
          })}>
            <Grid container spacing={1}>
              <Grid item md={8} xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      label="Job Name"
                      size="small"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      {...register('name', {
                        pattern: {
                          value: /^[A-Za-z0-9 ıİüÜğĞçÇöÖşŞ]{1,255}$/,
                          message: 'Only Alphanumeric chars' // JS only: <p>error message</p> TS only support string
                        }
                      })}
                      {...register('name', { maxLength: { value: 255, message: "max 255 chars" } })}
                    />
                  )}
                  rules={{ required: 'Job name required' }}
                />
              </Grid>

              <Grid item md={2} xs={6}>
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
                        onBlur={onBlur} // notify when input is touched
                        onChange={e => setValue('priority', e.target.value, true)}
                        {...register("priority", {
                          required: "Required",
                        })}
                      >
                        <MenuItem value="">SELECT ONE</MenuItem>
                        {Object.keys(context.priority).map(pid => (
                          <MenuItem key={pid} value={pid}>{context.priority[pid]}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item md={2} xs={6}>
                <Button type="submit" variant="contained" fullWidth disabled={!formState.isValid}>CREATE</Button>
              </Grid>
            </Grid>
          </form>
        </Fragment>
      )}
    </Context.Consumer>
  )
};