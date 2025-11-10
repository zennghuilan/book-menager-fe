import axios from "axios"

const userprofile = async (token) => {
  try {
    const response = await axios.get(
      "/api/user/profile/", // 修改接口路径
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      return response.data; // 直接返回图书列表数组？？？为什么不说清楚 
    }
  }
  catch (e) {
    console.log(`发生异常: ${e}`)
    return null;
  }
}

export default userprofile;
