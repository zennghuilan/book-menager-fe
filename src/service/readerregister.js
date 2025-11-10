import axios from "axios";

const readerregisterservice = async(readername,email,code,password) => {
  try{
    const response = await axios.value(
      {
        readername:readername,
        email:email,
        code:code,
        password:password
      },
      {

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

export default readerregisterservice;
