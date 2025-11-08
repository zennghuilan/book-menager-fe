import axios from "axios"

const getUserInfo = async (token) => {
  try {
    const response = await axios.get( // 修改为 GET 请求
      " ", // 修改接口路径
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      return response.data; // 直接返回数据
    }
  }
  catch (e) {
    console.log(`发生异常: ${e}`)
    return null;
  }
}

export default getUserInfo;
