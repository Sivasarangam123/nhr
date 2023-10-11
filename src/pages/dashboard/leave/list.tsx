import { Helmet } from 'react-helmet-async';
// sections
import { LeaveListView } from 'src/sections/leave/view';

// ----------------------------------------------------------------------

export default function LeaveListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Leave List</title>
      </Helmet>

      <LeaveListView />
    </>
  );
}
