// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import UsersPhonesTable from 'src/views/usersPhones/userPhone/UsersPhonesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const UsersPhones = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <UsersPhonesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default UsersPhones
