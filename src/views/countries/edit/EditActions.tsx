// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Props {
  id: string | undefined
  toggleAddPaymentDrawer: () => void
  toggleSendInvoiceDrawer: () => void
}

const OptionsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const EditActions = ({ id, toggleSendInvoiceDrawer, toggleAddPaymentDrawer }: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid>
        <Card>
          <CardContent>
            <Button fullWidth variant='contained' onClick={toggleSendInvoiceDrawer} sx={{ mb: 2, '& svg': { mr: 2 } }}>
              <Icon fontSize='1.125rem' icon='tabler:send' />
              Send Invoice
            </Button>
            <Box sx={{ mb: 2, gap: 4, display: 'flex', alignItems: 'center' }}>
              <Button
                fullWidth
                component={Link}
                color='secondary'
                variant='outlined'
                href={`/apps/invoice/preview/${id}`}
              >
                Preview
              </Button>
              <Button fullWidth color='secondary' variant='outlined'>
                Save
              </Button>
            </Box>
            <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={toggleAddPaymentDrawer}>
              <Icon fontSize='1.125rem' icon='tabler:currency-dollar' />
              Add Payment
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EditActions
