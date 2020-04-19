import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logo from '../../assets/logo.svg';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [city, setCity] = useState('');
	const [uf, setUf] = useState('');

	const history = useHistory();

	const handleRegister = async (event) => {
		event.preventDefault();

		const data = {
			name,
			email,
			whatsapp,
			city,
			uf,
		};

		try {
			const response = await api.post('ongs', data);
			alert(`your access id: ${response.data.id}`);

			history.push('/');
		} catch (err) {
			alert(`register error`);
		}
	};

	return (
		<div className='register-container'>
			<div className='content'>
				<section>
					<img src={logo} alt='heroes logo' />
					<h1>ONG Register</h1>
					<p>
						Make you register and enter into the platform to help people
						find you ONGs incidents
					</p>
					<Link className='back-link' to='/'>
						<FiArrowLeft size={16} color='#e02041' />
						Already have an account?
					</Link>
				</section>
				<form onSubmit={handleRegister}>
					<input
						type='text'
						placeholder='ONG Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='text'
						placeholder='Whatsapp'
						value={whatsapp}
						onChange={(e) => setWhatsapp(e.target.value)}
					/>

					<div className='input-group'>
						<input
							type='text'
							placeholder='City'
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
						<input
							type='text'
							placeholder='UF'
							style={{ width: 80 }}
							value={uf}
							onChange={(e) => setUf(e.target.value)}
						/>
					</div>
					<button className='button' type='submit'>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
