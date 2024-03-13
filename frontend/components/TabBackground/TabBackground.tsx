import { View, Text, Pressable } from 'react-native';
import { styles } from './TabBackgroundStyles';
import { useState } from 'react';
import React from 'react';

interface TabBackgroundProps {
  firstTab: string;
  secondTab: string;
  children: React.ReactNode;
}

export function TabBackground({
  firstTab,
  secondTab,
  children,
}: TabBackgroundProps) {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [leftTabTextStyles, setLeftTabTextStyles] = useState({
    ...styles.tabLeftText,
    opacity: 1,
  });

  const childrenArray = React.Children.toArray(children);

  const [leftTabUnderlineStyles, setLeftTabUnderlineStyles] = useState({
    ...styles.tabLeftUnderline,
    backgroundColor: 'white',
  });
  const [rightTabTextStyles, setRightTabTextStyles] = useState({
    ...styles.tabRightText,
    opacity: 0.5,
  });
  const [rightTabUnderlineStyles, setRightTabUnderlineStyles] = useState({
    ...styles.tabRightUnderline,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  });

  const toggleTabStyles = (activeTab: number) => {
    setActiveTab(activeTab);

    if (activeTab === 1) {
      setLeftTabTextStyles({ ...styles.tabLeftText, opacity: 1 });
      setLeftTabUnderlineStyles({
        ...styles.tabLeftUnderline,
        backgroundColor: 'white',
      });
      setRightTabTextStyles({ ...styles.tabRightText, opacity: 0.5 });
      setRightTabUnderlineStyles({
        ...styles.tabRightUnderline,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      });
    } else {
      setRightTabTextStyles({ ...styles.tabRightText, opacity: 1 });
      setRightTabUnderlineStyles({
        ...styles.tabRightUnderline,
        backgroundColor: 'white',
      });
      setLeftTabTextStyles({ ...styles.tabRightText, opacity: 0.5 });
      setLeftTabUnderlineStyles({
        ...styles.tabRightUnderline,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      });
    }
  };

  return (
    <View style={styles.backgroundCard}>
      <View style={styles.tabWrapper}>
        <Pressable onPress={() => toggleTabStyles(1)}>
          <View style={styles.tabContainer}>
            <Text style={leftTabTextStyles}>{firstTab}</Text>
            <View style={leftTabUnderlineStyles} />
          </View>
        </Pressable>
        <Pressable onPress={() => toggleTabStyles(2)}>
          <View style={styles.tabContainer}>
            <Text style={rightTabTextStyles}>{secondTab}</Text>
            <View style={rightTabUnderlineStyles} />
          </View>
        </Pressable>
      </View>

      <View style={styles.foregroundCard}>
        {activeTab === 1 ? childrenArray[0] : childrenArray[1]}
      </View>
    </View>
  );
}
