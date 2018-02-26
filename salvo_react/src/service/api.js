import axios from 'axios';

const apiUrl = "http://localhost:8080/api"

class ApiService {
  
  async getLeaderBoard() {
    const url =  `${apiUrl}/leaderboard`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`API response error, HTTP status ${response.status}`);
    }
    return await response.json();
  }



  // dev
  async getActiveGamesFromServer() {

    return [1]

  }

}

export default new ApiService();