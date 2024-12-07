import { Router } from 'express'
import { rename, create, find, remove, check } from './controler'
import { body } from 'express-validator'
import checkUrlNameFile from './middleware/check-url-name-folder'
import checkAuthToken from '../../middleware/check-auth-token'

const router = Router()
export const urlFolderRouter = 'folders'

router.get(
    `/check/${urlFolderRouter}/*`,
    [checkUrlNameFile, checkAuthToken],
    check,
)
router.get(`/${urlFolderRouter}(/*)?`, [checkUrlNameFile, checkAuthToken], find)
router.post(`/${urlFolderRouter}/*`, [checkUrlNameFile, checkAuthToken], create)
router.put(
    `/rename/${urlFolderRouter}/*`,
    [
        body('name', '').isString().isLength({ min: 2, max: 255 }),
        checkUrlNameFile,
        checkAuthToken,
    ],
    rename,
)
router.delete(
    `/${urlFolderRouter}/*`,
    [checkUrlNameFile, checkAuthToken],
    remove,
)

export default router
