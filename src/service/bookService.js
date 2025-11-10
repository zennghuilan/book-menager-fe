// 这里是读者
import axios from "axios"

export const borrowBook = async (bookname, token) => {//将该函数导出，供其他模块使用
  try {
    const response = await axios.post(
          "/api/user/borrow_book/",
      {
        book_id: bookname
      },
      {
        headers: {
          'Content-Type': 'application/json',//请求体是 JSON 格式
          'Authorization': `Bearer ${token}`//用户身份验证和授权
        }
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(`借书发生异常: ${e}`);
    throw e; //在组件中处理
  }
}

export const returnBook = async (bookname, token) => {
  try {
      const response = await axios.post(
          "/api/user/return_book/",
      {
        book_id: bookname
      },
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
    console.log(`还书发生异常: ${e}`);
    throw e; //在组件中处理
  }
}
