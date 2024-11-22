import { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'src/routes/hooks';
import { Alert } from '@mui/lab';
import { RouterLink } from '../../routes/components';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate } from 'react-router-dom'; // Add Yup for validation

// Define Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    email: '',
    password: '',
  }
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  const generateAuthToken = (length = 60) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);

    return Array.from(array)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  };

  const resources = {
    email: 'admin@example.com',
    name: 'admin',
  }
  const onSubmit = (data) => {
    const authToken = generateAuthToken(60);
    if(data.email === 'admin@example.com' && data.password === 'admin@123'){
      console.log(data.password)
      const updatedResources = {
        ...resources,
        authToken: authToken, // Append the authToken
      };
      console.log(updatedResources);
      localStorage.setItem('resources', JSON.stringify(updatedResources));
      router.replace('/dashboard');
    }else{
      console.log('ddddddddd')
      router.replace('/login');
    }

  };

  return (
    <>
      <Stack
        spacing={3}
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent='space-between'
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: 'grey.200',
            gap: '64px',
            maxWidth: { xs: '100%', md: '40%' }
          }}
        >
          {/* Welcome Message */}
          <Stack spacing={2}>
            <Typography variant="h3">Hi, Welcome back</Typography>
            <Typography variant="body1">More effectively with optimized workflows.</Typography>
          </Stack>

          {/* Illustration (Dashboard image) */}
          <Box sx={{ maxWidth: { xs: 300, md: 600 }, width: '100%', textAlign: 'center' }} spacing={5}>
            <img
              src="https://assets.minimals.cc/public/assets/illustrations/illustration-dashboard.webp"
              alt="Dashboard illustration"
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Box>

        <Box sx={{ padding: 4, width: '100%', maxWidth: { xs: '100%', md: '60%' } }} alignContent='center'>
          <Box maxWidth={'sm'} m='auto'>
            <Typography variant="h5" gutterBottom>
              Sign in to your account
            </Typography>

            <Typography variant="body2">
              Don’t have an account?{' '}
              <Link component={RouterLink} to="" underline="hover">
                Get started
              </Link>
            </Typography>

            {/* Step 3: FormProvider & Form Handling */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              {/* Forgot Password Link */}
              <Box sx={{ textAlign: 'right', marginTop: 1 }}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Box>

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <Button
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      ),
                    }}
                  />
                )}
              />

              {/* Sign-in Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ marginTop: 3 }}
                type="submit"
              >
                Sign in
              </Button>
            </form>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
