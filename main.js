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
}
pen.onclick = function(){
  eraserEnabled = false
}
red.onclick = function(){
  drawLine.context.strokeStyle = 'red'
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
  context.strokeStyle = 'black'
  context.stroke()  
  context.closePath()
}

