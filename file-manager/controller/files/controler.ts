import { urlFileRouter } from './router'
import {
    changeFileContent,
    checkFile,
    createFile,
    findFileContent,
    removeFile,
    renameFile,
} from './model'
import { validationResult } from 'express-validator'

export const check = async (req, res) => {
    try {
        const path = req.url.replace(`/check/${urlFileRouter}/`, '')
        const result = await checkFile(path.split('/'))
        return res.json(result)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
export const find = async (req, res) => {
    try {
        const path = req.url.replace(`/${urlFileRouter}/`, '')
        const result = await findFileContent(path.split('/'))
        return res.json(result)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
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
        const path = req.url.replace(`/${urlFileRouter}/`, '')
        const isLife = await checkFile(path.split('/'))
        if (isLife) {
            return res.status(409).json({ message: 'Файл уже создан' })
        }
        const result = await createFile(path.split('/'))
        return res.json(result)
    } catch (e) {
        console.log(e)
        res.status(501).json({ message: 'Файл не создан', erors: e })
    }
}
export const change = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: 'Даные не коректны', errors: errors })
        }
        const path = req.url.replace(`/${urlFileRouter}/`, '')
        const { content } = req.body
        const isLife = await checkFile(path.split('/'))
        if (!isLife) {
            return res.status(409).json({ message: 'Файл не найден' })
        }

        const result = await changeFileContent(path.split('/'), content)
        return res.json(result)
    } catch (e) {
        console.log(e)
        res.status(501).json({ message: 'Файл не создан', erors: e })
    }
}
export const rename = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: 'Файл не создан', errors: errors })
        }
        const path = req.url.replace(`/rename/${urlFileRouter}/`, '')
        const { name } = req.body
        const dir = path.split('/')
        dir.pop()
        const isLife = await checkFile([...dir, name])
        if (isLife) {
            return res.status(409).json({ message: 'Файл уже создан' })
        }
        const result = await renameFile(path.split('/'), [...dir, name])
        return res.json(result)
    } catch (e) {
        console.log(e)
        res.status(501).json({ message: 'Файл не создан', erors: e })
    }
}
export const remove = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: 'Файл не создан', errors: errors })
        }
        const path = req.url.replace(`/${urlFileRouter}/`, '')
        const result = await removeFile(path.split('/'))
        return res.json(result)
    } catch (e) {
        console.log(e)
        res.status(501).json({ message: 'Файл не создан', erors: e })
    }
}
