// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import CountriesTable from 'src/views/countries/country/CountriesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Countries = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <CountriesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Countries
