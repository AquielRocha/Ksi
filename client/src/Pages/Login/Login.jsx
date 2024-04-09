import React from 'react';
import View from './View';
import Models from './Models';

const Login = () => {
  const { userName, password, error, handleLogin,handleCampo, setUserName, setPassword, setError } = Models();


  return (
    <View
      userName={userName}
      password={password}
      error={error}
      handleLogin={handleLogin}
      handleCampo={handleCampo}
      setUserName={setUserName}
      setPassword={setPassword}
      setError={setError}
    />
  );
};

export default Login;
