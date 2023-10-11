import { CustomFile } from 'src/components/upload';

// ----------------------------------------------------------------------

export type IEducationTableFilterValue = string | string[];

export type IEducationTableFilters = {
  educationCategory: string;
  status: string;
};

export type IEducationItem = {
   
    id: string;
    educationCategory: string;
    specification: string;
    instituteName: string;
    startYear: string;
    endYear: string;
    gpa: string;
    uploadDocument: string;
    status?: string;



};

export type IEducationCreateItem = {
    id: string;
    educationCategory: string;
    specification: string;
    instituteName: string;
    startYear: string;
    endYear: string;
    gpa: string;
    uploadDocument: string;
    status?: string;


};

export type IEducationUpdateItem = {
    id: string;
    educationCategory: string;
    specification: string;
    instituteName: string;
    startYear: string;
    endYear: string;
    gpa: string;
    uploadDocument: string;
    status?: string;

  };










