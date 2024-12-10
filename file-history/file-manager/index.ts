import fs from 'fs/promises'
import path from "path"
import Folder from './comands/folder'
import File from './comands/file'
import dirname from '../dirname'

interface FileManagerProps {
    dir: string[]
}

const _dataContent = {

}

class FileManager extends Folder {
    constructor({ dir }: FileManagerProps) {
        super({ dir })
    }
}

const data = new FileManager({
    dir: [dirname, 'store']
})