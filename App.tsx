//  Redux and friends
import { Provider } from "react-redux";
import { persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./Redux/store";
import { RootSiblingParent } from "react-native-root-siblings";

// Fonts
import { useFonts } from "expo-font";
import { fonts } from "./fonts";


// Main app
import Navigation from "./Navigation";
import Toast from 'react-native-toast-message';

// RTL
import { I18nManager } from "react-native";



const AppWrapper = () => {
  // RTL
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  // Load fonts
  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootSiblingParent>
          <Navigation />
          <Toast />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};
export default AppWrapper;
