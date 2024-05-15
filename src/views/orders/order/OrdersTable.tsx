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
import { OrdersType } from 'src/types/apps/order'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: OrdersType
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
      <Typography sx={{ color: 'text.secondary'  }}>{row.user_id || 74}</Typography>
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
    field: 'passenger_info',
    minWidth: 150,
    headerName: 'Passenger Info',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.passenger_info || 'married'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'trip_id',
    minWidth: 130,
    headerName: 'Trip Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.trip_id || 23}</Typography>
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
    field: 'seats_count',
    minWidth: 130,
    headerName: 'Seats Count',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.seats_count || 44}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'guid',
    minWidth: 130,
    headerName: 'Guid',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.guid || 'lamar'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    field: 'adjacent_seats',
    minWidth: 150,
    headerName: 'Adjacent Seats',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.adjacent_seats || 15}
      </Typography>
    )
  },
  {
    flex: 0.2,
    field: 'bags_count',
    minWidth: 130,
    headerName: 'Bags Count',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.bags_count || 4}</Typography>
    )
  },
  {
    flex: 0.3,
    field: 'children_count',
    minWidth: 150,
    headerName: 'Children Count',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.children_count || 3}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'transaction_id',
    minWidth: 160,
    headerName: 'Transaction Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.transaction_id || 4}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 180,
    field: 'transaction',
    headerName: 'Transaction',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/transactions/transaction/${row.id}`)}
          //**onClick={() => (window.location.href = `/transactions/transaction/${row.transaction_id}`)} */
        >
          Get Transaction
        </Button>
      )
    }
  },
  /*    {
    flex: 0.3,
    field: 'created_at',
    minWidth: 140,
    headerName: 'Created',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.created_at || '12 Sep 2023'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'updated_at',
    minWidth: 140,
    headerName: 'Updated',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.updated_at || '01 Sep 2023'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'deleted_at',
    minWidth: 140,
    headerName: 'Deleted',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.deleted_at || '05 Dec 2023'}
      </Typography>
    )
  }, */
  {
    flex: 0.2,
    field: 'payment_type',
    minWidth: 130,
    headerName: 'Payment Type',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.payment_type || 'cash'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'order_status_history_id',
    minWidth: 220,
    headerName: 'Order Status History Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.order_status_history_id || 76}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 250,
    field: 'order status history',
    headerName: 'Order Status History',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/ordersStatusHistory/orderStatusHistory/${row.id}`)}
          //**onClick={() => (window.location.href = `/ordersStatusHistory/orderStatusHistory/${row.order_status_history_id}`)} */
        >
          Get Order Status History
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 130,
    field: 'status',
    headerName: 'Status',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.status || 'approved'}
          color={userStatusObj[row.statuss || 'active']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  }
]

const OrdersTable = () => {
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
      user: {
        id: 101,
        name: 'John Doe'
      },
      passenger_info: 'single',
      trip_id: 1,
      trip: {
        id: 1,
        destination: 'New York'
      },
      seats_count: 2,
      guid: 'abc123',
      adjacent_seats: 10,
      bags_count: 2,
      children_count: 1,
      transaction_id: 5,
      transaction: {
        id: 5,
        amount: 50
      },
      payment_type: 'credit',
      order_status_history_id: 30,
      order_status_history: {
        id: 30,
        status: 'completed'
      }
    },
    {
      id: 2,
      user_id: 102,
      user: {
        id: 102,
        name: 'Jane Smith'
      },
      passenger_info: 'married',
      trip_id: 2,
      trip: {
        id: 2,
        destination: 'Los Angeles'
      },
      seats_count: 4,
      guid: 'def456',
      adjacent_seats: 12,
      bags_count: 3,
      children_count: 2,
      transaction_id: 6,
      transaction: {
        id: 6,
        amount: 75
      },
      payment_type: 'cash',
      order_status_history_id: 31,
      order_status_history: {
        id: 31,
        status: 'pending'
      }
    },
    // Add more rows as needed...
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> ORDERS</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button component={Link} variant='contained' href='/orders/add' startIcon={<Icon icon='tabler:plus' />}>
            ADD ORDER
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

export default OrdersTable
