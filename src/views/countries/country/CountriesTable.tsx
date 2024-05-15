// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteCountry } from 'src/store/apps/address/country'

// ** Type Imports
import { RootState, AppDispatch } from 'src/store'
import { CountriesType } from 'src/types/apps/address'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: CountriesType
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
    flex: 0.3,
    field: 'region_name',
    minWidth: 180,
    headerName: 'Name',
 
    renderCell: ({ row }: CellType) => (
      <Typography
        sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}
        onClick={() => (window.location.href = `/countries/show`)}
      >
        {row.region.name}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'nationality',
    minWidth: 180,
    headerName: 'Nationality',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.nationality}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'Calling Code',
    minWidth: 180,
    headerName: 'Calling Code',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: '#7367F0'  }}>{row.region.calling_code}</Typography>
    )
  }
  /*
  {
    flex: 0.3,
    minWidth: 150,
    field: 'province',
    headerName: 'Province',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/provinces/province/${row.id}`)}
        >
          Get Province
        </Button>
      )
    }
  }
  */
]

const CountriesTable = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(6)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.country)

  const staticRows = [
    {
      id: 1,
      region_name: 'Region 1',
      nationality: 'Nationality 1',
      'Calling Code': 'Code 1'
    },
    {
      id: 2,
      region_name: 'Region 2',
      nationality: 'Nationality 2',
      'Calling Code': 'Code 2'
    },
    {
      id: 3,
      region_name: 'Region 3',
      nationality: 'Nationality 3',
      'Calling Code': 'Code 3'
    },
    {
      id: 4,
      region_name: 'Region 4',
      nationality: 'Nationality 4',
      'Calling Code': 'Code 4'
    },
    {
      id: 5,
      region_name: 'Region 5',
      nationality: 'Nationality 5',
      'Calling Code': 'Code 5'
    },
    {
      id: 6,
      region_name: 'Region 6',
      nationality: 'Nationality 6',
      'Calling Code': 'Code 6'
    }
  ];

  const rows = [...staticRows, ...store.data];

  console.log(store.data)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

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
          <Tooltip title='Edit Country'>
            <IconButton size='small' onClick={() => (window.location.href = `/apps/invoice/edit/${row.id}`)}>
              <Icon icon='tabler:pencil' fontSize={20} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Delete Country'>
            <IconButton size='small' onClick={() => dispatch(deleteCountry(row.id))}>
              <Icon icon='tabler:trash' fontSize={20} />
            </IconButton>
          </Tooltip>

          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'View',
                href: `/countries/preview/${row.id}`,
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

  return (
    <Card>
      <Box
        sx={{
          py: 4,
          px: 6,
          rowGap: 2,
          columnGap: 4,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> COUNTRIES</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button component={Link} variant='contained' href='/countries/add' startIcon={<Icon icon='tabler:plus' />}>
            ADD COUNTRY
          </Button>
        </Box>
      </Box>
      <DataGrid
        autoHeight
        rowHeight={54}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[6, 10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      />
    </Card>
  )
}

export default CountriesTable
