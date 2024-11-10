import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fondoLogin from './components/fondologin2.png';

const Form = ({ setIsAuthenticated }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email: loginEmail, password: loginPassword });
      alert(response.data.message || 'Login successful');
      setIsAuthenticated(true);
      navigate('/prensa');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || 'An error occurred during login');
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', { username, email: registerEmail, password: registerPassword });
      alert(response.data.message || 'Registration successful');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || 'An error occurred during registration');
    }
  };

  return (
    <FullPageWrapper>
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input type="checkbox" className="toggle" />
            <span className="slider" />
            <span className="card-side" />
            <div className="flip-card__inner">
              <div className="flip-card__front">
                <div className="title">ACCESO</div>
                <form className="flip-card__form" onSubmit={handleSubmitLogin}>
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button className="flip-card__btn" type="submit">Entrar</button>
                </form>
              </div>
              <div className="flip-card__back">
                <div className="title">INSCRIBIRSE COMO REPORTERO</div>
                <form className="flip-card__form" onSubmit={handleSubmitRegister}>
                  <input
                    className="flip-card__input"
                    placeholder="Name"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                  <button className="flip-card__btn" type="submit">Confirmar</button>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </FullPageWrapper>
  );
};

const FullPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa toda la altura de la pantalla */
  width: 100vw; /* Ocupa todo el ancho de la pantalla */
  background-image: url(${fondoLogin});
  background-size: 30%;
  background-position: 75% 30px;
  background-repeat: no-repeat;

  .wrapper {
    --input-focus: #fff;
    --font-color: #fff;
    --font-color-sub: #fff;
    --bg-color: rgba(120, 150, 654, 0.4);
    --bg-color-alt: #666;
    --main-color: #000;
    --login-bg-color: rgba(140, 30, 400, 0.7);
    --register-bg-color: rgba(140, 30, 400, 0.7);
  }

  .card-switch {
    position: relative;
    transform: translateY(-200px) translateX(-450%);;
    background: rgba(0, 0, 0, 0.6); /* Fondo semi-transparente */
    padding: 20px;
    border-radius: 10px;
  }


  .switch {
    transform: translateY(-200px);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 50px;
    height: 20px;
  }

  .card-side::before {
    position: absolute;
    content: 'Acceso';
    left: -120px;
    top: 0;
    width: 100px;
    text-decoration: underline;
    color: var(--font-color);
    font-weight: 600;
  }

  .card-side::after {
    position: absolute;
    content: 'Inscribirse';
    left: 70px;
    top: 0;
    width: 100px;
    text-decoration: none;
    color: var(--font-color);
    font-weight: 600;
  }

  .toggle {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-color);
    transition: 0.3s;
  }

  .slider:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    left: -2px;
    bottom: 2px;
    background-color: var(--bg-color);
    box-shadow: 0 3px 0 var(--main-color);
    transition: 0.3s;
  }

  .toggle:checked + .slider {
    background-color: var(--input-focus);
  }

  .toggle:checked + .slider:before {
    transform: translateX(30px);
  }

  .toggle:checked ~ .card-side:before {
    text-decoration: none;
  }

  .toggle:checked ~ .card-side:after {
    text-decoration: underline;
  }

  .flip-card__inner {
    width: 300px;
    height: 350px;
    position: relative;
    background-color: transparent;
    perspective: 1000px;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .toggle:checked ~ .flip-card__inner {
    transform: rotateY(180deg);
  }

  .toggle:checked ~ .flip-card__front {
    box-shadow: none;
  }

  .flip-card__front, .flip-card__back {
    padding: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: lightgrey;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    background-color: var(--login-bg-color); /
  }

  .flip-card__back {
    width: 100%;
    transform: rotateY(180deg);
    background-color: var(--register-bg-color); 
  }

  .flip-card__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .title {
    margin: 20px 0;
    font-size: 25px;
    font-weight: 900;
    text-align: center;
    color: var(--main-color);
  }

  .flip-card__input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .flip-card__input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .flip-card__input:focus {
    border: 2px solid var(--input-focus);
  }

  .flip-card__btn {
    margin: 20px 0;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }

  .flip-card__btn:active {
    box-shadow: 0px 0px 0px transparent;
    transform: translateY(4px);
  }

  @media (min-width: 1200px) {
    .card-switch {
      max-width: 400px;
      padding: 25px;
    }

    @media (max-width: 600px) {
    .card-switch {
      padding: 15px;
      max-width: 90%;
      transform: translateY(-150px) translateX(0);
    }

    @media (max-width: 768px) {
    background-size: 50%; /* Fondo más grande para pantallas pequeñas */
    background-position: center;
  }

  /* Media Query para pantallas grandes */
  @media (min-width: 1024px) {
    background-size: 25%; /* Fondo más pequeño para pantallas grandes */
    background-position: 80% 40px; /* Ajuste de la posición del fondo */
  }
    
;
`;

export default Form;
