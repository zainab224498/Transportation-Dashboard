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
import { fetchData, deleteProvince } from 'src/store/apps/address/province'

// ** Type Imports
import { RootState, AppDispatch } from 'src/store'
import { ProvincesType } from 'src/types/apps/address'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface CellType {
  row: ProvincesType
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
    field: 'region_name',
    minWidth: 180,
    headerName: 'Name',
 
    renderCell: ({ row }: CellType) => (
      <Typography
        sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}
        onClick={() => (window.location.href = `/countries/show`)}
      >
        {row.region.name}
      </Typography>
    )
  },
  {
    flex: 0.2,
    field: 'country_name',
    minWidth: 180,
    headerName: 'Country ',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary'  }}>
        {row.country.region.name}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'Calling Code',
    minWidth: 180,
    headerName: 'Calling Code',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: '#7367F0'  }}>
        {row.country.region.calling_code}
      </Typography>
    )
  }
  /*
  {
    flex: 0.3,
    field: 'name',
    minWidth: 180,
    headerName: 'Name',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.name || 'syria'}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'country_id',
    minWidth: 180,
    headerName: 'Country Id',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ textTransform: 'capitalize', color: 'text.secondary'  }}>
        {row.country_id || 5457}
      </Typography>
    )
  },
  {
    flex: 0.3,
    field: 'Calling Code',
    minWidth: 180,
    headerName: 'Calling Code',
 
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: '#7367F0'  }}>+{row.calling_code || 56}</Typography>
    )
  },
  {
    flex: 0.3,
    minWidth: 140,
    field: 'country',
    headerName: 'Country',
 
    renderCell: ({ row }: CellType) => {
      return (
        <Button
          sx={{ marginLeft: 'auto', marginRight: 'auto' }}
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => (window.location.href = `/countries/country/${row.id}`)}
        >
          Get Country
        </Button>
      )
    }
  }
  */
]

const ProvincesTable = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(6)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.province)

  console.log(store.data)

  const staticRows = [
    {
      id: 1,
      region_name: 'Region 1',
      country_name: 'Country 1',
      calling_code: '+1'
    },
    {
      id: 2,
      region_name: 'Region 2',
      country_name: 'Country 2',
      calling_code: '+44'
    },
    {
      id: 3,
      region_name: 'Region 3',
      country_name: 'Country 3',
      calling_code: '+33'
    },
    {
      id: 4,
      region_name: 'Region 4',
      country_name: 'Country 4',
      calling_code: '+49'
    },
    {
      id: 5,
      region_name: 'Region 5',
      country_name: 'Country 5',
      calling_code: '+39'
    },
    {
      id: 6,
      region_name: 'Region 6',
      country_name: 'Country 6',
      calling_code: '+81'
    }
  ];

  const rows = [...staticRows, ...store.data];

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const columns = [
    ...defaultColumns,
    {
      flex: 0.2,
      minWidth: 180,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
   
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
          <Tooltip title='Edit Province'>
            <IconButton size='small' onClick={() => (window.location.href = `/apps/invoice/edit/${row.id}`)}>
              <Icon icon='tabler:pencil' fontSize={20} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Delete Province'>
            <IconButton size='small' onClick={() => dispatch(deleteProvince(row.id))}>
              <Icon icon='tabler:trash' fontSize={20} />
            </IconButton>
          </Tooltip>

          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'View',
                href: `/provinces/preview/${row.id}`,
                icon: <Icon icon='tabler:eye' fontSize={20} />
              },
              {
                text: 'Download',
                icon: <Icon icon='tabler:download' fontSize={20} />
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
        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> PROVINCES</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button component={Link} variant='contained' href='/provinces/add' startIcon={<Icon icon='tabler:plus' />}>
            ADD PROVINCE
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

export default ProvincesTable
