import { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, Pressable, TextInput, NativeModules } from 'react-native';

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

  const { HelloModule } = NativeModules;

  const [message, setMessage] = useState('Press the button');

  const [numberA, setNumberA] = useState('');
  const [numberB, setNumberB] = useState('');
  const [sum, setSum] = useState('');

  const [deviceModel, setDeviceModel] = useState('');

  const handleCallNative = async () => {
    if (!HelloModule) {
      setMessage(`HelloModule not found on Android.`);
      return;
    }

    const greeting = await HelloModule.sayHello('Tunde');
    setMessage(greeting);
  };

  const handleAddNumbers = async () => {
    if (!HelloModule) {
      setSum(`HelloModule not found on Android.`);
      return;
    }

    const a = Number(numberA);
    const b = Number(numberB);

    const result = await HelloModule.add(a, b);
    setSum(`Result: ${result}`);
  };

  const handleGetDeviceModel = async () => {
    if (!HelloModule) {
      setDeviceModel(`HelloModule not found on Android.`);
      return;
    }

    const model = await HelloModule.getDeviceModel();
    setDeviceModel(`Device model: ${model}`);
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: safeAreaInsets.top },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>

        {/* Native code */}
        <Pressable style={styles.button} onPress={handleCallNative}>
          <Text style={styles.buttonText}>Call native code</Text>
        </Pressable>
        
        {/* Adding two numbers */}
        <TextInput style={styles.input} keyboardType="decimal-pad" value={numberA} onChangeText={setNumberA}/>
        <TextInput style={styles.input} keyboardType="decimal-pad" value={numberB} onChangeText={setNumberB}/>

        <Pressable style={styles.button} onPress={handleAddNumbers}>
          <Text style={styles.buttonText}>Add Numbers</Text>
        </Pressable>

        <Text style={styles.result}>{sum}</Text>

        {/* Device model */}
        <Pressable style={styles.button} onPress={handleGetDeviceModel}>
          <Text style={styles.buttonText}>Get Device Model</Text>
        </Pressable>

        <Text style={styles.result}>{deviceModel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  message: {
    fontSize: 18,
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#111827',
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  result: {
    fontSize: 17,
    marginTop: 8,
  },
});

export default App;