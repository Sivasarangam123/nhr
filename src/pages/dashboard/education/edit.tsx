import { Helmet } from 'react-helmet-async';
import EducationEditView from 'src/sections/education/view/education-edit-view';
// sections
import LeaveEditView from 'src/sections/leave/view/leave-edit-view';

// ----------------------------------------------------------------------

export default function EducationEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Education Edit</title>
      </Helmet>

      <EducationEditView />
    </>
  );
}
