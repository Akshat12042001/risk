import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import {getStore, getPersistor} from './src/redux/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {CustomToast, StyledText} from './src/components/atoms';
import i18n from './src/translations';
import ToastManager from 'toastify-react-native';

// translations
const ii8 = i18n;


const toastConfig = {
  customSuccess: ({text1, text2, hide}) => (
    <CustomToast text1={text1} text2={text2} hide={hide} variant="success" />
  ),
  customError: ({text1, text2, hide}) => (
    <CustomToast text1={text1} text2={text2} hide={hide} variant="error" />
  ),
};

const App = () => {
  const store = getStore();
  const persistor = getPersistor();

  const onBeforeLift = () => {
    //Do some stuff that when redux has initialized
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={<StyledText>Loading...</StyledText>}
          persistor={persistor}
          onBeforeLift={onBeforeLift}>
             <ToastManager
            useModal={true}
              animationStyle="fade"
              showCloseIcon={false}
              config={toastConfig}
              duration={2000}
            />
          <AppNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
