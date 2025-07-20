import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchLawyers } from '../store/Actions/lawyers.action';
import { useNavigation } from '@react-navigation/native';
import LawyerCard from '../components/LawyerCard';
import { Lawyer, useAppDispatch } from '../types/lawyer';

const ListSeparator = () => <View style={styles.separator} />;

const LawyersListing = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { lawyers, loading } = useSelector(
    (state: any) => state?.lawyersReducer,
  );
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const _getListing = useCallback(() => {
    dispatch(fetchLawyers());
  }, [dispatch]);

  React.useEffect(() => {
    _getListing();
  }, [_getListing]);

  React.useEffect(() => {
    if (refreshing && (loading === 'succeeded' || loading === 'failed')) {
      setRefreshing(false);
    }
  }, [refreshing, loading]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    _getListing();
  }, [_getListing]);

  const filteredLawyers = useMemo(() => {
    if (!searchQuery) return lawyers;
    
    return lawyers.filter((lawyer: Lawyer) => 
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [lawyers, searchQuery]);

  const renderItem = useCallback(({ item }: { item: Lawyer }) => (
    <LawyerCard
      lawyer={item}
      onPress={(lawyer) => navigation.navigate('Profile', { lawyer })}
    />
  ), [navigation]);

  if (loading === 'pending' && !refreshing && lawyers.length === 0) {
    return (
      <View style={styles.fullScreenLoader}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading lawyers...</Text>
      </View>
    );
  }

  if (loading === 'failed') {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load lawyers. Pull to refresh.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search lawyers by name or specialization..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>
      
      <FlatList
        data={filteredLawyers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={ListSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2196F3']}
            tintColor="#2196F3"
          />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No lawyers found{searchQuery ? ` for "${searchQuery}"` : ''}</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  fullScreenLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  separator: {
    height: 16,
  },
});

export default LawyersListing;