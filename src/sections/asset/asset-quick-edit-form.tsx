import * as Yup from 'yup';

import { useMemo, useState } from 'react';

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

import { _STATUS_OPTIONS } from 'src/_mock/map/_asset';

// types

import { IAssetItem } from 'src/types/asset';

// assets

import { countries_mvp } from 'src/assets/data';

// components

import Iconify from 'src/components/iconify';

import { useSnackbar } from 'src/components/snackbar';

import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

import { updateAsset } from 'src/api/asset';

import { paths } from 'src/routes/paths';

import { useRouter } from 'src/routes/hook';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;

  onClose: VoidFunction;

  currentAsset: IAssetItem;
};

export default function AssetQuickEditForm({ currentAsset, open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const NewAssetSchema = Yup.object().shape({
    category: Yup.string().required('Category is required'),

    processor: Yup.string().required('Processor is required'),

    ram: Yup.string().required('Ram is required'),

    productCompany: Yup.string().required('Product Company is required'),

    workingStatus: Yup.string().required('Working Status is required'),

    status: Yup.string().required('Status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      category: currentAsset?.category || '',

      processor: currentAsset?.processor || '',

      ram: currentAsset?.ram || '',

      productCompany: currentAsset?.productCompany || '',

      workingStatus: currentAsset?.workingStatus || '',

      status: currentAsset?.status || '',
    }),

    [currentAsset]
  );

  const methods = useForm({
    resolver: yupResolver(NewAssetSchema),

    defaultValues,
  });

  const {
    reset,

    handleSubmit,

    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const assetItem: IAssetItem = {
        id: currentAsset?.id ?? '',

        category: currentAsset?.category ?? '',

        processor: currentAsset?.processor ?? '',

        ram: currentAsset?.ram ?? '',

        productCompany: currentAsset?.productCompany ?? '',

        workingStatus: currentAsset?.workingStatus ?? '',

        status: currentAsset?.status ?? '',

        // reason: currentAsset?.reason ?? ""
      };

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
              {_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

            <RHFTextField name="category" label="Full Name" />

            <RHFTextField name="processor" label="Emp Id" />

            <RHFTextField name="ram" label="ram" />

            <RHFTextField name="productCompany" label="productCompany" />

            <RHFTextField name="workingStatus" label="workingStatus" />
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
