import { getAllData, addAllData } from "../dexie";

export default {
  Query: {
    async getAllCities(){
      try {
        const allCities = await getAllData();

        return allCities;
      } 
      catch (err) {
        throw new Error(err);
      }
    }
  },
  async addAllCities(){
    try {
      await addAllData();
    } 
    catch(err) {
      throw new Error(err);
    }
  }
}