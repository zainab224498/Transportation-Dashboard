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
import { AttributesType } from 'src/types/apps/job'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: AttributesType
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
    field: 'category',
    minWidth: 120,
    headerName: 'Category',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.category || 'doctor'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'title',
    minWidth: 200,
    headerName: 'Title',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.title || ' skill variety'}
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
          label={row.type || 'model'}
          color={userStatusObj[row.status || 'active3']}
          sx={{   textTransform: 'capitalize' }}
        />
      )
    }
  }
]

const AttributesTable = () => {
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
      category: 'Category 1',
      title: 'Title 1',
      type: 'Type 1',
      status: 'active',
    },
    {
      id: 2,
      category: 'Category 2',
      title: 'Title 2',
      type: 'Type 2',
      status: 'active1',
    },
    {
      id: 3,
      category: 'Category 3',
      title: 'Title 3',
      type: 'Type 3',
      status: 'active2',
    },
    {
      id: 4,
      category: 'Category 4',
      title: 'Title 4',
      type: 'Type 4',
      status: 'active3',
    },
    {
      id: 5,
      category: 'Category 5',
      title: 'Title 5',
      type: 'Type 5',
      status: 'active4',
    },
    {
      id: 6,
      category: 'Category 6',
      title: 'Title 6',
      type: 'Type 6',
      status: 'inactive',
    },
    {
      id: 7,
      category: 'Category 7',
      title: 'Title 7',
      type: 'Type 7',
      status: 'active',
    },
    // Additional rows
    {
      id: 8,
      category: 'Category 8',
      title: 'Title 8',
      type: 'Type 8',
      status: 'active1',
    },
    {
      id: 9,
      category: 'Category 9',
      title: 'Title 9',
      type: 'Type 9',
      status: 'active2',
    },
    {
      id: 10,
      category: 'Category 10',
      title: 'Title 10',
      type: 'Type 10',
      status: 'active3',
    },
    {
      id: 11,
      category: 'Category 11',
      title: 'Title 11',
      type: 'Type 11',
      status: 'active4',
    },
    {
      id: 12,
      category: 'Category 12',
      title: 'Title 12',
      type: 'Type 12',
      status: 'inactive',
    },
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='View'>
            <IconButton size='small' component={Link} href={`/apps/invoice/preview/${row.id}`}>
              <Icon icon='tabler:eye' fontSize={20} />
            </IconButton>
          </Tooltip>
          <OptionsMenu
            iconProps={{ fontSize: 20 }}
            iconButtonProps={{ size: 'small' }}
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            options={[
              {
                text: 'Download',
                icon: <Icon icon='tabler:download' fontSize={20} />
              },
              {
                text: 'Edit',
                href: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon='tabler:pencil' fontSize={20} />
              },
              {
                text: 'Duplicate',
                icon: <Icon icon='tabler:copy' fontSize={20} />
              }
            ]}
          />
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> ATTRIBUTES</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button component={Link} variant='contained' href='/attributes/add' startIcon={<Icon icon='tabler:plus' />}>
            ADD ATTRIBUTE
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

export default AttributesTable
