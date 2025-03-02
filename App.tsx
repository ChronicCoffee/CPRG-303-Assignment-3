import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
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
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>📅 Date Fact Finder</Text>

        <Picker
          selectedValue={month}
          style={styles.picker}
          dropdownIconColor="#007AFF"
          onValueChange={(itemValue) => {
            setMonth(itemValue);
            handleDateChange(itemValue, day);
          }}>
          <Picker.Item label="Select Month" value="" />
          {[
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
          ].map((month, index) => (
            <Picker.Item key={index} label={month} value={(index + 1).toString()} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Enter Day (1-31)"
          keyboardType="numeric"
          maxLength={2}
          value={day}
          onChangeText={(text) => {
            setDay(text);
            handleDateChange(month, text);
          }}
        />

        {fact ? <Text style={styles.fact}>{fact}</Text> : null}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#007AFF',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    height: 45,
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  fact: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
});

export default App;
