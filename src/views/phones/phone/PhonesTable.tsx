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
import { PhonesType } from 'src/types/apps/phone'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: PhonesType
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
    field: 'number',
    minWidth: 100,
    headerName: 'Number',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.number || 8894668926538}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 100,
    field: 'type',
    headerName: 'Type',
 
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.type || 'telphone'}
          color={userStatusObj[row.status || 'active1']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.3,
    field: 'calling_code_id',
    minWidth: 200,
    headerName: 'Calling Code Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.calling_code_id || 464}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 280,
    field: 'country calling code',
    headerName: 'Country Calling Code',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/countries/country/${row.id}`)}
          //**onClick={() => (window.location.href = `/countries/country/${row.calling_code_id}`)} */
        >
          Get Country Calling Code
        </Button>
      )
    }
  }
]

const PhonesTable = () => {
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
      number: '123456789',
      type: 'Mobile',
      calling_code_id: 1,
      country_calling_code: '+1',
      status: 'active'
    },
    {
      id: 2,
      number: '987654321',
      type: 'Home',
      calling_code_id: 44,
      country_calling_code: '+44',
      status: 'inactive'
    },
    {
      id: 3,
      number: '555555555',
      type: 'Work',
      calling_code_id: 33,
      country_calling_code: '+33',
      status: 'active'
    },
    {
      id: 4,
      number: '999999999',
      type: 'Mobile',
      calling_code_id: 49,
      country_calling_code: '+49',
      status: 'active'
    },
    {
      id: 5,
      number: '111111111',
      type: 'Home',
      calling_code_id: 39,
      country_calling_code: '+39',
      status: 'inactive'
    },
    {
      id: 6,
      number: '777777777',
      type: 'Work',
      calling_code_id: 81,
      country_calling_code: '+81',
      status: 'active'
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> PHONES</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button component={Link} variant='contained' href='/phones/add' startIcon={<Icon icon='tabler:plus' />}>
            ADD PHONE
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

export default PhonesTable
