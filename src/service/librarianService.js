// service/librarianService.js
import axios from "axios"

//冻结用户
export const freezeUser = async (readerId, token) => {
  try {
    const response = await axios.post(
      "/api/librarian/freeze_user/",
      {
        reader_id: readerId
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
    console.log(`冻结用户发生异常: ${e}`);
    throw e;
  }
}

//增加图书
export const addBook = async (title, author, locationIndex, token) => {
  try {
    const response = await axios.post(
      "/api/librarian/add_book/",
      {
        title: title,
        author: author,
        location_index: locationIndex
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
    console.log(`添加图书发生异常: ${e}`);
    throw e;
  }
}

//删除图书
export const deleteBook = async (title,token) => {
  try {
    const response = await axios.post(
      "/api/librarian/add_book/",
      {
        title: title,
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
    console.log(`删除图书发生异常: ${e}`);
    throw e;
  }
}

//获取图书管理员的申请列表
export const getApplications = async (token) => {
  try {
    const response = await axios.get(
      "/api/librarian/applications/",
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
    console.log(`获取申请列表发生异常: ${e}`);
    throw e;
  }
}

//同意申请
export const approveApplication = async (applicationId, token) => {
  try {
    const response = await axios.post(
      "/api/librarian/approve_application/",
      {
        application_id: applicationId
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
    console.log(`批准申请发生异常: ${e}`);
    throw e;
  }
}

//拒绝申请
export const rejectApplication = async (applicationId, token) => {
  try {
    const response = await axios.post(
      "/api/librarian/reject_application/",
      {
        application_id: applicationId
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
    console.log(`拒绝申请发生异常: ${e}`);
    throw e;
  }
}
