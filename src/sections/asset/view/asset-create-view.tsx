
// @mui

import Container from '@mui/material/Container';

// routes

import { paths } from 'src/routes/paths';

// components

import { useSettingsContext } from 'src/components/settings';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

//

import AssetNewEditForm from '../asset-new-edit-form';

 

// ----------------------------------------------------------------------

 

export default function AssetCreateView() {

  const settings = useSettingsContext();

 

  return (

    <Container maxWidth={settings.themeStretch ? false : 'lg'}>

      <CustomBreadcrumbs

        heading="Create a new Asset"

        links={[

          {

            name: 'Dashboard',

            href: paths.dashboard.root,

          },

          {

            name: 'Asset',

            href: paths.dashboard.asset.root,

          },

          { name: 'New asset' },

        ]}

        sx={{

          mb: { xs: 3, md: 5 },

        }}

      />

 

      <AssetNewEditForm />

    </Container>

  );

}

 