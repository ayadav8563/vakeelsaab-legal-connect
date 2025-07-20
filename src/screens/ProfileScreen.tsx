import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import DetailRow from '../components/DetailRow';
import { RootStackParamList } from '../types/lawyer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ProfileDetailProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
  route: RouteProp<RootStackParamList, 'Profile'>;
}

const ProfileScreen: React.FC<ProfileDetailProps> = ({ navigation, route }) => {
  const { lawyer } = route.params;

  const handleStartChat = () => {
    navigation.navigate('Chat', { lawyer: lawyer });
  };

  const detailFields = [
    {
      key: 'experience',
      label: 'Experience',
      value: `${lawyer.experience} years`,
      fallback: 'Not specified',
    },
    {
      key: 'consultationFee',
      label: 'Consultation Fee',
      value: `$${lawyer.consultationFee}/hr`,
      fallback: 'Not specified',
    },
    {
      key: 'languages',
      label: 'Languages',
      value: lawyer.languages?.join(', '),
      fallback: 'English',
    },
    {
      key: 'education',
      label: 'Education',
      value: lawyer.education,
      fallback: 'Not specified',
    },
    {
      key: 'specialization',
      label: 'Specialization',
      value: lawyer.specialization,
      fallback: 'Not specified',
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Online' ? '#4CAF50' : '#9E9E9E';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: lawyer.photo }} style={styles.profileImage} />
        <Text style={styles.name}>{lawyer.name}</Text>
        <Text style={styles.specialization}>{lawyer.specialization}</Text>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: getStatusColor(lawyer.status) },
            ]}
          />
          <Text style={styles.statusText}>{lawyer.status}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {lawyer.rating}</Text>
          <Text style={styles.reviews}>({lawyer.reviews} reviews)</Text>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>{lawyer.bio || 'No bio available'}</Text>

        {detailFields.map(field => (
          <DetailRow
            key={field.key}
            label={field.label}
            value={field.value}
            fallback={field.fallback}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.chatButton} onPress={handleStartChat}>
        <Text style={styles.chatButtonText}>Start Chat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  specialization: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC107',
    marginRight: 5,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  detailsSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  bio: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
  chatButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
