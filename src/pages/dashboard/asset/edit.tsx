import { Helmet } from 'react-helmet-async';

// sections

import AssetEditView from 'src/sections/asset/view/asset-edit-view';

 

// ----------------------------------------------------------------------

 

export default function AssetEditPage() {

  return (

    <>

      <Helmet>

        <title> Dashboard: Asset Edit</title>

      </Helmet>

 

      <AssetEditView />

    </>

  );

}