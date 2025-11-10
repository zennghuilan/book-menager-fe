import axios from "axios"

const librarianlogin = async (librarian_id, password) => {
    try {
        const response = await axios.post(
            "/api/auth/librarian_login/", // 后端的接口
            {
                librarian_id: librarian_id,
                password: password
            },
        );
        if (response.status === 200) {
            return response.data.details;
        }
    } catch (e) {
        console.log(`发生异常: ${e}`)
        return null;
    }
}

export default librarianlogin;
