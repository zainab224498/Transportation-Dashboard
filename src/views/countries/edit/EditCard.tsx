// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Next Import
import Link from 'next/link'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Custom Component Imports
import OptionsMenu from 'src/@core/components/option-menu'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Type Imports
import { RootState, AppDispatch } from 'src/store'

// ** Types
import { CountriesType } from 'src/types/apps/address'

// ** Actions Imports
import { editCountry } from 'src/store/apps/address/country'

interface Props {
  data: CountriesType
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  name: yup.string().required(),
  nationality: yup.string().required(),
  calling_code: yup
    .string()
    .matches(/^\+.*(?=.*[0-9])/, 'Calling Code field is required and must start with + and contains numbers only ')
    .min(1, 'Calling Code field is required')
    .required()
})

const EditCard = ({ data }: Props) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: Props) => {
    //** dispatch(editCountry({ id: data.id, data: { ...data } })) **//
    console.log('done')
    console.log(data)
    reset()
  }

  const handleClose = () => {
    reset()
  }

  if (data) {
    return (
      <Card>
        <Header>
          <Typography variant='h6'>Edit Country</Typography>
        </Header>
        <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='name'
                control={control}
                defaultValue={data.region.name}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Name'
                    onChange={onChange}
                    placeholder='Milan'
                    error={Boolean(errors.name)}
                  />
                )}
              />
              {errors.name && <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='nationality'
                control={control}
                defaultValue={data.nationality}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Nationality'
                    onChange={onChange}
                    placeholder='Swiss'
                    error={Boolean(errors.nationality)}
                  />
                )}
              />
              {errors.nationality && (
                <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='calling_code'
                control={control}
                defaultValue={data.region.calling_code}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Calling Code'
                    onChange={onChange}
                    placeholder='+41'
                    error={Boolean(errors.calling_code)}
                  />
                )}
              />
              {errors.calling_code && (
                <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
              )}
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mr: 3 }}>
                Submit
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    )
  } else {
    return null
  }
}

export default EditCard
