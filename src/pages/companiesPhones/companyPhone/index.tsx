// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import CompaniesPhonesTable from 'src/views/companiesPhones/companyPhone/CompaniesPhonesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const CompaniesPhones = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <CompaniesPhonesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default CompaniesPhones
