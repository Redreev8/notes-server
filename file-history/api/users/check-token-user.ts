import axiosUser from "./axios-user"

const checkTokenUser = async (token = ' ', headers = {}, ...props) => {
    const isToken = await axiosUser.get('/check-token', {
        headers: {
            'Content-Type': 'application/json',
            'token': token,
            ...headers
        },
        ...props
    })

    return isToken
}

export default checkTokenUser