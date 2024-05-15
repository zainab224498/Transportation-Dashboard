// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import AttributeValuesTable from 'src/views/attributeValues/attributeValue/AttributeValuesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const AttributeValues = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <AttributeValuesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default AttributeValues
