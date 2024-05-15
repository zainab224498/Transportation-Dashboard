// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import TripsTable from 'src/views/trips/trip/TripsTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Trips = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <TripsTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Trips
