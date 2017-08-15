import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 500
  },

  summaryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300
  },

  logoutButton: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },

  debtContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },

  listContainer: {
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#D7D7D7'
  },

  personContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  toTakeValue: {
    color: '#9E0E15'
  },

  toGiveValue: {
    color: '#17840C'
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 10
  },

  popupButton: {
    flex: 1,
    margin: 5,
    width: 40,
    borderRadius: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
