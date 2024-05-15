// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import UsersTable from 'src/views/users/user/UsersTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Users = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <UsersTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Users
