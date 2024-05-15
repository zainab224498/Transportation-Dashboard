// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import TransactionsTable from 'src/views/transactions/transaction/TransactionsTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Transactions = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <TransactionsTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Transactions
