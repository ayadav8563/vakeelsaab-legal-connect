import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MessageBubbleProps } from '../types/lawyer';

const MessageBubble = ({
  message,
  isCurrentUser,
  timestamp,
}: MessageBubbleProps) => (
  <View style={[
    styles.container,
    isCurrentUser ? styles.userBubble : styles.lawyerBubble
  ]}>
    <Text style={[
      styles.text,
      isCurrentUser && styles.userText
    ]}>
      {message}
    </Text>
    <Text style={styles.timestamp}>
      {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </Text>
  </View>
);

export default React.memo(MessageBubble);

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2196F3',
    borderBottomRightRadius: 2,
  },
  lawyerBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  userText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusIndicator: {
    fontSize: 10,
    marginLeft: 4,
  },
});