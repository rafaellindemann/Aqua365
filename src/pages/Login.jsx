import React from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); // Hook para navegação

  function fazerLogin(){
    navigate('/')
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={fazerLogin}>Logar</button>
    </div>
  )
}

export default Login;