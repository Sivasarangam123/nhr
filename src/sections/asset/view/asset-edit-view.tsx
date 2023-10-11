// @mui

import Container from '@mui/material/Container';

// routes

import { paths } from 'src/routes/paths';

import { useParams } from 'src/routes/hook';

// _mock


import { _assetList } from 'src/_mock/map/_asset';

// components

import { useSettingsContext } from 'src/components/settings';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

//


import { useGetAssets } from 'src/api/asset';
import AssetNewEditForm from '../asset-new-edit-form';


 

 

// ----------------------------------------------------------------------

 

export default function AssetEditView() {

  const settings = useSettingsContext();

 

  const params = useParams();

 

  const { id } = params;

  const { assets, assetsLoading, assetsEmpty } = useGetAssets();

  const currentAsset = assets.find((asset) => asset.id === id);

 

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

            name: 'Asset',

            href: paths.dashboard.asset.root,

          },

          { name: currentAsset?.category },

        ]}

        sx={{

          mb: { xs: 3, md: 5 },

        }}

      />

 

      <AssetNewEditForm currentAsset={currentAsset} />

    </Container>

  );

}

 