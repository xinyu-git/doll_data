const io = require('./weapp.socket.io')
let socket = null

module.exports = {
    socketinit: (container) => {
        socket = io(' https://card.kong.net')
        socket.on('msg', d => {
            console.log('received news: ', d)
            container.chatmsg.push(d);
        })
    }, socket, io
}