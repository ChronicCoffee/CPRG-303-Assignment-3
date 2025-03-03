import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDateFact } from './api';

const App = () => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [fact, setFact] = useState('');

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

      {/* Month Picker */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Month:</Text>
        <Picker
          selectedValue={month}
          style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}
          itemStyle={Platform.OS === 'ios' ? styles.pickerItemIOS : null}
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
    backgroundColor: '#f5f5f5', 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerIOS: {
    height: 150,
  },
  pickerItemIOS: {
    fontSize: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  fact: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default App;
