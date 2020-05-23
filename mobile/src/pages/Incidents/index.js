import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
	const [incidents, setIncidents] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const navigation = useNavigation();

	const navigateToDetail = incident => {
		navigation.navigate('Detail', { incident });
	};

	async function loadIncidents() {
		if (loading) {
			return;
		}

		if (total > 0 && incidents.length === total) {
			return;
		}

		setLoading(true);

		const response = await api.get('incidents', { params: { page } });

		setIncidents([...incidents, ...response.data]);
		setTotal(response.headers['x-total-count']);
		setPage(page + 1);
		setLoading(false);
	}

	useEffect(() => {
		loadIncidents();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<Text style={styles.headerText}>
					Total:
					<Text style={styles.headerTextBold}> {total} cases</Text>
				</Text>
			</View>

			<Text style={styles.title}>Welcome!</Text>
			<Text style={styles.description}>
				Pick one case below and save the day
			</Text>

			<FlatList
				data={incidents}
				keyExtractor={incident => String(incident.id)}
				showsVerticalScrollIndicator={false}
				onEndReached={loadIncidents}
				onEndReachedThreshold={0.6}
				style={styles.incidentsList}
				renderItem={({ item: incident }) => (
					<View style={styles.incident}>
						<Text style={styles.incidentsProperty}>NGO:</Text>
						<Text style={styles.incidentsValue}>{incident.name}</Text>

						<Text style={styles.incidentsProperty}>Case:</Text>
						<Text style={styles.incidentsValue}>{incident.title}</Text>

						<Text style={styles.incidentsProperty}>Value: </Text>
						<Text style={styles.incidentsValue}>
							{Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							}).format(incident.value)}
						</Text>

						<TouchableOpacity
							style={styles.detailsButton}
							onPress={() => navigateToDetail(incident)}
						>
							<Text style={styles.detailsButtonText}>More Info</Text>
							<Feather name='arrow-right' size={16} color='#e02041' />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}
