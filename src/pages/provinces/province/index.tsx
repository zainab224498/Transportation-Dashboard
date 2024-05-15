// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import ProvincesTable from 'src/views/provinces/province/ProvincesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Countries = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <ProvincesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Countries
