import axios from 'axios';
import { Person } from '../Models/person';
import { API_URL } from '../Models/enpoints.model';

export const api = {
  async createPerson(data: Omit<Person, 'id' | 'created_at'>) {
    const response = await axios.post(`${API_URL.baseURL}/persons`, data);
    return response.data;
  },

  async getPersons() {
    const response = await axios.get<any>(`${API_URL.baseURL}/persons`);
    //console.log(response.data.data);
    return response.data.data;
  },

  async getPerson(id: number) {
    const response = await axios.get<Person>(`${API_URL.baseURL}/persons/${id}`);
    return response.data;
  }
};