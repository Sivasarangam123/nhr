// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
// _mock
import { _leaveList } from 'src/_mock/map/_leave';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import { useGetLeaves } from 'src/api/leave';
import { useGetEducations } from 'src/api/education';
import EducationNewEditForm from '../education-new-edit-form';


// ----------------------------------------------------------------------

export default function EducationEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;
  const { educations, educationsLoading, educationsEmpty } = useGetEducations();
  const currentEducation = educations.find((education) => education.id === id);

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
            name: 'Education',
            href: paths.dashboard.education.root,
          },
          { name: currentEducation?.educationCategory },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EducationNewEditForm currentEducation={currentEducation} />
    </Container>
  );
}
