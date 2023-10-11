import { Helmet } from 'react-helmet-async';
// sections
import { EducationCreateView } from 'src/sections/education/view';

// ----------------------------------------------------------------------

export default function EducationCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Education</title>
      </Helmet>

      <EducationCreateView />
    </>
  );
}
