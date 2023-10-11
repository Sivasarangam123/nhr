import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { RouterLink } from 'src/routes/components';
// assets
import { PasswordIcon } from 'src/assets/icons';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';

// images
import Logo from '../../../assets/images/logo.svg';

// ----------------------------------------------------------------------

const StyledLoadingButton = styled(LoadingButton)({
  backgroundColor: '#005F9E',
  '&:hover':{backgroundColor: '#4288db'}
})

const StyledTextfield = styled(RHFTextField)({
  "& .MuiOutlinedInput-notchedOutline":{
    border: '1px solid #bfbbbb'
  }
})

export default function ClassicForgotPasswordView() {
  const { forgotPassword } = useAuthContext();

  const router = useRouter();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  /* const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  }); */

  const onSubmit = handleSubmit(async (data) => {
    try {
      await forgotPassword?.(data.email);

      const searchParams = new URLSearchParams({ email: data.email }).toString();

      const href = `${paths.auth.jwt.newPassword}?${searchParams}`;
      router.push(href);
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = (
    <Stack spacing={2.5} sx={{ marginLeft: '12px', marginTop: '15px' }}>
      <StyledTextfield name="email" label="Email address" />

      <StyledLoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          backgroundColor: '#005F9E',
          "& .MuiOutlinedInput-notchedOutline":{
            border: '1px solid #bfbbbb'
          }
        }}
      >
        Send Request
      </StyledLoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
          alignSelf: 'flex-end',
          color: '#005F9E',
        }}
      >
        {/* <Iconify icon="eva:arrow-ios-back-fill" width={16} /> */}
        Return to sign in
      </Link>
    </Stack>
  );
  const renderLogo = (
    <>
      <img src={Logo} alt="logo" />
    </>
  );
  const renderHead = (
    <>
      {/* <PasswordIcon sx={{ height: 96 }} /> */}

      <Stack spacing={2}>
        <Typography
          variant="h4"
          sx={{ fontSize: 25, marginBottom: '0px', marginTop: '20px', marginLeft: '12px' }}
        >
          Forgot your password?
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', marginLeft: '12px' }}>
          Please enter the email address associated with your account and We will email you a link
          to reset your password.
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderLogo}

      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
