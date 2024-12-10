const checkUrlNameFile = async (req, res, next) => {
    if (!req.url.match(/^[a-z\/0-9_-]+\.md+$/)) {
        return res.status(400).json({ message: 'не коректный путь' })
    }
    if (req.body.name && !req.body.name.match(/^[a-z0-9_-]+\.md+$/)) {
        return res.status(400).json({ message: 'не кореткное новое имя' })
    }

    next()
}

export default checkUrlNameFile
