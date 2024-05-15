// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import AddressesTable from 'src/views/addresses/address/AddressesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Addresses = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <AddressesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Addresses
