import { urlFolderRouter } from './router'
import {
    checkFolder,
    createFolder,
    findFolderContent,
    removeFolder,
    renameFolder,
} from './model'
import { validationResult } from 'express-validator'

export const check = async (req, res) => {
    try {
        console.log(true)

        const path = req.url.replace(`/check/${urlFolderRouter}`, '')
        const result = await checkFolder(path.split('/'))
        return res.json(result)
    } catch (e) {
        console.log(e)
        res.status(404).json(e)
    }
}
export const find = async (req, res) => {
    try {
        const path = req.url.replace(`/${urlFolderRouter}`, '')
        const result = await findFolderContent(path.split('/'))
        return res.json(
            result
                .map((el) => {
                    const ext = el.match(/\.\w+$/g)
                    if (ext) {
                        return {
                            type: 'file',
                            name: el.replace(/\.\w+$/g, ''),
                            ext: ext[0].replace('.', ''),
                        }
                    }
                    return {
                        type: 'folder',
                        name: el,
                    }
                })
                .sort((a) => (a.type === 'folder' ? -1 : 1)),
        )
    } catch (e) {
        console.log(e)
        res.status(404).json(e)
    }
}
export const create = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: 'Имя не коректно', errors: errors })
        }
        const path = req.url.replace(`/${urlFolderRouter}`, '')
        const isLife = await checkFolder(path.split('/'))
        if (isLife) {
            return res.status(409).json({ message: 'Папка уже создана' })
        }
        const result = await createFolder(path.split('/'))
        return res.json(result)
    } catch (e) {
        console.log(e)
        res.status(404).json(e)
    }
}
export const rename = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: 'Папка не создан', errors: errors })
        }
        const path = req.url.replace(`/rename/${urlFolderRouter}`, '')
        const { name } = req.body
        const dir = path.split('/')
        dir.pop()
        const isLife = await checkFolder([...dir, name])
        if (isLife) {
            return res.status(409).json({ message: 'Папка уже создана' })
        }
        const result = await renameFolder(path.split('/'), [...dir, name])
        return res.json(result)
    } catch (e) {
        console.log(e)
        res.status(404).json(e)
    }
}
export const remove = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: 'Папка не создана', errors: errors })
        }
        const path = req.url.replace(`/${urlFolderRouter}`, '')
        const result = await removeFolder(path.split('/'))
        return res.json(result)
    } catch (e) {
        console.log(e)
        res.status(404).json(e)
    }
}
