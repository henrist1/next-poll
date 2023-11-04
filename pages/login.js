import AuthForm from '/components/AuthForm';
import React from 'react';


function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <AuthForm mode="login" />
    </div>
  );
}

export default LoginPage;
