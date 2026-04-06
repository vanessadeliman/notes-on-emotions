import React from 'react';
import AnotacaoForm from './componentes/anotacao-form';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './pages/home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();

function App() {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="home"
              component={Home}
              options={{
                title: 'Minhas Anotações',

              }} />
            <Stack.Screen
              name="form"
              component={AnotacaoForm}
              options={{ title: 'Nova Anotação' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

