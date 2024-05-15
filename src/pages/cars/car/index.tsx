// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import CarsTable from 'src/views/cars/car/CarsTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Cars = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <CarsTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Cars
