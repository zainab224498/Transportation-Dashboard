// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import JobsTable from 'src/views/jobs/job/JobsTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Jobs = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <JobsTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Jobs
