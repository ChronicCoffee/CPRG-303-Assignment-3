import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDateFact } from './api';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const App = () => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [fact, setFact] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleDateChange = async (selectedMonth: string, selectedDay: string) => {
    if (selectedMonth && selectedDay) {
      const factResponse = await getDateFact(parseInt(selectedMonth), parseInt(selectedDay));
      if (factResponse) {
        setFact(factResponse);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>📅 Date Fact Finder</Text>

          {/* Month Picker */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Select Month:</Text>
            {Platform.OS === 'ios' ? (
              <>
                <TouchableOpacity
                  style={styles.iosPickerButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.iosPickerText}>
                    {selectedMonth || 'Select Month'}
                  </Text>
                </TouchableOpacity>

                <Modal
                  transparent
                  animationType="fade"
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Picker
                        selectedValue={month}
                        onValueChange={(itemValue) => {
                          const monthIndex = parseInt(itemValue, 10) - 1;
                          setMonth(itemValue);
                          setSelectedMonth(months[monthIndex]);
                        }}
                      >
                        <Picker.Item label="Select Month" value="" />
                        {months.map((monthName, index) => (
                          <Picker.Item key={index} label={monthName} value={(index + 1).toString()} />
                        ))}
                      </Picker>
                      <TouchableOpacity
                        style={styles.okButton}
                        onPress={() => {
                          setModalVisible(false);
                          handleDateChange(month, day);
                        }}
                      >
                        <Text style={styles.okButtonText}>OK</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </>
            ) : (
              <Picker
                selectedValue={month}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  const monthIndex = parseInt(itemValue, 10) - 1;
                  setMonth(itemValue);
                  setSelectedMonth(months[monthIndex]);
                  handleDateChange(itemValue, day);
                }}
              >
                <Picker.Item label="Select Month" value="" />
                {months.map((monthName, index) => (
                  <Picker.Item key={index} label={monthName} value={(index + 1).toString()} />
                ))}
              </Picker>
            )}
          </View>

          {/* Day Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Enter Day:</Text>
            <TextInput
              style={styles.input}
              placeholder="Day (1-31)"
              keyboardType="numeric"
              maxLength={2}
              placeholderTextColor="#B0BEC5"
              value={day}
              onChangeText={(text) => {
                setDay(text);
                handleDateChange(month, text);
              }}
            />
          </View>

          {/* Display Fact */}
          {fact ? <Text style={styles.fact}>{fact}</Text> : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#1E1E1E', 
    width: '100%',
    maxWidth: 400,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', 
    textAlign: 'center',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#B0BEC5', 
  },
  iosPickerButton: {
    paddingVertical: 12,
    backgroundColor: '#333333', 
    borderRadius: 10,
    alignItems: 'center',
  },
  iosPickerText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#FFFFFF', 
  },
  input: {
    height: 45,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#2C2C2C', 
    fontSize: 16,
    color: '#FFFFFF', 
  },
  fact: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#263238', 
    color: '#FFFFFF', 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  okButton: {
    marginTop: 10,
    backgroundColor: '#1976D2',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  okButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default App;
