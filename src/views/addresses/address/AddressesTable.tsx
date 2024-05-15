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
import { fetchData } from 'src/store/apps/address/address'

// ** Type Imports
import { RootState, AppDispatch } from 'src/store'
import { AddressesType } from 'src/types/apps/address'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: AddressesType
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
    field: 'name',
    minWidth: 130,
    headerName: 'Name',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.name}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'region_name',
    minWidth: 130,
    headerName: 'Country Name',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.region.name}</Typography>
    )
  },

  /*
  {
    flex: 0.3,
    minWidth: 150,
    field: 'country',
    headerName: 'Country',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/countries/country/${row.id}`)}
          //** onClick={() => (window.location.href = `/countries/country/${row.country_id}`)}
        >
          Get Country
        </Button>
      )
    }
  }
  */
  {
    flex: 0.3,
    field: 'latitude',
    minWidth: 180,
    headerName: 'Latitude',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: '#1de9b6'  }}>{`${row.latitude}° S`}</Typography>
    )
  },
  {
    flex: 0.3,
    field: 'longitude',
    minWidth: 180,
    headerName: 'Longitude',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: '#b2ff59'  }}>{`${row.longitude}° E`}</Typography>
    )
  }
]

const AddressesTable = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(6)
  const [statusValue, setStatusValue] = useState<string>('')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.address)

  const router = useRouter()
  const { id } = router.query // Retrieve the "id" parameter from the URL

   let filteredRow = store.data
  if (id) {
    filteredRow = store.data.filter(row => row.id === Number(id))
  }

  const staticRows = [
    {
      id: 1,
      name: 'Location 1',
      region: { name: 'Country 1' },
      latitude: 40.7128,
      longitude: -74.0060,
    },
    {
      id: 2,
      name: 'Location 2',
      region: { name: 'Country 2' },
      latitude: 48.8566,
      longitude: 2.3522,
    },
    {
      id: 3,
      name: 'Location 3',
      region: { name: 'Country 3' },
      latitude: 51.5074,
      longitude: -0.1278,
    },
    {
      id: 4,
      name: 'Location 4',
      region: { name: 'Country 4' },
      latitude: 34.0522,
      longitude: -118.2437,
    },
    {
      id: 5,
      name: 'Location 5',
      region: { name: 'Country 5' },
      latitude: 35.6895,
      longitude: 139.6917,
    },
    {
      id: 6,
      name: 'Location 6',
      region: { name: 'Country 6' },
      latitude: -33.8651,
      longitude: 151.2099,
    },
  ];

  const rows = [...staticRows, ...filteredRow];
  

  useEffect(() => {
    dispatch(
      fetchData({
        q: value,
        status: statusValue
      })
    )
  }, [dispatch, statusValue, value])

  const columns = [
    ...defaultColumns,
    {
      flex: 0.2,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
   
      type: 'actions', // Add the 'type' property
      getActions: ({ row }: CellType) => [ // Add the 'getActions' property
        {
          icon: <Icon icon='tabler:pencil' fontSize={20} />,
          tooltip: 'Edit Company',
          onClick: () => (window.location.href = `/apps/invoice/edit/${row.id}`)
        }
      ],
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
          <Tooltip title='Edit Company'>
            <IconButton size='small' onClick={() => (window.location.href = `/apps/invoice/edit/${row.id}`)}>
              <Icon icon='tabler:pencil' fontSize={20} />
            </IconButton>
          </Tooltip>
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> ADDRESSES</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button component={Link} variant='contained' href='/addresses/add' startIcon={<Icon icon='tabler:plus' />}>
            ADD ADDRESS
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

export default AddressesTable
