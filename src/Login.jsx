import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import apiCLient from './api-client';

const statusList = {
  iddle: 'iddle',
  process: 'process',
  success: 'success',
  error: 'error',
};

export default function Login({ setSession }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    setFocus,
  } = useForm();

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const [formStatus, setFormStatus] = useState(statusList.idle);

  const onSubmit = async (formData) => {
    const { email, password } = formData;

    setFormStatus(statusList.process);

    try {
      const { data } = await apiCLient().post('/auth/login', { email, password });

      if (data.error == 1) {
        setError('email', { type: 'generalError', message: data.message });
        setFormStatus(statusList.error);
        resetField('password');
        return;
      }

      const session = { name: data.user.full_name, token: data.token };
      setSession(session);

      localStorage.setItem('session', JSON.stringify(session));
    } catch (error) {
      setError('email', { type: 'unknownError', message: 'Something went wrong!' });
      setFormStatus(statusList.error);
      resetField('password');
    }
  };

  return (
    <>
      <Stack spacing={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" id="email" {...register('email', { required: 'Email is required' })} />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} marginTop={2}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input type="password" id="password" {...register('password', { required: 'Password is required' })} />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <Stack spacing={10} marginTop={4}>
            <Button
              type="submit"
              bg={'blue.400'}
              color={'white'}
              disabled={formStatus === statusList.process}
              _hover={{
                bg: 'blue.500',
              }}>
              {formStatus === statusList.process ? 'Signing In ...' : 'Sign In'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
}
