import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
	const navigation = useNavigation();
	const route = useRoute();

	const incident = route.params.incident;

	const message = `Hello ${
		incident.name
	}, I\'m in contact because I would like to help in case ${
		incident.title
	} which the value of ${Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(incident.value)}`;

	function sendMail() {
		MailComposer.composeAsync({
			subject: `Hero's Case: ${incident.title}`,
			recipients: [incident.email],
			body: message,
		});
	}

	function sendWhatsApp() {
		Linking.openURL(
			`whatsapp://send?phone=${incident.whatsapp}&text=${message}`,
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />

				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Feather name='arrow-left' size={28} color='#e82041' />
				</TouchableOpacity>
			</View>

			<View style={styles.incidents}>
				<Text style={[styles.incidentsProperty, { marginTop: 0 }]}>
					NGO:
				</Text>
				<Text style={styles.incidentsValue}>
					{incident.name} from {incident.city}/{incident.uf}
				</Text>

				<Text style={styles.incidentsProperty}>Case:</Text>
				<Text style={styles.incidentsValue}>{incident.title}</Text>

				<Text style={styles.incidentsProperty}>Value:</Text>
				<Text style={styles.incidentsValue}>
					{Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(incident.value)}
				</Text>
			</View>

			<View style={styles.contactBox}>
				<Text style={styles.heroTitle}>Save the day</Text>
				<Text style={styles.heroTitle}>Be the hero of this case</Text>

				<Text style={styles.heroDescription}>Contact:</Text>

				<View style={styles.actions}>
					<TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
						<Text style={styles.actionText}>Whatsapp</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.action} onPress={sendMail}>
						<Text style={styles.actionText}>Email</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
