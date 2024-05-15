// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import OrdersStatusHistoryTable from 'src/views/ordersStatusHistory/orderStatusHistory/OrdersStatusHistoryTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const OrdersStatusHistory = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <OrdersStatusHistoryTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default OrdersStatusHistory
