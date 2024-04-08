import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-gesture-handler';
// import { Amplify } from "aws-amplify";
// import config from './src/aws-exports'
import Navigation from "./src/navigation";
import FeedGridView from "./src/components/FeedGridView";
// import amplifyconfig from './src/amplifyconfiguration.json';

// Amplify.configure(amplifyconfig)

{
  /* <StatusBar style="auto" /> */
}

const App = () => {
  return (
   <SafeAreaProvider>
    <Navigation />
   </SafeAreaProvider>
  );
};


export default App;
