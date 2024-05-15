// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import JobsAttributesTable from 'src/views/jobsAttributes/jobAttribute/JobsAttributesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const JobsAttributes = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <JobsAttributesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default JobsAttributes
