// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import EducationNewEditForm from '../education-new-edit-form';

// ----------------------------------------------------------------------

export default function EducationCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Education"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Education',
            href: paths.dashboard.education.root,
          },
          { name: 'New Education' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EducationNewEditForm />
    </Container>
  );
}
