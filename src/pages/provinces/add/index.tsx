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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addProvince } from 'src/store/apps/address/province'

// ** Types Imports
import { AppDispatch } from 'src/store'

interface Data {
  name: string
  calling_code: string
  country_id: number
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
  calling_code: yup
    .string()
    .matches(/^\+.*(?=.*[0-9])/, 'Calling Code field is required and must start with + and contains numbers only ')
    .min(1, 'Calling Code field is required')
    .required(),
  country_id: yup.number().typeError('Country Id field is required').min(1).required()
})

const defaultValues = {
  name: '',
  calling_code: '',
  country_id: ''
}

const AddCountryForm = () => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: Data) => {
    dispatch(addProvince({ ...data }))
    console.log('done')
    reset()
  }

  const handleClose = () => {
    reset()
  }

  return (
    <Card>
      <Header>
        <Typography variant='h6'>Add Province</Typography>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Name'
                  onChange={onChange}
                  placeholder='Geneva'
                  error={Boolean(errors.name)}
                />
              )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='calling_code'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Calling Code'
                  onChange={onChange}
                  placeholder='+56'
                  error={Boolean(errors.calling_code)}
                />
              )}
            />
            {errors.calling_code && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.calling_code.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='country_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Country Id'
                  onChange={onChange}
                  placeholder='2'
                  error={Boolean(errors.country_id)}
                />
              )}
            />
            {errors.country_id && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.country_id.message}</FormHelperText>
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
}

export default AddCountryForm
