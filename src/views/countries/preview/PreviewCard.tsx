// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'

// ** Next Import
import Link from 'next/link'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Custom Component Imports
import OptionsMenu from 'src/@core/components/option-menu'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { deleteProvince } from 'src/store/apps/address/province'

// ** Type Imports
import { RootState, AppDispatch } from 'src/store'

// ** Types
import { CountriesType, ProvincesType } from 'src/types/apps/address'

interface Props {
  data: CountriesType
}

interface CellType {
  row: ProvincesType
}

const defaultColumns = [
  {
    flex: 0.2,
    field: 'id',
    minWidth: 90,
    headerName: 'ID',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.id}</Typography>
    )
  },
  {
    flex: 0.2,
    field: 'region_name',
    minWidth: 90,
    headerName: ' Name',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.region.name}</Typography>
    )
  }
]

const PreviewCard = ({ data }: Props) => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(5)
  const [dataRows, setDataRows] = useState<ProvincesType[]>([])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const theme = useTheme()

  useEffect(() => {
    setDataRows([data.provinces]); // Wrap data.provinces in an array
  }, [data.provinces]);

  const columns = [
    ...defaultColumns,
    {
      flex: 0.2,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
   
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
          <Tooltip title='Edit Province'>
            <IconButton size='small' onClick={() => (window.location.href = `/apps/invoice/edit/${row.id}`)}>
              <Icon icon='tabler:pencil' fontSize={20} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Delete Province'>
            <IconButton size='small' onClick={() => dispatch(deleteProvince(row.id))}>
              <Icon icon='tabler:trash' fontSize={20} />
            </IconButton>
          </Tooltip>

          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'View',
                href: `/provinces/preview/${row.id}`,
                icon: <Icon icon='tabler:eye' fontSize={20} />
              },
              {
                text: 'Download',
                icon: <Icon icon='tabler:download' fontSize={20} />
              },
              {
                text: 'Duplicate',
                icon: <Icon icon='tabler:copy' fontSize={20} />
              }
            ]}
          />
        </Box>
      )
    }
  ]

  if (data) {
    return (
      <Card sx={{ backgroundColor: 'transparent !important' }}>
        <Card>
          <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
            <Grid
              container
              sx={{ mb: { sm: 0, xs: 4 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon color='#7367F0' width={39} height={28.375} fontSize='1.125rem' icon='tabler:map-pin-2' />
                  <Typography
                    variant='h6'
                    sx={{
                      ml: 1,
                      fontWeight: 600,
                      lineHeight: '24px',
                      fontSize: '1.5rem !important'
                    }}
                  >
                    COUNTRY
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </CardContent>

          <Divider />

          <TableContainer>
            <Table>
              <TableHead sx={{ textAlignLast: 'center' }}>
                <TableRow>
                  <TableCell sx={{ width: '50%' }}>Item</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  textAlignLast: 'center',
                  '& .MuiTableCell-root': {
                    fontSize: '1rem',
                    py: `${theme.spacing(2.5)} !important`
                  }
                }}
              >
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell> {data.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell> {data.region.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> Nationality</TableCell>
                  <TableCell> {data.nationality}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> Calling Code</TableCell>
                  <TableCell> {data.region.calling_code}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Card sx={{ mt: 8 }}>
          <Grid item xs={12}>
            <Box
              sx={{
                py: 4,
                px: 6,
                rowGap: 2,
                columnGap: 4,
                display: 'flex',

                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ fontWeight: 'bold', fontSize: 16.5 }}> PROVINCES</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                  component={Link}
                  variant='contained'
                  href='/provinces/add'
                  startIcon={<Icon icon='tabler:plus' />}
                  sx={{ fontSize: 13.5 }}
                >
                  ADD PROVINCE
                </Button>
              </Box>
            </Box>
            <DataGrid
              autoHeight
              rowHeight={54}
              rows={dataRows}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
          </Grid>
        </Card>
      </Card>
    )
  } else {
    return null
  }
}

export default PreviewCard
