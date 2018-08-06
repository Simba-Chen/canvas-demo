var canvas = document.getElementById('canvas')
var eraser = document.getElementById('eraser')
var pen = document.getElementById('pen')
var red = document.getElementById('red')
var green = document.getElementById('green')
var blue = document.getElementById('blue')
var context = canvas.getContext('2d')

autoSetPageSize()

var using = false
var eraserEnabled = false
var lastPoint = {x: undefined,y: undefined}

if(document.body.ontouchstart !== undefined){
  canvas.ontouchstart = function(message) {
    using = true
    var x = message.touches[0].clientX
    var y = message.touches[0].clientY
    if(eraserEnabled){
      context.clearRect(x-5,y-5,10,10)
    }else{
      lastPoint.x = x
      lastPoint.y = y 
    }
  } 
  canvas.ontouchmove = function(message) {
    var x = message.touches[0].clientX
    var y = message.touches[0].clientY
    var newPoint = {x: x,y: y}
    if(!using){return}
    if(eraserEnabled){
      context.clearRect(x-5,y-5,10,10)
    }else{
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
    }
  }
  canvas.ontouchend = function() {
    using = false
  }
}else{
  canvas.onmousedown = function(message) {
    using = true
    var x = message.clientX
    var y = message.clientY
    if(eraserEnabled){
      context.clearRect(x-5,y-5,10,10)
    }else{
      lastPoint.x = x
      lastPoint.y = y 
    }
  }
  canvas.onmousemove = function(message) {
    var x = message.clientX
    var y = message.clientY
    var newPoint = {x: x,y: y}
    if(!using){return}
    if(eraserEnabled){
      context.clearRect(x-5,y-5,10,10)
    }else{
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
    }
  }
  canvas.onmouseup = function() {
    using = false
  }
}



eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
black.onclick = function(){
  context.strokeStyle = 'black'  /*注意不在drawLine内部将context.strokeStyle写死*/
  black.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  yellow.classList.remove('active')
  red.classList.remove('active')
}
red.onclick = function(){
  context.strokeStyle = 'red'  /*注意不在drawLine内部将context.strokeStyle写死*/
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
  yellow.classList.remove('active')
}
green.onclick = function(){
  context.strokeStyle = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
  yellow.classList.remove('active')  
}
blue.onclick = function(){
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  green.classList.remove('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
  black.classList.remove('active')
}
yellow.onclick = function(){
  context.strokeStyle = 'yellow'
  yellow.classList.add('active')
  green.classList.remove('active')
  red.classList.remove('active')
  black.classList.remove('active')
  blue.classList.remove('active')
}

function setPageSize(){
  var pageHeight = document.documentElement.clientHeight
  var pageWidth = document.documentElement.clientWidth
  canvas.height = pageHeight
  canvas.width = pageWidth  
}
function autoSetPageSize(){
    setPageSize()
  window.onresize = function(){
    setPageSize()
  }
}
var drawLine = function(x1,y1,x2,y2){
  context.beginPath()
  context.moveTo(x1,y1) //起点
  context.lineTo(x2,y2) //终点
  context.lineWidth = 4
  context.stroke()  
  context.closePath()
}

