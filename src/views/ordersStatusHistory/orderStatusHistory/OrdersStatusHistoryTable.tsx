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
import { OrdersStatusHistoryType } from 'src/types/apps/order'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: OrdersStatusHistoryType
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
  active4: 'info',
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
    field: 'order_id',
    minWidth: 100,
    headerName: 'Order Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.order_id || 87538}
      </Typography>
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
    field: 'changed_by_user_id',
    minWidth: 180,
    headerName: 'Changed By User Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.changed_by_user_id || 464}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 120,
    field: 'user',
    headerName: 'User ',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/users/user/${row.id}`)}

          //**  onClick={() => (window.location.href = `/users/user/${row.user_id}`)}
        >
          Get User
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 150,
    field: 'old_status',
    headerName: 'Old Status',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.old_status || 'pinding'}
          color={userStatusObj[row.status || 'active3']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 150,
    field: 'new_status',
    headerName: 'New Status',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.new_status || 'rejected'}
          color={userStatusObj[row.status || 'active2']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  }/*,
  {
    flex: 0.3,
    field: 'created_at',
    minWidth: 150,
    headerName: 'Created',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.created_at || '12 Nov 2023'}
      </Typography>
    )
  } */
]

const OrdersStatusHistoryTable = () => {
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
      order_id: 12345,
      changed_by_user_id: 101,
      user: {
        id: 101,
        name: 'John Doe'
      },
      old_status: 'active',
      new_status: 'inactive'
    },
    {
      id: 2,
      order_id: 67890,
      changed_by_user_id: 102,
      user: {
        id: 102,
        name: 'Jane Smith'
      },
      old_status: 'active',
      new_status: 'active1'
    },
    {
      id: 3,
      order_id: 24680,
      changed_by_user_id: 103,
      user: {
        id: 103,
        name: 'Michael Johnson'
      },
      old_status: 'active',
      new_status: 'active2'
    },
    {
      id: 4,
      order_id: 13579,
      changed_by_user_id: 104,
      user: {
        id: 104,
        name: 'Emily Davis'
      },
      old_status: 'inactive',
      new_status: 'active3'
    },
    {
      id: 5,
      order_id: 97531,
      changed_by_user_id: 105,
      user: {
        id: 105,
        name: 'David Wilson'
      },
      old_status: 'active',
      new_status: 'active4'
    },
    {
      id: 6,
      order_id: 86420,
      changed_by_user_id: 106,
      user: {
        id: 106,
        name: 'Sarah Anderson'
      },
      old_status: 'active',
      new_status: 'inactive'
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> ORDERS STATUS HISTORY</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            component={Link}
            variant='contained'
            href='/ordersStatusHistory/add'
            startIcon={<Icon icon='tabler:plus' />}
          >
            ADD ORDER STATUS HISTORY
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

export default OrdersStatusHistoryTable
