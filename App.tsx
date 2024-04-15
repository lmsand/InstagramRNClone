import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import Navigation from './src/navigation';
import {withAuthenticator, ThemeProvider} from '@aws-amplify/ui-react-native';
import {Amplify} from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
import colors from './src/theme/colors';
import Client from './src/apollo/Client';

// Amplify.configure(amplifyconfig)

{
  /* <StatusBar style="auto" /> */
}



const App = () => {
  return (
      <SafeAreaProvider>
        <Client>
          <Navigation />
        </Client>
      </SafeAreaProvider>
  );
};

export default withAuthenticator(App);
// export default App;
