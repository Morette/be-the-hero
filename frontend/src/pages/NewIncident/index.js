import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [value, setValue] = useState('');

	const ongId = localStorage.getItem('ongId');
	const history = useHistory();

	const handleNewInstace = async (event) => {
		event.preventDefault();

		const data = {
			title,
			description,
			value,
		};

		try {
			await api.post('incidents', data, {
				headers: { Authorization: ongId },
			});
		} catch (error) {
			alert('error, try again');
		}

		history.push('/profile');
	};

	return (
		<div className='new-incident-container'>
			<div className='content'>
				<section>
					<img src={logo} alt='heroes logo' />

					<h1>Register</h1>
					<p>Please, fully describe the case to find a hero to help</p>

					<Link className='back-link' to='/profile'>
						<FiArrowLeft size={16} color='#e02041' />
						Back to home
					</Link>
				</section>
				<form onSubmit={handleNewInstace}>
					<input
						type='text'
						placeholder='Incident title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						placeholder='Description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					<input
						placeholder='Value'
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>

					<button className='button' type='submit'>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
