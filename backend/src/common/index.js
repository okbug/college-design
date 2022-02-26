const genUserId = () => {
    const date = Date.now().toString()
    const str = Math.floor(Math.random() * 10000000)
                    .toString()
                    .split('')
                    .map(i => String.fromCharCode(97 + ~~i))
                    .join('')

    return date + str;
}


module.exports = {
    genUserId
}