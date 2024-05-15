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
import { PassengersType } from 'src/types/apps/user'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: PassengersType
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
    flex: 0.3,
    field: 'user_id',
    minWidth: 120,
    headerName: 'User Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.user_id || 19}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 150,
    field: 'user',
    headerName: 'User',
 
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
          Get User
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    field: 'trip_id',
    minWidth: 120,
    headerName: 'Trip Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.trip_id || 34}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 150,
    field: 'trip',
    headerName: 'Trip',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/trips/trip/${row.id}`)}

          //**onClick={() => (window.location.href = `/trips/trip/${row.trip_id}`)} */
        >
          Get Trip
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    field: 'seat_id',
    minWidth: 120,
    headerName: 'Seat Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.seat_id || 3}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 150,
    field: 'seat',
    headerName: 'Seat',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/seats/seat/${row.id}`)}

          //**onClick={() => (window.location.href = `/seats/seat/${row.seat_id}`)} */
        >
          Get Seat
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    field: 'country_residence_id',
    minWidth: 200,
    headerName: 'Country Residence Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.country_residence_id || 44}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 230,
    field: 'country residence',
    headerName: 'Country Residence',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/countries/country/${row.id}`)}

          //**onClick={() => (window.location.href = `/countries/country/${row.country_residence_id}`)} */
        >
          Get Country Residence
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    field: 'job_id',
    minWidth: 100,
    headerName: 'Job Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.job_id || 17}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 150,
    field: 'job',
    headerName: 'Job',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/jobs/job/${row.id}`)}

          //**onClick={() => (window.location.href = `/jobs/job/${row.job_id}`)} */
        >
          Get Job
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 100,
    field: 'gender',
    headerName: 'Gender',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.gender || 'Female'}
          color={userStatusObj[row.status || 'active2']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.3,
    field: 'permanent_address_residence_id',
    minWidth: 280,
    headerName: 'Permanent Address Residence Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.permanent_address_residence_id || 74}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 320,
    field: 'permanent address residence',
    headerName: 'Permanent Address Residence',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/addresses/address/${row.id}`)}

          //**onClick={() => (window.location.href = `/addresses/address/${row.permanent_address_residence_id}`)} */
        >
          Get Permanent Address Residence
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    field: 'current_address_residence_id',
    minWidth: 270,
    headerName: 'Current Address Residence Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.current_address_residence_id || 54}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 300,
    field: 'current address residence',
    headerName: 'Current Address Residence',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/addresses/address/${row.id}`)}

          //**onClick={() => (window.location.href = `/addresses/address/${row.current_address_residence_id}`)} */
        >
          Get Current Address Residence
        </Button>
      )
    }
  }
]

const PassengersTable = () => {
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
      user_id: 101,
      trip_id: 201,
      seat_id: 301,
      country_residence_id: 401,
      job_id: 501,
      gender: 'Male',
      permanent_address_residence_id: 601,
      current_address_residence_id: 701
    },
    {
      id: 2,
      user_id: 102,
      trip_id: 202,
      seat_id: 302,
      country_residence_id: 402,
      job_id: 502,
      gender: 'Female',
      permanent_address_residence_id: 602,
      current_address_residence_id: 702
    },
    {
      id: 3,
      user_id: 103,
      trip_id: 203,
      seat_id: 303,
      country_residence_id: 403,
      job_id: 503,
      gender: 'Male',
      permanent_address_residence_id: 603,
      current_address_residence_id: 703
    },
    {
      id: 4,
      user_id: 104,
      trip_id: 204,
      seat_id: 304,
      country_residence_id: 404,
      job_id: 504,
      gender: 'Female',
      permanent_address_residence_id: 604,
      current_address_residence_id: 704
    },
    {
      id: 5,
      user_id: 105,
      trip_id: 205,
      seat_id: 305,
      country_residence_id: 405,
      job_id: 505,
      gender: 'Male',
      permanent_address_residence_id: 605,
      current_address_residence_id: 705
    },
    {
      id: 6,
      user_id: 106,
      trip_id: 206,
      seat_id: 306,
      country_residence_id: 406,
      job_id: 506,
      gender: 'Female',
      permanent_address_residence_id: 606,
      current_address_residence_id: 706
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> PASSENGERS</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button component={Link} variant='contained' href='/passengers/add' startIcon={<Icon icon='tabler:plus' />}>
            ADD PASSENGER
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

export default PassengersTable
