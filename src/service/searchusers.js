// service/searchUsers.js
import axios from "axios"

const searchUsers = async (keyword, token) => {
  try {
    const response = await axios.get(
      `/api/librarian/search_users/?q=${encodeURIComponent(keyword)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(`搜索用户发生异常: ${e}`)
    return null;
  }
}

export default searchUsers;
