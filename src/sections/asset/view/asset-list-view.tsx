import isEqual from 'lodash/isEqual';

import { useState, useCallback, useEffect } from 'react';

// @mui

import { alpha } from '@mui/material/styles';

import Tab from '@mui/material/Tab';

import Tabs from '@mui/material/Tabs';

import Card from '@mui/material/Card';

import Table from '@mui/material/Table';

import Button from '@mui/material/Button';

import Tooltip from '@mui/material/Tooltip';

import Container from '@mui/material/Container';

import TableBody from '@mui/material/TableBody';

import IconButton from '@mui/material/IconButton';

import TableContainer from '@mui/material/TableContainer';

// routes

import { paths } from 'src/routes/paths';

import { useRouter } from 'src/routes/hook';

import { RouterLink } from 'src/routes/components';

// _mock

 

// api

import { deleteAsset, useGetAssets } from 'src/api/asset';

 

// hooks

import { useBoolean } from 'src/hooks/use-boolean';

// components

import Label from 'src/components/label';

import Iconify from 'src/components/iconify';

import Scrollbar from 'src/components/scrollbar';

import { ConfirmDialog } from 'src/components/custom-dialog';

import { useSettingsContext } from 'src/components/settings';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import {

  useTable,

  getComparator,

  emptyRows,

  TableNoData,

  TableEmptyRows,

  TableHeadCustom,

  TableSelectedAction,

  TablePaginationCustom,

} from 'src/components/table';

// types

import { IAssetItem, IAssetTableFilters, IAssetTableFilterValue } from 'src/types/asset';

//

import { _reasons } from 'src/_mock';

import {  _assetList, _STATUS_OPTIONS } from 'src/_mock/map/_asset';
import AssetTableRow from '../asset-table-row';
import AssetTableToolbar from '../asset-table-toolbar';
import AssetTableFiltersResult from '../asset-table-filter-results';
 

// ----------------------------------------------------------------------

 

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ..._STATUS_OPTIONS];

 

const TABLE_HEAD = [

  { id: 'category', label: 'Category' },

  { id: 'processor', label: 'Processor', width: 180 },

  { id: 'productCompany', label: 'ProductCompany', width: 220 },

  { id: 'ram', label: 'Ram', width: 180 },

  { id: 'workingStatus', label: 'Working Status', width: 100 },

  { id: '', width: 88 },

];

 

const defaultFilters: IAssetTableFilters = {

  category: '',

  status: 'all',

};

 

// ----------------------------------------------------------------------

 

export default function AssetListView() {

  const table = useTable();

 

  const settings = useSettingsContext();

 

  const router = useRouter();

 

  const confirm = useBoolean();

 

  const { assets, assetsLoading, assetsEmpty } = useGetAssets();

console.log("assets")

  const [tableData, setTableData] = useState<IAssetItem[]>([]);

 

  useEffect(() => {

    setTableData(assets);

  }, [assets]);

 

  const [filters, setFilters] = useState(defaultFilters);

 

  const dataFiltered = applyFilter({

    inputData: tableData,

    comparator: getComparator(table.order, table.orderBy),

    filters,

  });

 

  const dataInPage = dataFiltered.slice(

    table.page * table.rowsPerPage,

    table.page * table.rowsPerPage + table.rowsPerPage

  );

 

  const denseHeight = table.dense ? 52 : 72;

 

  const canReset = !isEqual(defaultFilters, filters);

 

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

 

  const handleFilters = useCallback(

    (category: string, value: IAssetTableFilterValue) => {

      table.onResetPage();

      setFilters((prevState) => ({

        ...prevState,

        [category]: value,

      }));

    },

    [table]

  );

 

  const handleDeleteRow = useCallback(

    async(id: string) => {

   await deleteAsset(id)

 

      const deleteRow = tableData.filter((row) => row.id !== id);

      setTableData(deleteRow);

 

      table.onUpdatePageDeleteRow(dataInPage.length);

    },

    [dataInPage.length, table, tableData]

  );

 

  const handleDeleteRows = useCallback(() => {

    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    setTableData(deleteRows);

 

    table.onUpdatePageDeleteRows({

      totalRows: tableData.length,

      totalRowsInPage: dataInPage.length,

      totalRowsFiltered: dataFiltered.length,

    });

  }, [dataFiltered.length, dataInPage.length, table, tableData]);

 

  const handleEditRow = useCallback(

    (id: string) => {

      router.push(paths.dashboard.asset.edit(id));

    },

    [router]

  );

 

  const handleFilterStatus = useCallback(

    (event: React.SyntheticEvent, newValue: string) => {

      handleFilters('status', newValue);

    },

    [handleFilters]

  );

 

  const handleResetFilters = useCallback(() => {

    setFilters(defaultFilters);

  }, []);

 

  return (

    <>

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>

        <CustomBreadcrumbs

          heading="List"

          links={[

            { name: 'Dashboard', href: paths.dashboard.root },

            { name: 'Asset', href: paths.dashboard.asset.root },

            { name: 'List' },

          ]}

          action={

            <Button

              sx={{background:'#005a97'}}

              component={RouterLink}

              href={paths.dashboard.asset.new}

              variant="contained"

              startIcon={<Iconify icon="mingcute:add-line" />}

            >

              New Asset

            </Button>

          }

          sx={{

            mb: { xs: 3, md: 5 },

            color:'#005a97'

          }}

        />

 

        <Card>

          <Tabs

            value={filters.status}

            onChange={handleFilterStatus}

            sx={{

              px: 2.5,

              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,

            }}

          >

            {STATUS_OPTIONS.map((tab) => (

              <Tab

                key={tab.value}

                iconPosition="end"

                value={tab.value}

                label={tab.label}

                icon={

                  <Label

                    variant={

                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'

                    }

                    color={

                      (tab.value === 'active' && 'success') ||

                      (tab.value === 'repair' && 'warning') ||

                      // (tab.value === 'rejected' && 'error') ||

                      'default'

                    }

                  >

                    {tab.value === 'all' && assets.length}

                    {tab.value === 'approved' &&

                      assets.filter((asset) => asset.status === 'approved').length}

 

                    {tab.value === 'pending' &&

                      assets.filter((asset) => asset.status === 'pending').length}


                  </Label>

                }

              />

            ))}

          </Tabs>

 

          <AssetTableToolbar

            filters={filters}

            onFilters={handleFilters}

            //

            reasonOptions={_reasons}

          />

 

          {canReset && (

            <AssetTableFiltersResult

              filters={filters}

              onFilters={handleFilters}

              //

              onResetFilters={handleResetFilters}

              //

              results={dataFiltered.length}

              sx={{ p: 2.5, pt: 0 }}

            />

          )}

 

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>

            <TableSelectedAction

              dense={table.dense}

              numSelected={table.selected.length}

              rowCount={tableData.length}

              onSelectAllRows={(checked) =>

                table.onSelectAllRows(

                  checked,

                  tableData.map((row) => row.id)

                )

              }

              action={

                <Tooltip title="Delete">

                  <IconButton color="primary" onClick={confirm.onTrue}>

                    <Iconify icon="solar:trash-bin-trash-bold" />

                  </IconButton>

                </Tooltip>

              }

            />

 

            <Scrollbar>

              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>

                <TableHeadCustom

                  order={table.order}

                  orderBy={table.orderBy}

                  headLabel={TABLE_HEAD}

                  rowCount={tableData.length}

                  numSelected={table.selected.length}

                  onSort={table.onSort}

                  onSelectAllRows={(checked) =>

                    table.onSelectAllRows(

                      checked,

                      tableData.map((row) => row.id)

                    )

                  }

                />

 

                <TableBody>

                  {dataFiltered

                    .slice(

                      table.page * table.rowsPerPage,

                      table.page * table.rowsPerPage + table.rowsPerPage

                    )

                    .map((row) => (

                      <AssetTableRow

                        key={row.id}

                        row={row}

                        selected={table.selected.includes(row.id)}

                        onSelectRow={() => table.onSelectRow(row.id)}

                        onDeleteRow={() => handleDeleteRow(row.id)}

                        onEditRow={() => handleEditRow(row.id)}

                      />

                    ))}

 

                  <TableEmptyRows

                    height={denseHeight}

                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}

                  />

 

                  <TableNoData notFound={notFound} />

                </TableBody>

              </Table>

            </Scrollbar>

          </TableContainer>

 

          <TablePaginationCustom

            count={dataFiltered.length}

            page={table.page}

            rowsPerPage={table.rowsPerPage}

            onPageChange={table.onChangePage}

            onRowsPerPageChange={table.onChangeRowsPerPage}

            //

            dense={table.dense}

            onChangeDense={table.onChangeDense}

          />

        </Card>

      </Container>

 

      <ConfirmDialog

        open={confirm.value}

        onClose={confirm.onFalse}

        title="Delete"

        content={

          <>

            Are you sure want to delete <strong> {table.selected.length} </strong> items?

          </>

        }

        action={

          <Button

            variant="contained"

            color="error"

            onClick={() => {

              handleDeleteRows();

              confirm.onFalse();

            }}

          >

            Delete

          </Button>

        }

      />

    </>

  );

}

 

// ----------------------------------------------------------------------

 

function applyFilter({

  inputData,

  comparator,

  filters,

}: {

  inputData: IAssetItem[];

  comparator: (a: any, b: any) => number;

  filters: IAssetTableFilters;

}) {

  const { category, status } = filters;

 

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

 

  stabilizedThis.sort((a, b) => {

    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];

  });

 

  inputData = stabilizedThis.map((el) => el[0]);

 

  if (category) {

    inputData = inputData.filter(

      (asset) => asset.category.toLowerCase().indexOf(category.toLowerCase()) !== -1

    );

  }

//

  if (status !== 'all') {

    inputData = inputData.filter((asset) => asset.status === status);

  }

 

 

 

  return inputData;

}

 

 