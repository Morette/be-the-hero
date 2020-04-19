import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default function Login() {
	const [id, setId] = useState('');
	const history = useHistory();

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const response = await api.post('sessions', { id });
			localStorage.setItem('ongId', id);
			localStorage.setItem('ongName', response.data.name);

			history.push('/profile');
		} catch (err) {
			alert('login failed, try again');
		}
	};

	return (
		<div className='login-container'>
			<section className='form'>
				<img className='logo' src={logo} alt='Heroes Logo' />

				<form onSubmit={handleLogin}>
					<h1>Login</h1>

					<input
						placeholder='Your ID'
						value={id}
						onChange={(event) => setId(event.target.value)}
					></input>
					<button className='button' type='submit'>
						Enter
					</button>

					<Link className='back-link' to='/register'>
						<FiLogIn size={16} color='#e02041' />
						Don't have an account?
					</Link>
				</form>
			</section>

			<img className='heroes-image' src={heroesImg} alt='Heroes' />
		</div>
	);
}
