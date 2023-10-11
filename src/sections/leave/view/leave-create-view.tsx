// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import LeaveNewEditForm from '../leave-new-edit-form';

// ----------------------------------------------------------------------

export default function LeaveCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new leave"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Leave',
            href: paths.dashboard.leave.root,
          },
          { name: 'New leave' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <LeaveNewEditForm />
    </Container>
  );
}
