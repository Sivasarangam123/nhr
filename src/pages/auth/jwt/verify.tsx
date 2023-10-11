import { Helmet } from 'react-helmet-async';
import ClassicVerifyView from '../../../sections/auth/jwt/classic-verify-view';
// sections

// ----------------------------------------------------------------------

export default function ClassicVerifyPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Verify</title>
      </Helmet>

      <ClassicVerifyView />
    </>
  );
}
