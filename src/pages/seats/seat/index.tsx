// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import SeatsTable from 'src/views/seats/seat/SeatsTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Seats = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <SeatsTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Seats
