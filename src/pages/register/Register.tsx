import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button } from '../../components';
import images from '../../constants/images';
import { Container, Form, Header, Image, Signup, Wrapper } from './styles';
import { signup } from '../../services/httpCalls';
import { User } from '../../models/User';

export default function Register() {
  const textFieldHeight = '3rem';
  const labelFontSize = 13;

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = useRef({});
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  password.current = watch('password', '');

  const onSubmit = () => {
    const data: User = {
      name: nameRef.current?.value as string,
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
    };

    signup('/users', data)
      .then(res => {
        window.localStorage.setItem('user', JSON.stringify(res.data));
        window.localStorage.setItem('password', passwordRef.current?.value as string);
        window.dispatchEvent(new Event('storageUser'));
      })
      .catch(err => alert(`Erro ao criar conta!\n${err as string}`));
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <Image src={images.login} />
        </Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nome"
            fullWidth
            variant="filled"
            inputRef={nameRef}
            error={!!errors?.name}
            helperText={errors?.name ? (errors.name.message as unknown as string) : null}
            {...register('name', {
              required: 'Obrigatório',
            })}
            style={{ marginBottom: '1rem' }}
            InputLabelProps={{ style: { fontSize: labelFontSize } }}
            inputProps={{
              style: {
                height: textFieldHeight,
                padding: '0 13px',
              },
            }}
          />
          <TextField
            label="Email"
            fullWidth
            variant="filled"
            type="email"
            inputRef={emailRef}
            error={!!errors?.email}
            helperText={
              errors?.email ? (errors.email.message as unknown as string) : null
            }
            {...register('email', {
              required: 'Obrigatório',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Email inválido',
              },
            })}
            style={{ marginBottom: '1rem' }}
            InputLabelProps={{ style: { fontSize: labelFontSize } }}
            inputProps={{
              style: {
                height: textFieldHeight,
                padding: '0 14px',
              },
            }}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Senha"
            inputRef={passwordRef}
            type={showPassword ? 'text' : 'password'}
            error={!!errors?.password}
            helperText={
              errors?.password ? (errors.password.message as unknown as string) : null
            }
            {...register('password', {
              required: 'Obrigatório',
              min: 6,
            })}
            style={{ marginBottom: '1rem' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { fontSize: labelFontSize } }}
            inputProps={{
              style: {
                height: textFieldHeight,
                padding: '0 14px',
              },
            }}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Confirmar senha"
            type={showConfirmPassword ? 'text' : 'password'}
            error={!!errors?.confirmPassword}
            helperText={
              errors?.confirmPassword
                ? (errors.confirmPassword.message as unknown as string)
                : null
            }
            {...register('confirmPassword', {
              required: 'Obrigatório',
              min: 6,
              validate: value => value === password.current || 'As senhas não batem!',
            })}
            style={{ marginBottom: '1.5rem' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { fontSize: labelFontSize } }}
            inputProps={{
              style: {
                height: textFieldHeight,
                padding: '0 14px',
              },
            }}
          />
          <Button text="Registrar" type="submit" />
          <Signup>
            Já tem uma conta?{' '}
            <Link
              to="/login"
              style={{ textDecoration: 'underline', color: theme.colors.header }}
            >
              Entre
            </Link>
          </Signup>
        </Form>
      </Wrapper>
    </Container>
  );
}
