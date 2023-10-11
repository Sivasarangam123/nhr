// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
// _mock
// import { _leaveList } from 'src/_mock';
import { _leaveList } from 'src/_mock/map/_leave';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
// import { useGetUsers } from 'src/api/user';
import { useGetLeaves } from 'src/api/leave';
import LeaveNewEditForm from '../leave-new-edit-form';

// ----------------------------------------------------------------------

export default function LeaveEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;
  const { leaves, leavesLoading, leavesEmpty } = useGetLeaves();
  const currentLeave = leaves.find((leave) => leave.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Leave',
            href: paths.dashboard.leave.root,
          },
          { name: currentLeave?.user?.firstName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <LeaveNewEditForm currentLeave={currentLeave} />
    </Container>
  );
}
