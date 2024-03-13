import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './TabBackgroundStyles';

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

  const childrenArray = React.Children.toArray(children);

  const isActive = (tabNumber: number) => activeTab === tabNumber;

  return (
    <View style={styles.backgroundCard}>
      <View style={styles.tabWrapper}>
        {[firstTab, secondTab].map((tabname, index) => (
          <Pressable key={tabname} onPress={() => setActiveTab(index + 1)}>
            <View style={styles.tabContainer}>
              <Text
                style={{
                  ...styles.tabText,
                  opacity: isActive(index + 1) ? 1 : 0.5,
                }}
              >
                {tabname}
              </Text>
              <View
                style={{
                  ...styles.tabUnderline,
                  backgroundColor: isActive(index + 1)
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.5)',
                }}
              />
            </View>
          </Pressable>
        ))}
      </View>
      <View style={styles.foregroundCard}>{childrenArray[activeTab - 1]}</View>
    </View>
  );
}
