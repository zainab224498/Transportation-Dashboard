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
import { CompaniesAddressesType } from 'src/types/apps/company'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: CompaniesAddressesType
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
    field: 'company_id',
    minWidth: 100,
    headerName: 'Company Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.company_id || 383}
      </Typography>
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
    flex: 0.3,
    field: 'address_id',
    minWidth: 100,
    headerName: 'Address Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.address_id || 57478}
      </Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 150,
    field: 'address',
    headerName: 'Address',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/addresses/address/${row.id}`)}

          //**onClick={() => (window.location.href = `/addresses/address/${row.address_id}`)} */
        >
          Get Address
        </Button>
      )
    }
  }
]

const CompaniesAddressesTable = () => {
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

    //** filteredRow = store.data.filter(row => row.company_id  === Number(id)) */
  }

  const staticRows = [
    {
      id: 1,
      company_id: 383,
      company: 'Company 1',
      address_id: 57478,
      address: 'Address 1'
    },
    {
      id: 2,
      company_id: 384,
      company: 'Company 2',
      address_id: 57479,
      address: 'Address 2'
    },
    {
      id: 3,
      company_id: 385,
      company: 'Company 3',
      address_id: 57480,
      address: 'Address 3'
    },
    {
      id: 4,
      company_id: 386,
      company: 'Company 4',
      address_id: 57481,
      address: 'Address 4'
    },
    {
      id: 5,
      company_id: 387,
      company: 'Company 5',
      address_id: 57482,
      address: 'Address 5'
    },
    {
      id: 6,
      company_id: 388,
      company: 'Company 6',
      address_id: 57483,
      address: 'Address 6'
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> COMPANIES ADDRESSES</Typography>
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

export default CompaniesAddressesTable
