import axios from "axios"

const readerlogin = async (readerid,password) => {//用这个异步函数来接收搜索值和 token 作为参数。
  try {
    const response = await axios.post(
      "",//后端的接口
      {
        readerid:readerid,
        password:password
        //前面这个是字段的名称 后面是变量的值
      },
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

export default readerlogin;
