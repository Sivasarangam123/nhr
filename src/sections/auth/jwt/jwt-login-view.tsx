import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import styled from '@emotion/styled';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hook';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
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

export default function JwtLoginView() {

  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'bhakta@ensarsolutions.com',
    password: '!Nellore123',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });
 const renderLogo = (
  <>
    <img src={Logo} alt='logo' />
</>
 );

  const renderHead = (
    <Stack spacing={2} sx={{ fontSize: 25, marginBottom: '20px', marginTop: '20px', marginLeft: '12px' }}>
      <Typography variant="h4">Hi, Welcome back</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5} sx={{marginLeft: '12px'}}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <StyledTextfield name="email" label="Email address" sx={{"& .MuiOutlinedInput-notchedOutline":{
        border: '1px solid #bfbbbb'
      }}} />

      <StyledTextfield
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        sx={{"& .MuiOutlinedInput-notchedOutline":{
          border: '1px solid #bfbbbb'
        }}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          backgroundColor: '#005F9E'
        }}
      >
        Login
      </LoadingButton> */}
      <StyledLoadingButton
       fullWidth
       color="inherit"
       size="large"
       type="submit"
       variant="contained"
       loading={isSubmitting}
      >
        Login
      </StyledLoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.forgotPassword}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
          alignSelf: 'flex-end',
          color: '#005F9E',
        }}
      >
        Forgot password?
      </Link>
      
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderLogo}

      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
