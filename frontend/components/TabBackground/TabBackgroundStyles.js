import { StyleSheet } from 'react-native';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../styles/genericDimensions';

export const styles = StyleSheet.create({
  backgroundCard: {
    height: '100%',
    width: '100%',
    backgroundColor: '#5A5DF0',
    justifyContent: 'flex-end',
  },

  foregroundCard: {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: '85%',
    width: '100%',
    borderTopEndRadius: moderateScale(25),
    borderTopStartRadius: moderateScale(25),
  },

  tabWrapper: {
    flexDirection: 'row',
    height: verticalScale(80),
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(45),
    paddingBottom: verticalScale(20),
  },

  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(45),
  },

  tabLeftUnderline: {
    height: verticalScale(5),
    width: verticalScale(110),
    borderRadius: moderateScale(100),
  },

  tabRightUnderline: {
    height: verticalScale(5),
    width: verticalScale(110),
    borderRadius: moderateScale(100),
  },

  tabLeftText: {
    fontFamily: 'BalooBold',
    fontSize: moderateScale(35),
    color: 'white',
  },

  tabRightText: {
    fontFamily: 'BalooBold',
    fontSize: moderateScale(35),
    color: 'white',
  },
});
