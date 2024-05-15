// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Props {
  id: string | undefined
  toggleAddPaymentDrawer: () => void
  toggleSendInvoiceDrawer: () => void
}

const PreviewActions = ({ id, toggleSendInvoiceDrawer, toggleAddPaymentDrawer }: Props) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item lg={3} sm={6} xs={12}>
            <Button fullWidth sx={{ mb: 2 }} color='secondary' variant='outlined'>
              Download
            </Button>
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <Button
              fullWidth
              sx={{ mb: 2 }}
              target='_blank'
              component={Link}
              color='secondary'
              variant='outlined'
              href={`/apps/invoice/print/${id}`}
            >
              Print
            </Button>
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <Button
              fullWidth
              sx={{ mb: 2 }}
              component={Link}
              color='secondary'
              variant='outlined'
              href={`/apps/invoice/edit/${id}`}
            >
              Edit
            </Button>
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <Button fullWidth variant='contained' onClick={toggleSendInvoiceDrawer} sx={{ mb: 2, '& svg': { mr: 2 } }}>
              <Icon fontSize='1.125rem' icon='tabler:send' />
              Send
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PreviewActions
