import axios from "axios"

const search_books  = async (search_bookValue, token) => {//用这个异步函数来接收搜索值和 token 作为参数。
  try {
    const query = new URLSearchParams({//
      q:search_bookValue,
    })
    const url = `${import.meta.env.VITE_SERVER_URL}/api/user/search_books/?${query.toString()}`;
    // get无请求体
    const response = await axios.get(
      url,//后端的接口
      {
        headers : {//请求头
          Authorization: `Bearer ${token}`//认证的信息，也就是授权 从后端拿到密钥
        },
        withCredentials: true   // 带上cookies，用于csrf认证
      }
    );

    if (response.status === 200) {
      return response.data.details;
    }
  }
  catch (e) {
    console.log(`发生异常: ${e}`)
    return null;
  }
}

export default search_books;
