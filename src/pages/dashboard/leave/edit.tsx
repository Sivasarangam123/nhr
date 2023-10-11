import { Helmet } from 'react-helmet-async';
// sections
import LeaveEditView from 'src/sections/leave/view/leave-edit-view';

// ----------------------------------------------------------------------

export default function LeaveEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Leave Edit</title>
      </Helmet>

      <LeaveEditView />
    </>
  );
}
