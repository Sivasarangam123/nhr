import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { TEAMS, USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from 'src/_mock';
// types
import { Country, IUserItem, IUserUpdateItem } from 'src/types/user';
// assets
import { countries_mvp } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { updateUser, useGetUsers } from 'src/api/user';
import uuidv4 from 'src/utils/uuidv4';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentUser: IUserItem;
};

export default function UserQuickEditForm({ currentUser, open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  // const { users, usersLoading, usersEmpty } = useGetUsers();

  const NewUserSchema = Yup.object().shape({
    id: Yup.string().required('ID is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role is required'),
    team: Yup.string().required('Team is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    state: Yup.string().required('State is required'),
    status: Yup.string().required('Status is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    zipCode: Yup.string().required('Zip Code is required'),
    company: Yup.string().required('Company is required'),
    avatarUrl: Yup.string().required('Avatar URL is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    isVerified: Yup.bool().required('Verification status is required'),
    disabled: Yup.bool().required('Disabled status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || '',
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      city: currentUser?.city || '',
      role: currentUser?.role || '',
      team: currentUser?.team || '',
      email: currentUser?.email || '',
      state: currentUser?.state || '',
      status: currentUser?.status || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      zipCode: currentUser?.zipCode || '',
      company: currentUser?.company || '',
      avatarUrl: currentUser?.avatarUrl || '',
      phoneNumber: currentUser?.phoneNumber || '',
      isVerified: currentUser?.isVerified || false,
      disabled: currentUser?.disabled || false,
      organizationId: currentUser?.organization?.id || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const userItem: IUserUpdateItem = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      status: data.status,
      isVerified: data.isVerified || false,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
      company: data.company,
      phoneNumber: data.phoneNumber,
      avatarUrl: data.avatarUrl,
      disabled: data.disabled || false,
      organizationId: currentUser?.organization?.id || '',
      team: data.team,

      id: '', // currentUser?.id ? currentUser?.id : uuidv4(),
    };

    if (currentUser) {
      currentUser.firstName = data.firstName;
    }

    try {
      await updateUser(currentUser?.id || '', userItem);

      reset();
      onClose();
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
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

            <RHFTextField name="firstName" label="First Name" />
            <RHFTextField name="lastName" label="Last Name" />
            <RHFTextField name="email" label="Email Address" />
            <RHFTextField name="phoneNumber" label="Phone Number" />

            <RHFTextField name="state" label="State/Region" />

            <RHFTextField name="city" label="City" />
            <RHFTextField name="address" label="Address" />
            <RHFTextField name="zipCode" label="Zip/Code" />
            <RHFTextField name="company" label="Company" />
            <RHFSelect name="team" label="Team">
              {TEAMS.map((team) => (
                <MenuItem key={team.value} value={team.value}>
                  {team.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name="role" label="Role">
              {USER_ROLE_OPTIONS.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
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
