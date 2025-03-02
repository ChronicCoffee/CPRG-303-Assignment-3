import axios from 'axios';

const API_KEY = 'b41ece0516msh99438873843a867p19e51ejsn03168aefdb98';
const API_HOST = 'numbersapi.p.rapidapi.com';

export const getDateFact = async (month: number, day: number) => {
  try {
    const response = await axios.get(`https://${API_HOST}/${month}/${day}/date`, {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching date fact:', error);
    return null;
  }
};