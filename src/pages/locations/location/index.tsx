// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import LocationsTable from 'src/views/locations/location/LocationsTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Locations = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <LocationsTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Locations
