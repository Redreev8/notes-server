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
import transliterateRu from '../../helper/transliterate-ru'

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
        console.log(transliterateRu(req.url.replace(`/${urlFileRouter}/`, '')));
        
        const pathArr = path.split('/')
        const result = await findFileContent(pathArr)
        return res.json({
            name: pathArr[pathArr.length - 1],
            path,
            content: result
        })
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
        const pathArr = path.split('/')
        const isLife = await checkFile(pathArr)
        if (isLife) {
            return res.status(409).json({ message: 'Файл уже создан' })
        }
        const result = await createFile(path.split('/'))
        return res.json({
            name: pathArr[pathArr.length - 1],
            path,
            content: result
        })
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
        const pathArr = path.split('/')
        const { content } = req.body
        const isLife = await checkFile(pathArr)
        if (!isLife) {
            return res.status(409).json({ message: 'Файл не найден' })
        }
        const result = await changeFileContent(pathArr, content)
        return res.json({
            name: pathArr[pathArr.length - 1],
            path,
            content: result
        })
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
        let { name } = req.body
        name = transliterateRu(name)
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
