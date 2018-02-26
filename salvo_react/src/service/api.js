// import axios from 'axios';

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



  async getGames() {
    const url = `${apiUrl}/games`
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

  async getGameView(id) {
    const url = `${apiUrl}/game_view/${id}`
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




}

export default new ApiService();