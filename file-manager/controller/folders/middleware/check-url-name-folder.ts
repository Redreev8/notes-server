const checkUrlNameFolder = async (req, res, next) => {
    req.url = decodeURIComponent(req.url)

    if (!req.url.match(/^[A-zА-я\/0-9_-]*$/)) {
        return res.status(400).json({ message: 'не коректный путь' })
    }
    if (req.body.name && !req.body.name.match(/^[A-zА-я\/0-9_-]*$/)) {
        return res.status(400).json({ message: 'не кореткное новое имя' })
    }

    next()
}

export default checkUrlNameFolder
