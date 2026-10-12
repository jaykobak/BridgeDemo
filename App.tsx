import { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, Pressable, NativeModules, Platform } from 'react-native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [message, setMessage] = useState("Press the button");
  const { HelloModule } = NativeModules;

  const handleCallNative = async () => {
    if (!HelloModule) {
      setMessage(`HelloModule not found on ${Platform.OS}.`);
      return;
    }

    try {
      const greeting = await HelloModule.sayHello('Tunde');
      setMessage(greeting);
    } catch (error) {
      setMessage('Something went wrong while calling native code.');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <Text style={ styles.message }>{message}</Text>

      <Pressable onPress={handleCallNative} style={ styles.button }>
        <Text style={ styles.buttonText }>Call native code</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  message: {
    fontSize: 20,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
