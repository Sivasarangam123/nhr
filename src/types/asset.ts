import { CustomFile } from 'src/components/upload';
// ----------------------------------------------------------------------
export type IAssetTableFilterValue = string | string[];

export type IAssetTableFilters = {

  category: string;

  status: string;

};

 

export type IAssetItem = {

    id: string;

    category: string;

    processor: string;

    ram: string;

    productCompany: string;

    workingStatus: string;

    status?: string;

};

 

export type IAssetCreateItem = {

    id: string;

    category: string;

    processor: string;

    ram: string;

    productCompany: string;

    workingStatus: string;

    status?: string;

};

 

export type IAssetUpdateItem = {

    id: string;

    category: string;

    processor: string;

    ram: string;

    productCompany: string;

    workingStatus: string;

    status?: string;


  };

