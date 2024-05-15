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
import { CarsType } from 'src/types/apps/car'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: CarsType
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
    field: 'number',
    minWidth: 90,
    headerName: 'Number',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.number || 20133}</Typography>
    )
  },
  {
    flex: 0.1,
    field: 'num_seats',
    minWidth: 90,
    headerName: 'Seats',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.num_seats || 4}</Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 110,
    field: 'has_internet',
    headerName: 'Internet',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.has_internet || 'has internet'}
          color={userStatusObj[row.status || 'active']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'is_vip',
    headerName: 'Vip',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.is_vip || 'not vip'}
          color={userStatusObj[row.status || 'inactive']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.35,
    minWidth: 110,
    field: 'has_individual_seats',
    headerName: 'Individual Seats',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.has_individual_seats || 'has individual seats'}
          color={userStatusObj[row.status || 'active1']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 110,
    field: 'has_electricity',
    headerName: 'Electricity',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.has_electricity || 'no electricity'}
          color={userStatusObj[row.status || 'active3']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  }
]

const CarsTable = () => {
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
      number: 'CAR001',
      num_seats: 4,
      has_internet: 'Yes',
      is_vip: 'No',
      has_individual_seats: 'Yes',
      has_electricity: 'No'
    },
    {
      id: 2,
      number: 'CAR002',
      num_seats: 6,
      has_internet: 'No',
      is_vip: 'Yes',
      has_individual_seats: 'No',
      has_electricity: 'Yes'
    },
    {
      id: 3,
      number: 'CAR003',
      num_seats: 4,
      has_internet: 'Yes',
      is_vip: 'No',
      has_individual_seats: 'Yes',
      has_electricity: 'Yes'
    },
    {
      id: 4,
      number: 'CAR004',
      num_seats: 8,
      has_internet: 'Yes',
      is_vip: 'Yes',
      has_individual_seats: 'No',
      has_electricity: 'No'
    },
    {
      id: 5,
      number: 'CAR005',
      num_seats: 4,
      has_internet: 'No',
      is_vip: 'No',
      has_individual_seats: 'Yes',
      has_electricity: 'Yes'
    },
    {
      id: 6,
      number: 'CAR006',
      num_seats: 6,
      has_internet: 'Yes',
      is_vip: 'Yes',
      has_individual_seats: 'No',
      has_electricity: 'No'
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
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
   
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
          <Tooltip title='Edit Company'>
            <IconButton size='small' onClick={() => (window.location.href = `/cars/edit/${row.id}`)}>
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> CARS</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button component={Link} variant='contained' href='/cars/add' startIcon={<Icon icon='tabler:plus' />}>
            ADD CAR
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

export default CarsTable
