# FIle manager

## Stac
- express
- ts
- eslint
- prettier
- babel

## comands 
```json
    "prettier": "prettier --write \"**/*.ts\"",
    "prettier:check": "prettier --check \"**/*.ts\"",
    "lint": "eslint --ignore-path .eslintignore \"**/*.ts\" --fix",
    "lint:check": "eslint --ignore-path .eslintignore \"**/*.ts\"",
    "build": "babel ./** --out-dir dist --extensions .ts --source-maps",
    "build:types": "tsc",
    "start": "node ./dist/app.js",
    "dev": "npx ts-node app.ts"
```

## Api

/\* путь до фала или папки

### /files/**/\*.md
#### Get
возращает контент файла 

#### POST
создает файл

#### PUT
меняет контент файла

**body** content string 

#### DELETE
уаляет файла

### check/files/**/\*.md
#### Get
проверяет существования файла true/false

### rename/files/**/\*.md
#### PUT
меняет название файла

**body** name string 

### /folders/**/\*
#### Get *(/*)*
возращает файлы папки

#### POST
создает папку 

#### DELETE
уаляет папку и все файлы в ней

### check/folders/**/\*
#### Get
проверяет существования папки true/false

### rename/folders/**/\*
#### PUT
меняет название папки

**body** name string 