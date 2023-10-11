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

import { IAssetCreateItem, IAssetItem, IAssetUpdateItem } from 'src/types/asset';

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

import { newCreateAsset, updateAsset } from 'src/api/asset';

import uuidv4 from 'src/utils/uuidv4';

import { _STATUS_OPTIONS } from 'src/_mock/map/_asset';

// ----------------------------------------------------------------------

type Props = {
  currentAsset?: IAssetItem;
};

export default function AssetNewEditForm({ currentAsset }: Props) {
  console.log('currentasset', currentAsset);

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();

  const { category } = params;

  const NewAssetSchema = Yup.object().shape({
    category: Yup.string().required('Category is required'),

    processor: Yup.string().required('Processor is required'),

    ram: Yup.string().required('Ram is required'),

    productCompany: Yup.string().required('Product Company is required'),

    workingStatus: Yup.string().required('WorkingStatus is required'),

    status: Yup.string(),
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
      if (currentAsset) {
        const assetItem: IAssetItem = {
          id: currentAsset?.id ?? '',

          category: currentAsset?.category ?? '',

          processor: currentAsset?.processor ?? '',

          ram: currentAsset?.ram ?? '',

          productCompany: currentAsset?.productCompany ?? '',

          workingStatus: currentAsset?.workingStatus ?? '',

          status: currentAsset?.status ?? '',
        };

        await updateAsset(currentAsset?.category ?? '', assetItem)
          .then((res) => {
            console.log('res', res);
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        const assetItem: IAssetUpdateItem = {
          category: data.category,

          processor: data.processor,

          ram: data.ram,

          productCompany: data.productCompany as string,

          status: data.status,

          workingStatus: data.workingStatus,

          id: uuidv4(),
        };

        await newCreateAsset(assetItem)
          .then((res) => {
            console.log('res', res);
          })
          .catch((err) => {
            console.log('err', err);
          });
      }

      reset();

      enqueueSnackbar(currentAsset ? 'Update success!' : 'Create success!');

      router.push(paths.dashboard.asset.list);

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
            <RHFTextField name="category" label="Category" />

            <RHFTextField name="processor" label="Processor" />

            <RHFTextField name="ram" label="Ram" />

            <RHFTextField name="productCompany" label="ProductCompany" />

            <RHFTextField name="workingStatus" label="WorkingStatus" />

            <RHFSelect name="status" label="Status">
              {_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentAsset ? 'Create Asset' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}
