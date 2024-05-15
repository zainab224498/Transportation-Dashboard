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
import { UsersPhonesType } from 'src/types/apps/user'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: UsersPhonesType
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
    field: 'user_id',
    minWidth: 100,
    headerName: 'User Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.user_id || 8}</Typography>
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
    field: 'phone_id',
    minWidth: 100,
    headerName: 'Phone Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.phone_id || 464}</Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 140,
    field: 'phone',
    headerName: 'Phone',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/phones/phone/${row.id}`)}
        >
          Get Phone
        </Button>
      )
    }
  }
]

const UsersPhonesTable = () => {
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

    //** filteredRow = store.data.filter(row => row.user_id  === Number(id)) */
  }

  const staticRows = [
    {
      id: 1,
      user_id: 1001,
      user: "John Doe",
      phone_id: 2001,
      phone: "+1 1234567890"
    },
    {
      id: 2,
      user_id: 1002,
      user: "Jane Smith",
      phone_id: 2002,
      phone: "+1 9876543210"
    },
    {
      id: 3,
      user_id: 1003,
      user: "Michael Johnson",
      phone_id: 2003,
      phone: "+1 5555555555"
    },
    {
      id: 4,
      user_id: 1004,
      user: "Sarah Williams",
      phone_id: 2004,
      phone: "+1 9999999999"
    },
    {
      id: 5,
      user_id: 1005,
      user: "Robert Brown",
      phone_id: 2005,
      phone: "+1 1231231234"
    },
    {
      id: 6,
      user_id: 1006,
      user: "Emily Davis",
      phone_id: 2006,
      phone: "+1 9879879876"
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> USERS PHONES</Typography>
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

export default UsersPhonesTable
