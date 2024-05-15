// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import PhonesTable from 'src/views/phones/phone/PhonesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Phones = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <PhonesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Phones
