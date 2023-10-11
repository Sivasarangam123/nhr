import { Helmet } from 'react-helmet-async';

// sections

import { AssetListView } from 'src/sections/asset/view';

 

// ----------------------------------------------------------------------

 

export default function AssetListPage() {

  return (

    <>

      <Helmet>

        <title> Dashboard: Asset List</title>

      </Helmet>

 

      <AssetListView />

    </>

  );

}