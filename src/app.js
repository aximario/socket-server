const http = require('http')
const Koa = require('koa')

const app = new Koa()
const server = http.createServer(app.callback()).listen(3000, () => {
  console.log('[Server] running on port 3000')
})

const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log(`[User] connected: ${socket}`)
  socket.on('save', data => {
    console.log(data)
    io.emit('save', data)
  })
  socket.on('disconnect', (reason) => {
    console.log(`[User] disconnected: ${reason}`)
  });
})
