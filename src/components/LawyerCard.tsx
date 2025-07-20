import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LawyerCardProps } from '../types/lawyer';

const LawyerCard = ({
  lawyer,
  onPress,
}: LawyerCardProps) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={() => onPress(lawyer)}
  >
    <Image source={{ uri: lawyer.photo }} style={styles.avatar} />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{lawyer.name}</Text>
      <Text style={styles.specialization}>{lawyer.specialization}</Text>
      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(lawyer.status) }]} />
        <Text style={styles.statusText}>{lawyer.status}</Text>
      </View>
    </View>
    <View style={styles.rightContainer}>
      <Text style={styles.rating}>★ {lawyer.rating}</Text>
      <Text style={styles.fee}>${lawyer.consultationFee}/hr</Text>
    </View>
  </TouchableOpacity>
);

export default React.memo(LawyerCard);

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Online': return '#4CAF50';
    case 'In Meeting': return '#FFC107';
    default: return '#9E9E9E';
  }
};

const styles = StyleSheet.create({
    
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 4,
  },
  fee: {
    fontSize: 14,
    color: '#2196F3',
  },
})