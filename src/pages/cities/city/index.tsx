// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import CitiesTable from 'src/views/cities/city/CitiesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Cities = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <CitiesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Cities
