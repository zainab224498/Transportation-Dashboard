// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import AttributesTable from 'src/views/attributes/attribute/AttributesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Attributes = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <AttributesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Attributes
