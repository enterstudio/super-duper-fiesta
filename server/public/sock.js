var socket = io.connect('http://localhost:3000')
socket.on('connection', function (data) {
  console.log('connected')
})
socket.on('meeting', function (data) {
  console.log('d', data)
  socket.emit('my other event', { my: 'data' })
  var node = document.createElement('p')
  node.innerHTML = data.title || 'temporary title'
  document.getElementById('log').appendChild(node)
});
