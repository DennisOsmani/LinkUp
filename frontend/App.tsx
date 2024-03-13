import { TabBackground } from './components/TabBackground/TabBackground';
import * as Font from 'expo-font';
import { useEffect } from 'react';
import TabOne from './components/TabBackground/Components/TabOne';
import TabTwo from './components/TabBackground/Components/TabTwo';

export default function App() {
  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      BalooBold: require('./assets/fonts/Baloo2-Bold.ttf'),
      BalooRegular: require('./assets/fonts/Baloo2-Regular.ttf'),
    });
  };

  return (
    <TabBackground firstTab='Public' secondTab='Friends'>
      <TabOne />
      <TabTwo />
    </TabBackground>
  );
}
