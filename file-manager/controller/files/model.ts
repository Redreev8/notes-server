import fs from 'fs/promises'
import p from 'path'
import dirname from '../../dirname'

export const checkFile = async (path: string[]) => {
    try {
        await fs.access(p.join(dirname, 'store', ...path))
        return true
    } catch (_) {
        return false
    }
}

export const findFileContent = async (path: string[]) => {
    return await fs.readFile(p.join(dirname, 'store', ...path), {
        encoding: 'utf8',
    })
}

export const createFile = async (path: string[]) => {
    return await fs.writeFile(p.join(dirname, 'store', ...path), '', {
        encoding: 'utf8',
        flag: 'w',
    })
}

export const renameFile = async (path: string[], newPath: string[]) => {
    return await fs.rename(
        p.join(dirname, 'store', ...path),
        p.join(dirname, 'store', ...newPath),
    )
}

export const changeFileContent = async (path: string[], content: string) => {
    return await fs.writeFile(p.join(dirname, 'store', ...path), content, {
        encoding: 'utf8',
        flag: 'w',
    })
}

export const removeFile = async (path: string[]) => {
    return await fs.unlink(p.join(dirname, 'store', ...path))
}
