// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import OrdersTable from 'src/views/orders/order/OrdersTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Orders = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <OrdersTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Orders
