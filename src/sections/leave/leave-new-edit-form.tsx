import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter, useParams } from 'src/routes/hook';
// types
import { ILeaveCreateItem, ILeaveItem, ILeaveUpdateItem } from 'src/types/leave';
// assets
import { countries_mvp } from 'src/assets/data';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFSelect,
} from 'src/components/hook-form';
import { newCreateLeave, updateLeave } from 'src/api/leave';
// import { TEAMS, LEAVE_REASON_OPTIONS, LEAVE_STATUS_OPTIONS } from 'src/_mock';
import uuidv4 from 'src/utils/uuidv4';
import { LEAVE_REASON_OPTIONS, LEAVE_STATUS_OPTIONS } from 'src/_mock/map/_leave';
import { DatePicker } from '@mui/x-date-pickers';
import { RoleBasedGuard } from 'src/auth/guard';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

type Props = {
  currentLeave?: ILeaveItem;
};

export default function LeaveNewEditForm({ currentLeave }: Props) {
  const router = useRouter();

  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const { employeeName } = params;

  const NewLeaveSchema = Yup.object().shape({
    employeeName: Yup.string().required('Employee Name is required'),

    fromDate: Yup.mixed<any>().nullable().required('From date is required'),
    toDate: Yup.mixed<any>().nullable().required('To date is required'),
    numberOfDays: Yup.string().required('N.O.D is required'),
    comment: Yup.string().required('Comment is required'),
    reason: Yup.string().required('reason is required'),
    status: Yup.string().required('status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      employeeName: currentLeave?.user?.firstName || '',

      fromDate: currentLeave?.fromDate || null,
      toDate: currentLeave?.toDate || null,
      numberOfDays: currentLeave?.numberOfDays || '',
      reason: currentLeave?.reason || '',
      status: currentLeave?.status || '',
      comment: currentLeave?.comment || '',
    }),
    [currentLeave]
  );

  const methods = useForm({
    resolver: yupResolver(NewLeaveSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    try {
      const leaveItem: ILeaveItem = {
        id: currentLeave ? currentLeave?.id : uuidv4(),

        fromDate: data?.fromDate,
        reason: data?.reason,
        status: data?.status,
        toDate: data?.toDate,
        numberOfDays: data?.numberOfDays,
        comment: data?.comment,
      };
      if (currentLeave) await updateLeave(currentLeave?.id, leaveItem);
      else await newCreateLeave(leaveItem);

      reset();
      enqueueSnackbar(currentLeave ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.leave.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="employeeName" label="Employee Name" />

            <Controller
              name="fromDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
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
            <RHFTextField name="toDate" label="To Date" />
            <RHFTextField name="numberOfDays" label="N.O.D" />
            <RHFTextField name="comment" label="comment" />

            <RHFSelect name="reason" label="Reason">
              {LEAVE_REASON_OPTIONS.map((reason) => (
                <MenuItem key={reason.value} value={reason.value}>
                  {reason.label}
                </MenuItem>
              ))}
            </RHFSelect>
            {user?.role === 'ROLE_SUPER_ADMIN' && (
              <RHFSelect name="status" label="Status">
                {LEAVE_STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            )}
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentLeave ? 'Create Leave' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
      {/* </Grid> */}
    </FormProvider>
  );
}
