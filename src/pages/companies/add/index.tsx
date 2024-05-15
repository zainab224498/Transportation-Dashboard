// ** React Imports
import { useState, useRef } from 'react'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'

// ** Actions Imports
import { addCompany } from 'src/store/apps/company'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Types Imports
import { AppDispatch } from 'src/store'

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(8.5)
}))

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const FormWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  '& > :not(:last-child)': {
    marginRight: '16px'
  }
})

const AddCompanyForm = () => {
  // ** State
  const [avatar, setAvatar] = useState<File[]>([])

  // ** Hooks
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setAvatar(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  // ** State
  const fileInputRef = useRef(null)
  const dispatch = useDispatch<AppDispatch>()
  // ** const [avatar, setAvatar] = useState<File | null>(null) // Change the state type to File | null
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm()
  const formRef = useRef<HTMLFormElement>(null) // Create a ref for the form element

  const onSubmit = (data: { name: string }) => {
    const { name } = data

    if (avatar) {
      // Check if an avatar is selected
      dispatch(addCompany({ name, avatar: avatar[0] })) // Pass the first file in the FileList as avatar
      reset({ name: '' })
      setAvatar([])
      formRef.current?.reset()
    } else {
      // Handle the case where no avatar is selected
      console.error('Avatar is required')
    }
  }

  const handleClose = () => {
    formRef.current?.reset()
    setAvatar([])
    reset({ name: '' })
  }

  return (
    <Box sx={{ backgroundColor: 'white' }}>
      <Header>
        <Typography variant='h6'>Add Company</Typography>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    type='text'
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    label='Company Name'
                    placeholder='Amazon'
                    variant='outlined'
                  />
                )}
              />
              {errors.name && <span style={{ color: 'red' }}>Name is required</span>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='avatar'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Box
                    {...getRootProps({ className: 'dropzone' })}
                    sx={{
                      border: '2px dashed',
                      borderColor: 'primary.main',
                      borderRadius: '4px',
                      padding: '16px',
                      ...(avatar && avatar.length > 0 ? { width: '100%', height: 'auto' } : {})
                    }}
                  >
                    <input {...getInputProps()} />
                    {avatar && avatar.length > 0 ? (
                      <img
                        alt='Uploaded image'
                        src={URL.createObjectURL(avatar[0])}
                        style={{ maxWidth: '100%', height: 'auto', marginBottom: theme.spacing(8.5) }}
                      />
                    ) : (
                      <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
                        <Typography variant='h5' sx={{ mb: 2.5 }}>
                          Drop files here or click to upload.
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                          (This is just a demo drop zone. Selected files are not actually uploaded.)
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              />
              {errors.avatar && avatar.length == 0 && (
                <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                  Image is required
                </Typography>
              )}
            </FormControl>
          </FormWrapper>
          {/*
              <Controller
                name='avatar'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label htmlFor='fileInput'>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                          fileInputRef.current.click()
                        }}
                        sx={{ display: 'none' }}
                      >
                        Hidden Button
                      </Button>
                    </label>
                    <input
                      ref={fileInputRef}
                      id='fileInput'
                      type='file'
                      accept='image/*'
                      onChange={e => {
                        const fileList = e.target.files
                        if (fileList) {
                          setAvatar(fileList)
                          field.onChange(e)
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => {
                        fileInputRef.current.click()
                      }}
                      sx={{ marginTop: '10px', width: '100%' }}
                    >
                      Choose Company Image
                    </Button>
                    <Box sx={{ width: '100%', marginTop: '10px' }}>
                      {avatar && (
                        <img
                          src={URL.createObjectURL(avatar[0])}
                          alt='Selected Image'
                          style={{ width: '20%', height: 'auto', objectFit: 'cover' }}
                        />
                      )}
                    </Box>
                  </Box>
                )}
              />

              {errors.avatar && <span style={{ color: 'red' }}>Image is required</span>}
              */}
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
    </Box>
  )
}

export default AddCompanyForm
