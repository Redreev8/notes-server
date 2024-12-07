import fs from 'fs/promises'
import p from 'path'
import dirname from '../dirname'

const createFolderStore = async () => {
    try {
        await fs.access(p.join(dirname, 'store'))
    } catch (_) {
        await fs.mkdir(p.join(dirname, 'store'), {
            recursive: true,
        })
    }
}

export default createFolderStore
