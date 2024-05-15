// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import CompaniesAddressesTable from 'src/views/companiesAddresses/companyAddress/CompaniesAddressesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const CompaniesAddresses = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <CompaniesAddressesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default CompaniesAddresses
