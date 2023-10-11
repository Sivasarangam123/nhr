import { Helmet } from 'react-helmet-async';
// sections
import { EducationListView } from 'src/sections/education/view';

// ----------------------------------------------------------------------

export default function EducationListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Education List</title>
      </Helmet>

      <EducationListView />
    </>
  );
}
