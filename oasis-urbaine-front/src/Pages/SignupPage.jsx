import React, { useState, useContext } from 'react'
import UserService from '../Services/UserService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

function SignupPage() {
  const [user, setUser] = useState({name : '', firstname : '', email : '', password : ''});
  const {setIsAuthenticated, setToken} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value} = event.currentTarget;
    setUser({...user, [name] : value});
  }

  const signup = async (event) => {
    event.preventDefault();
    try {
      await UserService.signupUser(user);
      const token = await UserService.loginUser(user);
      toast.success(`Compte créé avec succès ! Bienvenue ${user.firstname} 🌿`);
      window.localStorage.setItem('authToken', token.data.token);
      setIsAuthenticated(true);
      setToken(token.data.token);
      navigate('/');
    } catch (error) {
      toast.error('Erreur lors de la création du compte')
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      <form method="post" onSubmit={signup}>
        <input type="text" placeholder="name" name="name" value={user.name} onChange={handleChange} />
        <input type="text" placeholder="firstname" name="firstname" value={user.firstname} onChange={handleChange} />
        <input type="email" placeholder="email" name="email" value={user.email} onChange={handleChange} />
        <input type="password" placeholder="password" name="password" value={user.password} onChange={handleChange} />
        <button type='submit'>Créer mon compte</button>
      </form>
      <a href='/login'>Se connecter</a>
    </div>
  )
}

export default SignupPage
