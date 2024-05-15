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
import { UsersType } from 'src/types/apps/user'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: UsersType
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
    field: 'first_name',
    minWidth: 130,
    headerName: 'First Name',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.first_name || 'mira'}
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
        {row.last_name || 'alsayed'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'father_name',
    minWidth: 130,
    headerName: 'Father Name',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.father_name || 'fadi'}
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
        {row.mother_name || 'sila'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'birthday',
    minWidth: 130,
    headerName: 'Birthday',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.birthday || '12 Aug 1999'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'password',
    minWidth: 180,
    headerName: 'Password',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.password || '123456789'}
      </Typography>
    )
  },
  {
    flex: 0.8,
    field: 'email',
    minWidth: 280,
    headerName: 'Email',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.email || 'miraalsayed@gmail.com'}
      </Typography>
    )
  },
  {
    flex: 0.5,
    minWidth: 180,
    field: 'is_email_confirmed',
    headerName: 'Email Confirmation',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.is_email_confirmed || 'confirmed'}
          color={userStatusObj[row.status || 'active']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.5,
    minWidth: 200,
    field: 'is_phone_confirmed',
    headerName: 'Phone Confirmation',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.is_phone_confirmed || 'not confirmed'}
          color={userStatusObj[row.status || 'active2']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 180,
    field: 'user_phone',
    headerName: 'User Phone',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/usersPhones/userPhone/${row.id}`)}
        >
          Get User Phone
        </Button>
      )
    }
  }
]

const UsersTable = () => {
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
      first_name: "John",
      last_name: "Doe",
      father_name: "Michael",
      mother_name: "Jane",
      birthday: "01 Jan 1990",
      password: "********",
      email: "johndoe@example.com",
      is_email_confirmed: "confirmed",
      is_phone_confirmed: "confirmed",
      user_phone: "+1 1234567890",
      status: "active"
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      father_name: "David",
      mother_name: "Sarah",
      birthday: "15 Feb 1985",
      password: "********",
      email: "janesmith@example.com",
      is_email_confirmed: "confirmed",
      is_phone_confirmed: "not confirmed",
      user_phone: "+1 9876543210",
      status: "active1"
    },
    {
      id: 3,
      first_name: "Michael",
      last_name: "Johnson",
      father_name: "Robert",
      mother_name: "Lisa",
      birthday: "10 Mar 1992",
      password: "********",
      email: "michaeljohnson@example.com",
      is_email_confirmed: "confirmed",
      is_phone_confirmed: "not confirmed",
      user_phone: "+1 5555555555",
      status: "active2"
    },
    {
      id: 4,
      first_name: "Sarah",
      last_name: "Williams",
      father_name: "James",
      mother_name: "Emily",
      birthday: "22 Apr 1988",
      password: "********",
      email: "sarahwilliams@example.com",
      is_email_confirmed: "confirmed",
      is_phone_confirmed: "confirmed",
      user_phone: "+1 9999999999",
      status: "active3"
    },
    {
      id: 5,
      first_name: "Robert",
      last_name: "Brown",
      father_name: "John",
      mother_name: "Jessica",
      birthday: "05 May 1995",
      password: "********",
      email: "robertbrown@example.com",
      is_email_confirmed: "confirmed",
      is_phone_confirmed: "confirmed",
      user_phone: "+1 1231231234",
      status: "inactive"
    },
    {
      id: 6,
      first_name: "Emily",
      last_name: "Davis",
      father_name: "Richard",
      mother_name: "Olivia",
      birthday: "18 Jun 1997",
      password: "********",
      email: "emilydavis@example.com",
      is_email_confirmed: "confirmed",
      is_phone_confirmed: "confirmed",
      user_phone: "+1 9879879876",
      status: "inactive"
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> USERS</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button component={Link} variant='contained' href='/users/add' startIcon={<Icon icon='tabler:plus' />}>
            ADD USER
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

export default UsersTable
