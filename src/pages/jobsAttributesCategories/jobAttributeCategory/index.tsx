// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import JobsAttributesCategoriesTable from 'src/views/jobsAttributesCategories/jobAttributeCategory/JobsAttributesCategoriesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const JobsAttributesCategories = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <JobsAttributesCategoriesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default JobsAttributesCategories
