import { Helmet } from 'react-helmet-async';

// sections

import { AssetCreateView } from 'src/sections/asset/view';

 

// ----------------------------------------------------------------------

 

export default function AssetCreatePage() {

  return (

    <>

      <Helmet>

        <title> Dashboard: Create a new asset</title>

      </Helmet>

 

      <AssetCreateView />

    </>

  );

}