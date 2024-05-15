// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import PassengersTable from 'src/views/passengers/passenger/PassengersTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Passengers = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <PassengersTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Passengers
