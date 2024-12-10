import { ObjectEncodingOptions } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import Folder from './folder'
import transliterateRu from '../../helper/transliterate-ru'

const fileData = (name: string, ...props) => ({
    type: 'file',
    name,
    ...props
})

class File extends Folder {
    getContent = async (dir: string[], options: ObjectEncodingOptions = {}) => {
        return await fs.readFile(path.join(...dir), {
            encoding: 'utf8',
            ...options
        })
    }
    createFile = async (dir: string[], data: any, options: ObjectEncodingOptions = {}, ...props) => {
        const nameFile = dir[dir.length - 1]
        this.dataContentFile.files[transliterateRu(nameFile)] = fileData(nameFile, ...props)
        await fs.writeFile(path.join(...dir), data, {
            encoding: 'utf8',
            flag: 'w',
            ...options
        })
    }
}

export default File