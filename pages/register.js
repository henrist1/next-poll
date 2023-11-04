import AuthForm from '../components/AuthForm';
import React from 'react';


function RegisterPage() {
  return (
    <div>
      <h1>Register</h1>
      <AuthForm mode="register" />
    </div>
  );
}

export default RegisterPage;
