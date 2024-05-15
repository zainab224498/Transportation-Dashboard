// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// Import the Api instance from the new file
import api from 'src/store/api'

// ** Types
import { CountriesType } from 'src/types/apps/address'

// ** Demo Components Imports
import Edit from 'src/views/countries/edit/Edit'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CountryEdit = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Edit id={id} />
    </DatePickerWrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await api.get('/address/country?with=region:id,name,calling_code;provinces:id,region_id,country_id')
  const data: CountriesType[] = await res.data.data

  const paths = data.map((item: CountriesType) => ({
    params: { id: `${item.id}` }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      id: params?.id
    }
  }
}

export default CountryEdit
