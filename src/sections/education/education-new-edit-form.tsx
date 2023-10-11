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
import { fData } from 'src/utils/format-number';
import { paths } from 'src/routes/paths';
import { useRouter, useParams } from 'src/routes/hook';
import { countries_mvp } from 'src/assets/data';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFSelect,
} from 'src/components/hook-form';
import uuidv4 from 'src/utils/uuidv4';

import {
  EDUCATION_CATEGORY,
  //   EDUCATION_REASON_OPTIONS,
  EDUCATION_STATUS_OPTIONS,
  GPA,
  SPECIFICATION,
} from 'src/_mock/map/_education';
import { newCreateEducation, updateEducation } from 'src/api/education';
import { IEducationItem, IEducationUpdateItem } from 'src/types/education';

import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  currentEducation?: IEducationItem;
};

export default function EducationNewEditForm({ currentEducation }: Props) {
  console.log('currenteducation', currentEducation);
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const { educationCategory } = params;

  const NewEducationSchema = Yup.object().shape({
    educationCategory: Yup.string().required('Education Category is required'),
    specification: Yup.string().required('Specification is required'),
    instituteName: Yup.string().required('Institute Name is required'),
    startYear: Yup.string().required('Start Year is required'),
    endYear: Yup.string().required('End Year is required'),
    gpa: Yup.string().required('Gpa is required'),
    uploadDocument: Yup.string().required('UploadDocument is required'),
    // reason: Yup.string(),
    status: Yup.string(),
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
      if (educationCategory) {
        const educationItem: IEducationItem = {
          id: currentEducation?.id ?? '',
          educationCategory: currentEducation?.educationCategory ?? '',
          specification: currentEducation?.specification ?? '',
          instituteName: currentEducation?.instituteName ?? '',
          startYear: currentEducation?.startYear ?? '',
          endYear: currentEducation?.endYear ?? '',
          gpa: currentEducation?.gpa ?? '',
          uploadDocument: currentEducation?.uploadDocument ?? '',
          status: currentEducation?.status ?? '',
        };
        await updateEducation(currentEducation?.educationCategory ?? '', educationItem);
      } else {
        const educationItem: IEducationUpdateItem = {
          educationCategory: data.educationCategory,
          specification: data.specification,
          instituteName: data.instituteName,
          startYear: data.startYear,
          endYear: data.endYear,
          gpa: data.gpa,
          uploadDocument: data.uploadDocument,
          status: data.status,
          id: uuidv4(),
        };
        await newCreateEducation(educationItem);
      }
      reset();
      enqueueSnackbar(currentEducation ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.education.list);
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
            <RHFSelect name="educationCategory" label="Education Category">
              {EDUCATION_CATEGORY.map((educationcategory) => (
                <MenuItem key={educationcategory.value} value={educationcategory.value}>
                  {educationcategory.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name="specification" label="SPECIFICATION">
              {SPECIFICATION.map((specification) => (
                <MenuItem key={specification.value} value={specification.value}>
                  {specification.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField name="instituteName" label="institute Name" />
            <RHFSelect name="gpa" label="GPA">
              {GPA.map((gpa) => (
                <MenuItem key={gpa.value} value={gpa.value}>
                  {gpa.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField
              name="startYear"
              label="Start Year"
              inputProps={{
                type: 'date',
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <RHFTextField
              name="endYear"
              label="End Year"
              inputProps={{
                type: 'date',
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <RHFTextField
              name="uploadDocument"
              label="Upload Document"
              inputProps={{
                type: 'file',
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <RHFSelect name="status" label="Status">
              {EDUCATION_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentEducation ? 'Create education' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
      {/* </Grid> */}
    </FormProvider>
  );
}
