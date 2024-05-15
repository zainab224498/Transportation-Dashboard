// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// Import the Api instance from the new file
import api from 'src/store/api'

// ** Types
import { ProvincesType } from 'src/types/apps/address'

// ** Demo Components Imports
import Preview from 'src/views/provinces/preview/Preview'

const ProvincesPreview = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Preview id={id} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await api.get('/address/province?with=region:id,name;country.region:id,name,calling_code')
  const data: ProvincesType[] = await res.data.data

  const paths = data.map((item: ProvincesType) => ({
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

export default ProvincesPreview
