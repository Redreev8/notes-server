import fs from 'fs/promises'
import p from 'path'
import dirname from '../../dirname'

export const checkFolder = async (path: string[]) => {
    try {
        await fs.access(p.join(dirname, 'store', ...path))
        return true
    } catch (_) {
        return false
    }
}

export const findFolderContent = async (path: string[]) => {
    return await fs.readdir(p.join(dirname, 'store', ...path))
}

export const renameFolder = async (path: string[], newPath: string[]) => {
    await fs.rename(
        p.join(dirname, 'store', ...path),
        p.join(dirname, 'store', ...newPath),
    )
    return
}

export const createFolder = async (path: string[]) => {
    await fs.mkdir(p.join(dirname, 'store', ...path), {
        recursive: true,
    })
    return
}

export const removeFolder = async (path: string[]) => {
    await fs.rm(p.join(dirname, 'store', ...path), {
        recursive: true,
        force: true,
    })
    return
}
