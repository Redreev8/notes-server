import { Router } from 'express'
import { rename, create, find, remove, check, change } from './controler'
import { body } from 'express-validator'
import checkUrlNameFile from './middleware/chec-url-name-file'
import checkAuthToken from '../../middleware/check-auth-token'

const router = Router()
export const urlFileRouter = 'files'

router.get(
    `/check/${urlFileRouter}/*`,
    [checkUrlNameFile, checkAuthToken],
    check,
)
router.get(`/${urlFileRouter}/*`, [checkUrlNameFile, checkAuthToken], find)
router.post(`/${urlFileRouter}/*`, [checkUrlNameFile, checkAuthToken], create)
router.put(
    `/${urlFileRouter}/*`,
    [body('content', '').isString(), checkUrlNameFile, checkAuthToken],
    change,
)
router.put(
    `/rename/${urlFileRouter}/*`,
    [
        body('name', '').isString().isLength({ min: 2, max: 255 }),
        checkUrlNameFile,
        checkAuthToken,
    ],
    rename,
)
router.delete(`/${urlFileRouter}/*`, [checkUrlNameFile, checkAuthToken], remove)
export default router
