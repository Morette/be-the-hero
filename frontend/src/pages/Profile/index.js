import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

import logo from '../../assets/logo.svg';

export default function Profile() {
	const ongName = localStorage.getItem('ongName');
	const ongId = localStorage.getItem('ongId');
	const history = useHistory();

	const [incidents, setIncidents] = useState([]);

	useEffect(() => {
		api.get('/profile', {
			headers: {
				Authorization: ongId,
			},
		}).then((response) => setIncidents(response.data));
	}, [ongId]);

	const handleDelete = async (id) => {
		try {
			await api.delete(`/incidents/${id}`, {
				headers: {
					Authorization: ongId,
				},
			});

			setIncidents(incidents.filter((incident) => incident.id !== id));
		} catch (error) {
			alert('error on delete case');
		}
	};

	const handleLogout = () => {
		localStorage.clear();
		history.push('/');
	};

	return (
		<div className='profile-container'>
			<header>
				<img src={logo} alt='be the hero logo' />
				<span>Welcome {ongName}</span>

				<Link className='button' to='/incidents/new'>
					Register new incident
				</Link>
				<button type='button' onClick={handleLogout}>
					<FiPower size={18} color='#e02041' />
				</button>
			</header>

			<h1>Registered incidents</h1>

			<ul>
				{incidents.map((incident) => (
					<li key={incident.id}>
						<strong>Case: </strong>
						<p>{incident.title}</p>

						<strong>Description: </strong>
						<p>{incident.description}</p>

						<strong>Value: </strong>
						<p>
							{Intl.NumberFormat('pt', {
								style: 'currency',
								currency: 'EUR',
							}).format(incident.value)}
						</p>

						<button
							type='button'
							onClick={() => handleDelete(incident.id)}
						>
							<FiTrash2 size={20} color='#a8a8b3' />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
