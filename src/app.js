const http = require('http')
const Koa = require('koa')

const app = new Koa()
const server = http.createServer(app.callback()).listen(8088, () => {
  console.log('[Server] running on port 8088')
})

const io = require('socket.io')(server)
let users = []

io.on('connection', socket => {
  console.log(`[User] connected`)
  socket.on('save', data => {
    io.emit('save', data)
  })
  socket.on('user_join', data => {
    users = users.concat(data)
    io.emit('user_join', { users })
  })
  socket.on('disconnect', (reason) => {
    users = users.filter(v => v.id !== socket.id)
    io.emit('user_quit', { users })
    console.log(`[User] disconnected: ${reason}`)
  });
})
