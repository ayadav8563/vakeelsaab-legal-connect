import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { chatAction } from '../store/Slices/chat.slice';
import { Message, RootStackParamList, RootState } from '../types/lawyer';
import MessageBubble from '../components/MessageBubble';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const dispatch = useDispatch();
  const { lawyer } = route.params;
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const conversations = useSelector((state: RootState) => state.chatReducer.conversations);

  const messages = React.useMemo(() => {
    return lawyer?.id ? conversations?.[lawyer.id] || [] : [];
  }, [conversations, lawyer?.id]);

  useEffect(() => {
    dispatch(chatAction.setCurrentLawyer(lawyer.id));

    if (messages.length === 0) {
      const welcomeMessage = {
        id: '1',
        text: `Hello, I'm ${lawyer?.name}. How can I help you today?`,
        sender: 'lawyer' as const,
        timestamp: new Date().toISOString(),
      };
      dispatch(
        chatAction.addMessage({ lawyerId: lawyer.id, message: welcomeMessage }),
      );
    }
  }, [dispatch, lawyer, messages]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const userMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user' as const,
      timestamp: new Date().toISOString(),
    };
    dispatch(
      chatAction.addMessage({ lawyerId: lawyer.id, message: userMessage }),
    );
    setNewMessage('');
    setTimeout(() => {
      const responses = [
        'I understand your concern. Let me look into this.',
        'Based on my experience, I would recommend...',
        "That's an interesting question. The legal precedent suggests...",
        "I'll need to check some references to give you a precise answer.",
        'In similar cases, we typically approach this by...',
        'Have you considered the following options...',
        'The relevant law in this situation states that...',
        'Let me explain how this applies to your case...',
      ];

      const lawyerMessage = {
        id: Date.now().toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'lawyer' as const,
        timestamp: new Date().toISOString(),
      };
      dispatch(
        chatAction.addMessage({ lawyerId: lawyer.id, message: lawyerMessage }),
      );
    }, 1000 + Math.random() * 2000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble
      message={item.text}
      isCurrentUser={item.sender === 'user'}
      timestamp={item.timestamp}
    />
  );

  const getStatusColor = (status: string) => {
    return status === 'Online' ? '#4CAF50' : '#9E9E9E';
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <SafeAreaView style={styles.flex_1}>
        <View style={styles.header}>
          <Text style={styles.lawyerName}>{lawyer.name}</Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor(lawyer.status) },
              ]}
            />
            <Text style={styles.statusText}>{lawyer.status}</Text>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.sendButton}
            onPress={handleSendMessage}
            disabled={newMessage.trim() === ''}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex_1: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lawyerName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2196F3',
    borderBottomRightRadius: 2,
  },
  lawyerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  userMessageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  sendButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatScreen;
