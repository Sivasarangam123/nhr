import { Helmet } from 'react-helmet-async';
// sections
import { ClassicForgotPasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function ClassicForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Ensar | Ecommerce-Forgot Password</title>
      </Helmet>

      <ClassicForgotPasswordView />
    </>
  );
}
