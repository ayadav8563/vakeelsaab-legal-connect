import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DetailRowProps {
  label: string;
  value: string | number;
  fallback?: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, fallback = 'Not specified' }) => {
  const getDisplayValue = (): string => {
  if (value === undefined || value === null || value === '') return fallback;
  return typeof value === 'string' ? value : String(value);
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{getDisplayValue()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
});

export default React.memo(DetailRow);