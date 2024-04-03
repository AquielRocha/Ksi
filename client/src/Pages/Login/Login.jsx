import React from 'react';
import View from './View';
import Models from './Models';

const Login = () => {
  const { userName, password, error, handleLogin, setUserName, setPassword, setError} = Models();

  return (
    <View
      userName={userName}
      password={password}
      error={error}
      handleLogin={handleLogin}
      setUserName={setUserName}
      setPassword={setPassword}
      setError={setError}
    />
  );
};

export default Login;
