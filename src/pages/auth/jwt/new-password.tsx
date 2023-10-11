import { Helmet } from 'react-helmet-async';

// sections
import ClassicNewPasswordView from 'src/sections/auth/jwt/classic-new-password-view';

// ----------------------------------------------------------------------

export default function ClassicNewPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: New Password</title>
      </Helmet>

      <ClassicNewPasswordView />
    </>
  );
}
