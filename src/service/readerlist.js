// service/readerlist.js
import axios from "axios"

const readerlist = async (token) => {
  try {
    const response = await axios.post(
      "/api/librarian/get_readers/", // 假设这是获取读者列表的接口
      {},
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
    console.log(`发生异常: ${e}`)
    return null;
  }
}

export default readerlist;
