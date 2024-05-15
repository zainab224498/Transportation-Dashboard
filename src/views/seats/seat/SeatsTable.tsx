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
import { fetchData, deleteCompany } from 'src/store/apps/company'

// ** Type Imports
import { RootState, AppDispatch } from 'src/store'
import { SeatsType } from 'src/types/apps/trip'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: SeatsType
}

interface UserStatusType {
  [key: string]: ThemeColor
}

// ** renders client column
const userStatusObj: UserStatusType = {
  active1: 'primary',
  active2: 'error'
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
    field: 'passenger_id',
    minWidth: 140,
    headerName: 'Passenger Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.passenger_id || 14}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 160,
    field: 'passenger',
    headerName: 'Passenger',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/passengers/passenger/${row.id}`)}
          //** onClick={() => (window.location.href = `/passengers/passenger/${row.passenger_id}`)} */
        >
          Get Passenger
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    field: 'order_id',
    minWidth: 110,
    headerName: 'Order Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.order_id || 104}</Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 130,
    field: 'order',
    headerName: 'Order',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/orders/order/${row.id}`)}
          //** onClick={() => (window.location.href = `/orders/order/${row.order_id}`)} */
        >
          Get Order
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    field: 'seat_number',
    minWidth: 130,
    headerName: ' Seat Number',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.seat_number || 22}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'name',
    minWidth: 130,
    headerName: 'First Name',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.name || 'yazan'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'last_name',
    minWidth: 130,
    headerName: 'Last Name',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.last_name || 'alqadi'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 110,
    field: 'gender',
    headerName: 'Gender',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.gender || 'Male'}
          color={userStatusObj[row.status || 'active1']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.3,
    field: 'father_name',
    minWidth: 130,
    headerName: 'Father Name',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.father_name || 'iyad'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'mother_name',
    minWidth: 130,
    headerName: 'Mother Name',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.mother_name || 'rita'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'BoardingPlaces_id',
    minWidth: 200,
    headerName: 'Boarding Places Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.BoardingPlaces_id || 44}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 240,
    field: 'boarding places',
    headerName: 'Boarding Places',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/boardingPlaces/boardingPlace/${row.id}`)}
          //**onClick={() => (window.location.href = `/boardingPlaces/boardingPlace/${row.BoardingPlaces_id}`)} */
        >
          Get Boarding Places
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    field: 'DisembarkationPlaces_id',
    minWidth: 230,
    headerName: 'Disembarkation Places Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.DisembarkationPlaces_id || 14}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 260,
    field: 'disembarkation places',
    headerName: 'Disembarkation Places',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/disembarkationPlaces/disembarkationPlace/${row.id}`)}
          //**onClick={() => (window.location.href = `/disembarkationPlaces/disembarkationPlace/${row.DisembarkationPlaces_id}`)} */
        >
          Get Disembarkation Places
        </Button>
      )
    }
  }
]

const SeatsTable = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(6)
  const [statusValue, setStatusValue] = useState<string>('')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.company)

  const router = useRouter()
  const { id } = router.query // Retrieve the "id" parameter from the URL

   let filteredRow = store.data
  if (id) {
    filteredRow = store.data.filter(row => row.id === Number(id))
  }

  const staticRows = [
    {
      id: 1,
      passenger_id: 101,
      passenger: 'John Doe',
      order_id: 201,
      order: 'Order 1',
      seat_number: 22,
      name: 'John',
      last_name: 'Doe',
      gender: 'Male',
      father_name: 'Michael',
      mother_name: 'Emma',
      BoardingPlaces_id: 301,
      'boarding places': 'Boarding Place 1',
      DisembarkationPlaces_id: 401,
      'disembarkation places': 'Disembarkation Place 1'
    },
    {
      id: 2,
      passenger_id: 102,
      passenger: 'Jane Smith',
      order_id: 202,
      order: 'Order 2',
      seat_number: 23,
      name: 'Jane',
      last_name: 'Smith',
      gender: 'Female',
      father_name: 'Robert',
      mother_name: 'Olivia',
      BoardingPlaces_id: 302,
      'boarding places': 'Boarding Place 2',
      DisembarkationPlaces_id: 402,
      'disembarkation places': 'Disembarkation Place 2'
    },
    {
      id: 3,
      passenger_id: 103,
      passenger: 'Mark Johnson',
      order_id: 203,
      order: 'Order 3',
      seat_number: 24,
      name: 'Mark',
      last_name: 'Johnson',
      gender: 'Male',
      father_name: 'David',
      mother_name: 'Sophia',
      BoardingPlaces_id: 303,
      'boarding places': 'Boarding Place 3',
      DisembarkationPlaces_id: 403,
      'disembarkation places': 'Disembarkation Place 3'
    },
    {
      id: 4,
      passenger_id: 104,
      passenger: 'Emily Wilson',
      order_id: 204,
      order: 'Order 4',
      seat_number: 25,
      name: 'Emily',
      last_name: 'Wilson',
      gender: 'Female',
      father_name: 'Daniel',
      mother_name: 'Ava',
      BoardingPlaces_id: 304,
      'boarding places': 'Boarding Place 4',
      DisembarkationPlaces_id: 404,
      'disembarkation places': 'Disembarkation Place 4'
    },
    {
      id: 5,
      passenger_id: 105,
      passenger: 'Michael Brown',
      order_id: 205,
      order: 'Order 5',
      seat_number: 26,
      name: 'Michael',
      last_name: 'Brown',
      gender: 'Male',
      father_name: 'James',
      mother_name: 'Mia',
      BoardingPlaces_id: 305,
      'boarding places': 'Boarding Place 5',
      DisembarkationPlaces_id: 405,
      'disembarkation places': 'Disembarkation Place 5'
    },
    {
      id: 6,
      passenger_id: 106,
      passenger: 'Olivia Davis',
      order_id: 206,
      order: 'Order 6',
      seat_number: 27,
      name: 'Olivia',
      last_name: 'Davis',
      gender: 'Female',
      father_name: 'William',
      mother_name: 'Charlotte',
      BoardingPlaces_id: 306,
      'boarding places': 'Boarding Place 6',
      DisembarkationPlaces_id: 406,
      'disembarkation places': 'Disembarkation Place 6'
    }
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
   
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
          <Tooltip title='Delete Company'>
            <IconButton size='small' onClick={() => dispatch(deleteCompany(row.id))}>
              <Icon icon='tabler:trash' fontSize={20} />
            </IconButton>
          </Tooltip>
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> SEATS</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button component={Link} variant='contained' href='/seats/add' startIcon={<Icon icon='tabler:plus' />}>
            ADD SEAT
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

export default SeatsTable
