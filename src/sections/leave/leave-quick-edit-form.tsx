import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// _mock
// import { LEAVE_REASON_OPTIONS, LEAVE_STATUS_OPTIONS } from 'src/_mock';
import { LEAVE_REASON_OPTIONS, LEAVE_STATUS_OPTIONS } from 'src/_mock/map/_leave';
// types
// import { Country, IUserItem } from 'src/types/user';
import { ILeaveItem } from 'src/types/leave';
// assets
import { countries_mvp } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { updateLeave } from 'src/api/leave';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { isValid } from 'date-fns';
// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentLeave: ILeaveItem;
};

export default function LeaveQuickEditForm({ currentLeave, open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  console.log('currentLeave', currentLeave);
  // const router = useRouter();
  const NewLeaveSchema = Yup.object().shape({
    firstName: Yup.string().required('firstName Name is required'),

    fromDate: Yup.date().nullable().required('From date is required'),
    toDate: Yup.date().nullable().required('To date is required'),
    numberOfDays: Yup.string().required('Number Of Days is required'),
    comment: Yup.string().required('comment is required'),
    reason: Yup.string().required('Reason is required'),
    status: Yup.string().required('Status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentLeave.user?.firstName || '',

      fromDate: currentLeave.fromDate || null,
      toDate: currentLeave.toDate || null,
      numberOfDays: currentLeave.numberOfDays || '',
      comment: currentLeave.comment || '',
      status: currentLeave.status || '',
      reason: currentLeave.reason || '',
    }),
    [currentLeave]
  );

  const methods = useForm({
    resolver: yupResolver(NewLeaveSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const leaveitem: ILeaveItem = {
      fromDate: data.fromDate,
      reason: data.reason,
      status: data.status,
      toDate: data.toDate,
      numberOfDays: data.numberOfDays,
      comment: data.comment,
      id: '',
    };

    try {
      //  await new Promise((resolve) => setTimeout(resolve, 500));
      await updateLeave(currentLeave.id.toString(), { ...data, id: currentLeave.id });
      // const leaveItem: ILeaveItem = {
      //   id: currentLeave?.id ?? "",
      //   employeeName: currentLeave?.employeeName ?? "",
      //   employeeId: currentLeave?.employeeId ?? "",
      //   fromDate: currentLeave?.fromDate ?? "",
      //   reason: currentLeave?.reason ?? "",
      //   status: currentLeave?.status ?? "",
      //   toDate: currentLeave?.toDate ?? "",
      //   numberOfDays: currentLeave?.numberOfDays ?? "",
      //   comment: currentLeave?.comment ?? "",
      // }
      reset();
      onClose();
      //  router.push(paths.dashboard.leave.list);
      enqueueSnackbar('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Quick Update</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFSelect name="status" label="Status">
              {LEAVE_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

            <RHFTextField name="firstName" label="firstName" />

            <Controller
              name="fromDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  value={new Date(field.value)}
                  format="MM/dd/yyyy"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="toDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  value={new Date(field.value)}
                  format="MM/dd/yyyy"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />

            <RHFTextField name="numberOfDays" label="N.O.D" />
            <RHFTextField name="comment" label="Comment" />
            <RHFSelect name="reason" label="Reason">
              {LEAVE_REASON_OPTIONS.map((reason) => (
                <MenuItem key={reason.value} value={reason.value}>
                  {reason.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
