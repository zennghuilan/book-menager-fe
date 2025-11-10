import axios from "axios"

const librarianRegisterService = async (librarianname,email, code,token) => {//async异步函数，
  try {
    const response = await axios.post(
      "/api/auth/librarian_register/",//找后端发请求
      {
        librarianname:librarianname,
        email:email,
        code:code
      },
      {
        headers : {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  }
  catch (e) {
    console.log(`发生异常${e}`)
    return null;
  }
}

export default librarianRegisterService;
