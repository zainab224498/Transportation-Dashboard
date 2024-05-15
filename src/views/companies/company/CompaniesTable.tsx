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

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteCompany } from 'src/store/apps/company'

// ** Type Imports
import { RootState, AppDispatch } from 'src/store'
import { CompanyType } from 'src/types/apps/company'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

interface CellType {
  row: CompanyType
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
    flex: 0.25,
    minWidth: 90,
    field: 'name',
    headerName: 'NAME',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.name}
      </Typography>
    )
  },
  {
    flex: 0.2,
    field: 'image',
    minWidth: 90,
    headerName: 'IMAGE',
 
    renderCell: ({ row }: CellType) => (
      <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 44, height: 44, marginLeft: 'auto', marginRight: 'auto' }} />
    )
  },
  {
    flex: 0.3,
    minWidth: 200,
    field: 'company address',
    headerName: 'Company Address',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/companiesAddresses/companyAddress/${row.id}`)}
        >
          Get Company Address
        </Button>
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 220,
    field: 'company phone',
    headerName: 'Company Phone',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/companiesPhones/companyPhone/${row.id}`)}
        >
          Get Company Phone
        </Button>
      )
    }
  }
]

const CompaniesTable = () => {
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
      name: 'Static Company 1',
      avatar: 'path/to/avatar1.png',
      'company address': 'Static Address 1',
      'company phone': 'Static Phone 1'
    },
    {
      id: 2,
      name: 'Static Company 2',
      avatar: 'path/to/avatar2.png',
      'company address': 'Static Address 2',
      'company phone': 'Static Phone 2'
    },
    // Add four more static rows here
    {
      id: 3,
      name: 'Static Company 3',
      avatar: 'path/to/avatar3.png',
      'company address': 'Static Address 3',
      'company phone': 'Static Phone 3'
    },
    {
      id: 4,
      name: 'Static Company 4',
      avatar: 'path/to/avatar4.png',
      'companyaddress': 'Static Address 4',
      'company phone': 'Static Phone 4'
    },
    {
      id: 5,
      name: 'Static Company 5',
      avatar: 'path/to/avatar5.png',
      'company address': 'Static Address 5',
      'company phone': 'Static Phone 5'
    },
    {
      id: 6,
      name: 'Static Company 6',
      avatar: 'path/to/avatar6.png',
      'company address': 'Static Address 6',
      'company phone': 'Static Phone 6'
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> COMPANIES</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button component={Link} variant='contained' href='/companies/add' startIcon={<Icon icon='tabler:plus' />}>
            ADD COMPANY
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

export default CompaniesTable
