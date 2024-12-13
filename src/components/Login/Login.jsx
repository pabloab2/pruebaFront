import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import logo from "../../images/logo-cropped.svg";
import './Login.css';

// Configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyBj6VubID_wYEkF49PsUGUQT9YDj0rFtEQ",
  authDomain: "plantilla-57b43.firebaseapp.com",
  projectId: "plantilla-57b43",
  storageBucket: "plantilla-57b43.firebasestorage.app",
  messagingSenderId: "59630106751",
  appId: "1:59630106751:web:2f24d5443841c0ef61274a"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate(); // Inicializamos useNavigate

  // Manejar cambios en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Limpiar errores al escribir
  };

  // Manejar el inicio de sesión con correo y contraseña
  const checkAccount = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'El correo es obligatorio.' }));
      return;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'La contraseña es obligatoria.' }));
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio de sesión exitoso');
      navigate('/'); // Redirigimos al Home después del inicio de sesión exitoso
    } catch (error) {
      setAuthError('Correo o contraseña incorrectos.');
      console.error('Error de autenticación:', error);
    }
  };

  // Manejar el registro de una nueva cuenta
  const createAccount = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'El correo es obligatorio.' }));
      return;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'La contraseña es obligatoria.' }));
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Cuenta creada exitosamente');
      navigate('/'); // Redirigimos al Home después del registro exitoso
    } catch (error) {
      setAuthError('Error al crear la cuenta.');
      console.error('Error de registro:', error);
    }
  };

  // Manejar el inicio de sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Inicio de sesión con Google exitoso:', result.user);
      navigate('/'); // Redirigimos al Home después del inicio de sesión con Google
    } catch (error) {
      setAuthError('Error al iniciar sesión con Google.');
      console.error('Error de autenticación con Google:', error);
    }
  };

  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary vh-100 vw-100">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={checkAccount}>
          <Link to="/">
            <img
              src={logo}
              alt={"logoCityBeats"}
              className="m-5 img-fluid"
              width="200"
              height="200"
            />
          </Link>
          <h1 className="h2 mb-4 fw-normal" tabIndex={"0"}>
            Por favor inicie sesión
          </h1>

          {/* Campo de correo electrónico */}
          <div className="form-floating">
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Correo Electrónico</label>
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Campo de contraseña */}
          <div className="form-floating">
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Contraseña</label>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Mensaje de error de autenticación */}
          {authError && (
            <div className="alert alert-danger mt-2" role="alert">
              {authError}
            </div>
          )}

          {/* Botón de inicio de sesión */}
          <button
            className="btn btn-primary w-100 py-2 my-1"
            type="submit"
          >
            Iniciar Sesión
          </button>

          {/* Botón de registro de nueva cuenta */}
          <button
            className="btn btn-secondary w-100 py-2 my-1"
            type="button"
            onClick={createAccount}
          >
            Crear Cuenta
          </button>

          {/* Botón de inicio de sesión con Google */}
          <button
            className="btn btn-secondary w-100 py-2 my-1"
            type="button"
            onClick={handleGoogleLogin}
          >
            Iniciar Sesión con Google
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
