import React, { useState } from 'react';
import FormLogin from '../components/FormLogin';
import FormCadastro from '../components/FormCadastro';

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const switchToLogin = () => setIsLogin(true);
  const switchToCadastro = () => setIsLogin(false);

  return (
    <div>
      {isLogin ? 
        <FormLogin switchToCadastro={switchToCadastro} /> : 
        <FormCadastro switchToLogin={switchToLogin} />
      }
    </div>
  );
}

export default Login;

