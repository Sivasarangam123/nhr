import { useCallback } from 'react';

// @mui

import Stack from '@mui/material/Stack';

import MenuItem from '@mui/material/MenuItem';

import Checkbox from '@mui/material/Checkbox';

import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';

import IconButton from '@mui/material/IconButton';

import FormControl from '@mui/material/FormControl';

import OutlinedInput from '@mui/material/OutlinedInput';

import InputAdornment from '@mui/material/InputAdornment';

import Select, { SelectChangeEvent } from '@mui/material/Select';

// types

import { IAssetTableFilters, IAssetTableFilterValue } from 'src/types/asset';

// components

import Iconify from 'src/components/iconify';

import CustomPopover, { usePopover } from 'src/components/custom-popover';

 

// ----------------------------------------------------------------------

 

type Props = {

  filters: IAssetTableFilters;

  onFilters: (name: string, value: IAssetTableFilterValue) => void;

  //

  reasonOptions: string[];

};

 

export default function AssetTableToolbar({

  filters,

  onFilters,

  //

  reasonOptions,

}: Props) {

  const popover = usePopover();

 

  const handleFilterName = useCallback(

    (event: React.ChangeEvent<HTMLInputElement>) => {

      onFilters('category', event.target.value);

    },

    [onFilters]

  );

 

  const handleFilterRole = useCallback(

    (event: SelectChangeEvent<string[]>) => {

      onFilters(

        'reason',

        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value

      );

    },

    [onFilters]

  );

 

  return (

    <>

      <Stack

        spacing={2}

        alignItems={{ xs: 'flex-end', md: 'center' }}

        direction={{

          xs: 'column',

          md: 'row',

        }}

        sx={{

          p: 2.5,

          pr: { xs: 2.5, md: 1 },

        }}

      >

        <FormControl

          sx={{

            flexShrink: 0,

            width: { xs: 1, md: 200 },

          }}

        >

          <InputLabel>Reason</InputLabel>

 

          <Select

            multiple

            // value={filters.reason}

            onChange={handleFilterRole}

            input={<OutlinedInput label="Reason" />}

            renderValue={(selected) => selected.map((value) => value).join(', ')}

            MenuProps={{

              PaperProps: {

                sx: { maxHeight: 240 },

              },

            }}

          >

            {/* {reasonOptions.map((option) => (

              <MenuItem key={option} value={option}>

                <Checkbox disableRipple size="small" checked={filters.reason.includes(option)} />

                {option}

              </MenuItem>

            ))} */}

          </Select>

        </FormControl>

 

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>

          <TextField

            fullWidth

            value={filters.category}

            onChange={handleFilterName}

            placeholder="Search..."

            InputProps={{

              startAdornment: (

                <InputAdornment position="start">

                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />

                </InputAdornment>

              ),

            }}

          />

 

          <IconButton onClick={popover.onOpen}>

            <Iconify icon="eva:more-vertical-fill" />

          </IconButton>

        </Stack>

      </Stack>

 

      <CustomPopover

        open={popover.open}

        onClose={popover.onClose}

        arrow="right-top"

        sx={{ width: 140 }}

      >

        <MenuItem

          onClick={() => {

            popover.onClose();

          }}

        >

          <Iconify icon="solar:printer-minimalistic-bold" />

          Print

        </MenuItem>

 

        <MenuItem

          onClick={() => {

            popover.onClose();

          }}

        >

          <Iconify icon="solar:import-bold" />

          Import

        </MenuItem>

 

        <MenuItem

          onClick={() => {

            popover.onClose();

          }}

        >

          <Iconify icon="solar:export-bold" />

          Export

        </MenuItem>

      </CustomPopover>

    </>

  );

}

 