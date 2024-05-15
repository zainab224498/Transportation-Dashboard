// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import CompaniesTable from 'src/views/companies/company/CompaniesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Companies = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <CompaniesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Companies
