import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDateFact } from './api';

const App = () => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [fact, setFact] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateChange = async (selectedMonth: string, selectedDay: string) => {
    if (selectedMonth && selectedDay) {
      const factResponse = await getDateFact(parseInt(selectedMonth), parseInt(selectedDay));
      if (factResponse) {
        setFact(factResponse);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📅 Date Fact Finder</Text>

      {/* Month Picker - iOS uses Modal */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Month:</Text>
        {Platform.OS === 'ios' ? (
          <>
            <TouchableOpacity
              style={styles.iosPickerButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.iosPickerText}>
                {month ? `Month: ${month}` : 'Select Month'}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent
              animationType="slide"
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Picker
                    selectedValue={month}
                    onValueChange={(itemValue) => {
                      setMonth(itemValue);
                      setModalVisible(false);
                      handleDateChange(itemValue, day);
                    }}
                  >
                    <Picker.Item label="Select Month" value="" />
                    {[
                      'January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'
                    ].map((monthName, index) => (
                      <Picker.Item key={index} label={monthName} value={(index + 1).toString()} />
                    ))}
                  </Picker>
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <Picker
            selectedValue={month}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setMonth(itemValue);
              handleDateChange(itemValue, day);
            }}
          >
            <Picker.Item label="Select Month" value="" />
            {[
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ].map((monthName, index) => (
              <Picker.Item key={index} label={monthName} value={(index + 1).toString()} />
            ))}
          </Picker>
        )}
      </View>

      {/* Day Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Day:</Text>
        <TextInput
          style={styles.input}
          placeholder="Day (1-31)"
          keyboardType="numeric"
          maxLength={2}
          value={day}
          onChangeText={(text) => {
            setDay(text);
            handleDateChange(month, text);
          }}
        />
      </View>

      {/* Display Fact */}
      {fact ? <Text style={styles.fact}>{fact}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#333',
    textAlign: 'center',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iosPickerButton: {
    paddingVertical: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    alignItems: 'center',
  },
  iosPickerText: {
    fontSize: 18,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  fact: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});

export default App;
