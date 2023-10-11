

import Button from '@mui/material/Button';

import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';

import MenuItem from '@mui/material/MenuItem';

import TableRow from '@mui/material/TableRow';

import Checkbox from '@mui/material/Checkbox';

import TableCell from '@mui/material/TableCell';

import IconButton from '@mui/material/IconButton';

import ListItemText from '@mui/material/ListItemText';

// hooks

import { useBoolean } from 'src/hooks/use-boolean';

// types

// components

import Label from 'src/components/label';

import Iconify from 'src/components/iconify';

import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { ConfirmDialog } from 'src/components/custom-dialog';

//

// import LeaveQuickEditForm from './leave-quick-edit-form';

import { IAssetItem } from 'src/types/asset';

import AssetQuickEditForm from './asset-quick-edit-form';

 

 

// ----------------------------------------------------------------------

 

type Props = {

  selected: boolean;

  onEditRow: VoidFunction;

  row: IAssetItem;

  onSelectRow: VoidFunction;

  onDeleteRow: VoidFunction;

};

 

export default function AssetTableRow({

  row,

  selected,

  onEditRow,

  onSelectRow,

  onDeleteRow,

}: Props) {

  const { category, processor, ram, status, productCompany, workingStatus} = row;

 

  const confirm = useBoolean();

 

  const quickEdit = useBoolean();

 

  const popover = usePopover();

 

  return (

    <>

      <TableRow hover selected={selected}>

        <TableCell padding="checkbox">

          <Checkbox checked={selected} onClick={onSelectRow} />

        </TableCell>

 

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>

          {/* <Avatar alt={firstName} src={avatarUrl} sx={{ mr: 2 }} /> */}

 

          <ListItemText

            primary={category}

            // secondary={email}

            primaryTypographyProps={{ typography: 'body2' }}

            secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}

          />

        </TableCell>

 

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{processor}</TableCell>

 

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{ram}</TableCell>

 

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{productCompany}</TableCell>

 

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{workingStatus}</TableCell>

 

        <TableCell>

          <Label

            variant="soft"

            color={

              (status === 'active' && 'success') ||

              (status === 'pending' && 'warning') ||

              (status === 'banned' && 'error') ||

              'default'

            }

          >

            {status}

          </Label>

        </TableCell>

 

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>

          <Tooltip title="Quick Edit" placement="top" arrow>

            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>

              <Iconify icon="solar:pen-bold" />

            </IconButton>

          </Tooltip>

 

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>

            <Iconify icon="eva:more-vertical-fill" />

          </IconButton>

        </TableCell>

      </TableRow>

 

      <AssetQuickEditForm currentAsset={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

 

      <CustomPopover

        open={popover.open}

        onClose={popover.onClose}

        arrow="right-top"

        sx={{ width: 140 }}

      >

        <MenuItem

          onClick={() => {

            confirm.onTrue();

            popover.onClose();

          }}

          sx={{ color: 'error.main' }}

        >

          <Iconify icon="solar:trash-bin-trash-bold" />

          Delete

        </MenuItem>

 

        <MenuItem

          onClick={() => {

            onEditRow();

            popover.onClose();

          }}

        >

          <Iconify icon="solar:pen-bold" />

          Edit

        </MenuItem>

      </CustomPopover>

 

      <ConfirmDialog

        open={confirm.value}

        onClose={confirm.onFalse}

        title="Delete"

        content="Are you sure want to delete?"

        action={

          <Button variant="contained" color="error" onClick={onDeleteRow}>

            Delete

          </Button>

        }

      />

    </>

  );

}

 