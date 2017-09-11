var Peer = require('simple-peer')
var p = new Peer({ initiator: location.hash === '#1', trickle: false })

p.on('error', function (err) { console.log('error', err) })

p.on('signal', function (data) {
  console.log('SIGNAL', JSON.stringify(data))
  document.querySelector('#outgoing').textContent = JSON.stringify(data)
  /*var qr = require('qr-image');
  var qr_img = qr.imageSync(window.origin + '?sdp=' + JSON.stringify(data), { type: 'png' });
  var img = document.createElement('img');
  img.src='data:image/png;base64,' + qr_img.toString('base64')
  document.querySelector('form').appendChild(img);*/
  //console.log('qr code', qr_svg);
})

document.querySelector('form').addEventListener('submit', function (ev) {
  ev.preventDefault()
  p.signal(JSON.parse(document.querySelector('#incoming').value))
})

function setConnected() {
  console.log(p);
  var chat = document.querySelector('#chat');

  ['#outgoing','form'].map(function(name) {
    return document.querySelector(name).style.display='none'
  })
  chat.querySelector('button').addEventListener('click', function (ev) {
    var elmsg = chat.querySelector('#message input');
    p.write(elmsg.value);
    append(elmsg.value, 'local');
    elmsg.value = ''
  })
  
  chat.style.display='block'
}

p.on('connect', function () {
  console.log('CONNECT')
  setConnected()
})

function append(data, className) {
  var child = document.createElement('div');
  child.className = className || 'remote'
  child.innerHTML = '> ' + data;
  document.querySelector('#history').appendChild(child)
}

p.on('data', append)