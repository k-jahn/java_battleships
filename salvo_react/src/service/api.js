// import axios from 'axios';

const apiUrl = "http://localhost:8080/api"

class ApiService {

  async getLeaderBoard() {
    const url = `${apiUrl}/leaderboard`
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
      },
      credentials: 'include'
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
      },
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`API response error, HTTP status ${response.status}`);
    }
    return await response.json();
  }

  async postLogin(username, password) {
    const loginUrl = `${apiUrl}/login`
    const userUrl = `${apiUrl}/user`
    const postData = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'cors',
      credentials: 'include',
      body: postData
    })
    if (await response.ok) {
      const user = await fetch(userUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        },
        credentials: 'include'
      });
      return await user.json()
    } else {
      return false
    }
  }

  async postLogout() {
    const url =  `${apiUrl}/logout`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'cors',
      credentials: 'include',
    })
    if (response.ok) {
      return true
    } else {
      return false
    }
  }
  
}

export default new ApiService();