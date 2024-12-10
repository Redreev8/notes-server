import { Request, Response, NextFunction } from 'express'
import checkTokenUser from '../api/users/check-token-user'

const checkAuthToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const isToken = await checkTokenUser(req.get('auth-token'))
        if (isToken.data) {
            next()
            return
        }
        res.status(400).json({ message: 'Ошибка токена' })
    } catch (e) {
        console.log(e);
        
        res.status(400).json({ message: 'Ошибка токена' })
    }
}

export default checkAuthToken
