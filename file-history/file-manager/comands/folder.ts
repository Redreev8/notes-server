import { ObjectEncodingOptions } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import File from './file'

const dataContent = () => ({
    type: 'folder',
    files: {}
})

interface FolderProps {
    dir: string[]
}

class Folder {
    _dataContentFile
    dir: FolderProps['dir']
    constructor({ dir }: FolderProps) {
        this.dir = dir
    }
    getFolder = async (dir: string[], options: ObjectEncodingOptions = {}) => {
        return await fs.readFile(path.join(...dir, '_data.json'), {
            encoding: 'utf8',
            ...options
        })
    } 
    createFolder = async (dir: string[], options: ObjectEncodingOptions = {}) => {
        try {
            fs.access(path.join(...dir))
            this._dataContentFile = this.getFolder(dir)
        } catch (_) {
            await fs.mkdir(path.join(...dir), {
                recursive: true,
                ...options
            })
            
            
        }
    }
    removeFolder = async (dir: string[], options: ObjectEncodingOptions = {}) => {
        await fs.rm((path.join(...dir)), {
            recursive: true,
            force: true,
            ...options
        })
    }
    get dataContentFile() {
        return this._dataContentFile
    }
    set dataContentFile(data) {
        new Promise(() => {
            fs.writeFile(path.join(path.join(...this.dir), '_data.json'), JSON.stringify(dataContent()), {
                encoding: 'utf8',
                flag: 'w',
            })
            this._dataContentFile = data
        })
    }
}

export default Folder