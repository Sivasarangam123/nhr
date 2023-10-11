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
import { countries_mvp } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { EDUCATION_STATUS_OPTIONS } from 'src/_mock/map/_education';
import { IEducationItem } from 'src/types/education';
import { updateEducation } from 'src/api/education';
// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentEducation: IEducationItem;
};

export default function EducationQuickEditForm({ currentEducation, open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const NewEducationSchema = Yup.object().shape({
    educationCategory: Yup.string().required('Education Category is required'),
    specification: Yup.string().required('Specification is required'),
    instituteName: Yup.string().required('Institute Name is required'),
    startYear: Yup.string().required('Start Year is required'),
    endYear: Yup.string().required('End Year is required'),
    gpa: Yup.string().required('Gpa is required'),
    uploadDocument: Yup.string().required('Upload Document is required'),
    status: Yup.string().required('Status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      educationCategory: currentEducation?.educationCategory || '',
      specification: currentEducation?.specification || '',
      instituteName: currentEducation?.instituteName || '',
      startYear: currentEducation?.startYear || '',
      endYear: currentEducation?.endYear || '',
      gpa: currentEducation?.gpa || '',
      uploadDocument: currentEducation?.uploadDocument || '',
      status: currentEducation?.status || '',
    }),
    [currentEducation]
  );

  const methods = useForm({
    resolver: yupResolver(NewEducationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const educationitem: IEducationItem = {
      educationCategory: data.educationCategory,
      instituteName: data.instituteName,
      specification: data.specification,
      startYear: data.startYear,
      endYear: data.endYear,
      gpa: data.gpa,
      uploadDocument: data.uploadDocument,
      status: data.status,
      id: '',
    };
    if (currentEducation) {
      currentEducation.educationCategory = data.educationCategory;
    }
    try {
      await updateEducation(currentEducation.id.toString(), { ...data, id: currentEducation.id });

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
              {EDUCATION_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

            <RHFTextField name="educationCategory" label="Education Category" />
            <RHFTextField name="specification" label="Specification" />
            <RHFTextField name="instituteName" label="Institute Name" />
            <RHFTextField name="startYear" label="Start Year" />
            <RHFTextField name="endYear" label="End Year" />
            <RHFTextField name="gpa%" label="GPA%" />
            <RHFTextField name="uploadDocument" label="Upload Document" />
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
