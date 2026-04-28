import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { 
  addMessage, 
  setLoading, 
  setError, 
  clearChat, 
  selectMessages, 
  selectQAStatus 
} from '../services/qaSlice';
import { askQuestionApi } from '../services/qaApi';
import { GlassTheme, commonStyles } from '../styles/GlassTheme';
import { StyleSheet } from 'react-native';

const ReaderQAScreen = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { bookId, bookTitle } = route.params;
  
  const messages = useSelector(selectMessages);
  const { isLoading } = useSelector(selectQAStatus);
  const flatListRef = useRef(null);

  // Clear chat when leaving the screen
  useEffect(() => {
    return () => {
      dispatch(clearChat());
    };
  }, [dispatch]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userQuestion = input.trim();
    setInput('');
    
    // 1. Add user message locally
    dispatch(addMessage({ role: 'user', content: userQuestion }));
    dispatch(setLoading(true));

    try {
      // 2. Call the AI Proxy
      const data = await askQuestionApi(bookId, userQuestion);
      
      // 3. Add AI answer locally
      dispatch(addMessage({ role: 'ai', content: data.answer }));
    } catch (err) {
      Alert.alert('Error', err.message);
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.aiBubble,
        commonStyles.shadow
      ]}>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={GlassTheme.colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle} numberOfLines={1}>{bookTitle}</Text>
          <Text style={styles.headerSubtitle}>AI Assistant</Text>
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything about the book..."
            placeholderTextColor={GlassTheme.colors.textSecondary}
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]} 
            onPress={handleSend}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <AntDesign name="arrowup" size={20} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlassTheme.colors.background[0],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: GlassTheme.spacing.m,
    backgroundColor: GlassTheme.colors.glassBackground,
    borderBottomWidth: 1,
    borderBottomColor: GlassTheme.colors.border,
  },
  headerInfo: {
    marginLeft: GlassTheme.spacing.m,
    flex: 1,
  },
  headerTitle: {
    color: GlassTheme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: GlassTheme.colors.textSecondary,
    fontSize: 12,
  },
  listContent: {
    padding: GlassTheme.spacing.m,
    paddingBottom: 40,
  },
  bubble: {
    padding: GlassTheme.spacing.m,
    borderRadius: GlassTheme.roundness.l,
    marginBottom: GlassTheme.spacing.m,
    maxWidth: '85%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: GlassTheme.colors.userBubble[0],
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: GlassTheme.colors.aiBubble,
    borderWidth: 1,
    borderColor: GlassTheme.colors.border,
  },
  messageText: {
    color: '#FFF',
    fontSize: 15,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GlassTheme.colors.glassBackground,
    padding: GlassTheme.spacing.m,
    paddingBottom: Platform.OS === 'ios' ? 30 : GlassTheme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: GlassTheme.colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: GlassTheme.roundness.pill,
    paddingHorizontal: GlassTheme.spacing.m,
    paddingVertical: 10,
    color: '#FFF',
    marginRight: GlassTheme.spacing.m,
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: GlassTheme.colors.userBubble[0],
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  }
});

export default ReaderQAScreen;
