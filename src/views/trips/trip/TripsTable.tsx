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
import { TripsType } from 'src/types/apps/trip'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: TripsType
}

interface UserStatusType {
  [key: string]: ThemeColor
}

// ** renders client column
const userStatusObj: UserStatusType = {
  active: 'success',
  active1: 'primary',
  active2: 'error',
  active3: 'warning',
  inactive: 'secondary'
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
    field: 'company_id',
    minWidth: 120,
    headerName: 'Company Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.company_id || 12}</Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 150,
    field: 'company',
    headerName: 'Company',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/companies/company/${row.id}`)}

          //**onClick={() => (window.location.href = `/companies/company/${row.company_id}`)} */
        >
          Get Company
        </Button>
      )
    }
  },
  {
    flex: 0.2,
    field: 'car_id',
    minWidth: 90,
    headerName: 'Car Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.car_id || 45}</Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 150,
    field: 'car',
    headerName: 'Car',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/cars/car/${row.id}`)}

          //**onClick={() => (window.location.href = `/cars/car/${row.car_id}`)} */
        >
          Get Car
        </Button>
      )
    }
  },
  {
    flex: 0.2,
    field: 'driver_id',
    minWidth: 100,
    headerName: 'Driver Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.driver_id || 32}</Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 150,
    field: 'driver',
    headerName: 'Driver',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/users/user/${row.id}`)}

          //**onClick={() => (window.location.href = `/users/user/${row.user_id}`)} */
        >
          Get Driver
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 130,
    field: 'type',
    headerName: 'Type',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.type || 'Round Trip'}
          color={userStatusObj[row.status || 'active1']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.2,
    field: 'start_address_id',
    minWidth: 160,
    headerName: 'Start Address Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.start_address_id || 106}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 190,
    field: 'start address',
    headerName: 'Start Address',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/boardingPlaces/boardingPlace/${row.id}`)}

          //**onClick={() => (window.location.href = `/boardingPlaces/boardingPlace/${row.start_address_id}`)} */
        >
          Get Start Address
        </Button>
      )
    }
  },
  {
    flex: 0.2,
    field: 'end_address_id',
    minWidth: 160,
    headerName: 'End Address Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.end_address_id || 18}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 180,
    field: 'end address',
    headerName: 'End Address',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/disembarkationPlaces/disembarkationPlace/${row.id}`)}

          //**onClick={() => (window.location.href = `/disembarkationPlaces/disembarkationPlace/${row.end_address_id}`)} */
        >
          Get End Address
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    field: 'cost',
    minWidth: 130,
    headerName: 'Cost',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: '#00cfe8'  }}>${row.cost || 100}</Typography>
    )
  },
  {
    flex: 0.3,
    field: 'working_days',
    minWidth: 150,
    headerName: 'Working Days',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.working_days || '0 2 4'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'start_time',
    minWidth: 130,
    headerName: 'Start Time',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.start_time || '08:00'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'arrive_time',
    minWidth: 130,
    headerName: 'Arrive Time',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.arrive_time || '13:30'}
      </Typography>
    )
  },
  {
    flex: 0.5,
    minWidth: 180,
    field: 'has_breaks',
    headerName: 'Breaks',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.has_breaks || 'Not Valid'}
          color={userStatusObj[row.status || 'active2']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.3,
    field: 'date',
    minWidth: 130,
    headerName: 'Date',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.date || '30 Aug 2023'}
      </Typography>
    )
  },
  {
    flex: 0.5,
    minWidth: 200,
    field: 'is_special_for_students',
    headerName: 'Special For Students',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.is_special_for_students || 'Valid'}
          color={userStatusObj[row.status || 'active']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  }
]

const TripsTable = () => {
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
      company_id: 101,
      car_id: 201,
      driver_id: 301,
      start_address_id: 401,
      end_address_id: 501,
      cost: 500,
      working_days: '1 3 5',
      start_time: '09:00',
      arrive_time: '14:30',
      has_breaks: 'Valid',
      date: '15 May 2024',
      is_special_for_students: 'Valid'
    },
    {
      id: 2,
      company_id: 102,
      car_id: 202,
      driver_id: 302,
      start_address_id: 402,
      end_address_id: 502,
      cost: 600,
      working_days: '2 4 6',
      start_time: '08:30',
      arrive_time: '13:00',
      has_breaks: 'Not Valid',
      date: '16 May 2024',
      is_special_for_students: 'Not Valid'
    },
    {
      id: 3,
      company_id: 103,
      car_id: 203,
      driver_id: 303,
      start_address_id: 403,
      end_address_id: 503,
      cost: 700,
      working_days: '0 2 4',
      start_time: '07:45',
      arrive_time: '12:15',
      has_breaks: 'Valid',
      date: '17 May 2024',
      is_special_for_students: 'Valid'
    },
    {
      id: 4,
      company_id: 104,
      car_id: 204,
      driver_id: 304,
      start_address_id: 404,
      end_address_id: 504,
      cost: 550,
      working_days: '1 3 5',
      start_time: '09:30',
      arrive_time: '14:00',
      has_breaks: 'Not Valid',
      date: '18 May 2024',
      is_special_for_students: 'Valid'
    },
    {
      id: 5,
      company_id: 105,
      car_id: 205,
      driver_id: 305,
      start_address_id: 405,
      end_address_id: 505,
      cost: 450,
      working_days: '2 4 6',
      start_time: '08:15',
      arrive_time: '12:45',
      has_breaks: 'Valid',
      date: '19 May 2024',
      is_special_for_students: 'Not Valid'
    },
    {
      id: 6,
      company_id: 106,
      car_id: 206,
      driver_id: 306,
      start_address_id: 406,
      end_address_id: 506,
      cost: 650,
      working_days: '0 2 4',
      start_time: '07:30',
      arrive_time: '12:00',
      has_breaks: 'Not Valid',
      date: '20 May 2024',
      is_special_for_students: 'Not Valid'
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> TRIPS</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button component={Link} variant='contained' href='/trips/add' startIcon={<Icon icon='tabler:plus' />}>
            ADD TRIP
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

export default TripsTable
