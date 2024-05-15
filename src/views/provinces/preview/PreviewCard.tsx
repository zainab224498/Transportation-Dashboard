// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'

// ** Next Import
import Link from 'next/link'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Custom Component Imports
import OptionsMenu from 'src/@core/components/option-menu'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Type Imports
import { RootState, AppDispatch } from 'src/store'

// ** Types
import { ProvincesType } from 'src/types/apps/address'

interface Props {
  data: ProvincesType
}

const PreviewCard = ({ data }: Props) => {
  // ** Hooks
  const theme = useTheme()

  if (data) {
    return (
      <Card sx={{ backgroundColor: 'transparent !important' }}>
        <Card>
          <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
            <Grid
              container
              sx={{ mb: { sm: 0, xs: 4 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon color='#7367F0' width={39} height={28.375} fontSize='1.125rem' icon='tabler:map-pin-filled' />
                  <Typography
                    variant='h6'
                    sx={{
                      ml: 1,
                      fontWeight: 600,
                      lineHeight: '24px',
                      fontSize: '1.5rem !important'
                    }}
                  >
                    PROVINCE
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </CardContent>

          <Divider />

          <TableContainer>
            <Table>
              <TableHead sx={{ textAlignLast: 'center' }}>
                <TableRow>
                  <TableCell sx={{ width: '50%' }}>Item</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  textAlignLast: 'center',
                  '& .MuiTableCell-root': {
                    fontSize: '1rem',
                    py: `${theme.spacing(2.5)} !important`
                  }
                }}
              >
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell> {data.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell> {data.region.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> Country Name</TableCell>
                  <TableCell> {data.country.region.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> Calling Code</TableCell>
                  <TableCell> {data.country.region.calling_code}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Card>
    )
  } else {
    return null
  }
}

export default PreviewCard
