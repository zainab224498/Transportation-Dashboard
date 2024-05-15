// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteCompany } from 'src/store/apps/company'

// ** Type Imports
import { RootState, AppDispatch } from 'src/store'
import { CompaniesPhonesType } from 'src/types/apps/company'

interface CellType {
  row: CompaniesPhonesType
}

const defaultColumns = [
  {
    flex: 0.2,
    field: 'id',
    minWidth: 90,
    headerName: 'ID',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.id || 1}</Typography>
    )
  },
  {
    flex: 0.3,
    field: 'company_id',
    minWidth: 150,
    headerName: 'Company  Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.company_id || 536}
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
    field: 'phone_id',
    minWidth: 150,
    headerName: 'Phone  Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>{row.phone_id || 28}</Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 150,
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

          //**onClick={() => (window.location.href = `/phones/phone/${row.phone_id}`)} */
        >
          Get Phone
        </Button>
      )
    }
  }
]

const CompaniesPhonesTable = () => {
  // ** State
  const [value] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(6)
  const [statusValue] = useState<string>('')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.company)

  const router = useRouter()
  const { id } = router.query // Retrieve the "id" parameter from the URL

  let filteredRow = store.data
  if (id) {
    filteredRow = store.data.filter(row => row.id === Number(id))

    //**filteredRow = store.data.filter(row => row.company_id === Number(id)) */
  }

  const staticRows = [
    {
      id: 1,
      company_id: 383,
      company: 'Company 1',
      phone_id: 57478,
      phone: 'Phone 1'
    },
    {
      id: 2,
      company_id: 384,
      company: 'Company 2',
      phone_id: 57479,
      phone: 'Phone 2'
    },
    {
      id: 3,
      company_id: 385,
      company: 'Company 3',
      phone_id: 57480,
      phone: 'Phone 3'
    },
    {
      id: 4,
      company_id: 386,
      company: 'Company 4',
      phone_id: 57481,
      phone: 'Phone 4'
    },
    {
      id: 5,
      company_id: 387,
      company: 'Company 5',
      phone_id: 57482,
      phone: 'Phone 5'
    },
    {
      id: 6,
      company_id: 388,
      company: 'Company 6',
      phone_id: 57483,
      phone: 'Phone 6'
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> COMPANIES PHONES</Typography>
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

export default CompaniesPhonesTable
