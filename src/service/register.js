import axios from "axios"

const UserRegisterService = async (registerValue, token) => {//async异步函数，
  try {
    const response = await axios.post(
      "127.0.0.1:8080/api/books/",//找后端发请求
      registerValue,
      {
        headers : {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      return response.data.details;
    }
  }
  catch (e) {
    console.log(`发生异常${e}`)
    return null;
  }
}

export default UserRegisterService;
