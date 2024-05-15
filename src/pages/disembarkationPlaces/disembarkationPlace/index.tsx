// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import DisembarkationPlacesTable from 'src/views/disembarkationPlaces/disembarkationPlace/DisembarkationPlacesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const DisembarkationPlaces = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <DisembarkationPlacesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default DisembarkationPlaces
