import { Helmet } from 'react-helmet-async';
// sections
import { LeaveCreateView } from 'src/sections/leave/view';

// ----------------------------------------------------------------------

export default function LeaveCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new leave</title>
      </Helmet>

      <LeaveCreateView />
    </>
  );
}
