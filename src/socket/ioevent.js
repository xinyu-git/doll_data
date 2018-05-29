const io = require('./weapp.socket.io')


module.exports = {
    socketinit: (app) => {
        let socket = null;
        socket = io('https://io.kong.net/')
        app.globalData.socket1 = socket;

        socket.on("connect", () => {
            console.log('into connect')
            socket.emit('authentication', {
                token: app.globalData.token,
                client: 'wxa'
            });
            socket.on('authenticated', function () {
                console.log("already authenticated")
                socket.emit('join');//发送加入事件
            });


        })
        socket.on('m:userinfo', (d) => {
            let users = app.globalData.chatusers
            console.log(d);
            if (!!users["uid" + d.uid]) {
                users["uid" + d.uid] = {
                    id: d.uid,
                    fullname: d.fullname || '未名' + d.uid,
                    headimg: d.headimg,
                    nickname: d.nickname
                }
                app.globalData.EventBus.dispatch("userchage");
                wx.setStorageSync("card:users", users)
            }
        })
        socket.on('m:msg', (d) => {
            app.globalData.chatusers = app.globalData.chatusers || {}
            let users = app.globalData.chatusers
            if (!users["uid" + d.from]) {
                socket.emit('m:userinfo', { uid: d.from })
                users["uid" + d.from] = {
                    id: d.from,
                    fullname: '',
                    imgurl: ''
                }
            }
            users["uid" + d.from].lasttime = d.msgTime;
            users["uid" + d.from].lastmsg = d
            //chatmsg里面存放1000条消息
            if (app.globalData.chatmsglength > 1000) {
                app.globalData.chatmsg.shift();
                app.globalData.chatmsglength--;
            }
            app.globalData.chatmsg.push(d);
            app.globalData.chatmsglength++;
            app.globalData.EventBus.dispatch("m:msg");
            wx.setStorageSync("card:chatmsg", app.globalData.chatmsg)
        })
    }
}