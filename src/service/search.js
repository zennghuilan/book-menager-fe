import axios from "axios"

const search = async (searchValue, token) => {
  try {
    const response = await axios.post(
      "127.0.0.1:8080/api/books/search",
      {
        searchValue: searchValue
      },
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

export default search;
