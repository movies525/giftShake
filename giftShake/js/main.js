var info=["冰箱","保溫瓶","電風扇","按摩椅","導入儀","吹風機","飲料一箱","屋馬餐卷X2","Mac","電視"];
var color=[];
var step = 2*Math.PI/10;
var outerR = 150; //輪盤的大小
var interR = 65;//内存空白圓的大小
var beginAngle=50;//旋转起来預設開始旋轉的角度，角度越大初始速度越快
var radio = 0.95;//旋转速度衰減係數,影響轉速
var t = null;
window.onload=function() {
	  for ( var i = 0; i < 10; i++) {
			 color.push(getColor());
			 //呼叫隨機顏色輪盤
	  }
	  var canvas = document.getElementById("canvas");
	  var context = canvas.getContext("2d");
	  context.translate(250,250); //canvas位置
	  createArrow(context); //呼叫箭頭
	  init(context); //呼叫輪盤 
	  document.getElementById("btn").onclick=function(){
			 if(t){
					return false;
			 }
			 var step = beginAngle +Math.random()*10;
			 var angle = 0;
			 //setInerval 每60毫秒跑一次這個function 
			 t = setInterval(function(){
					step *=radio;
					if(step <= 0.1){
						   clearInterval(t);
						   t =null;
						   var pos = Math.ceil(angle / 36);
						   var res = info[10-pos];
						   context.save();
						   context.beginPath();
						   context.font="23px 微軟雅黑";
						   context.fillStyle="	#FF5151";
						   context.textAlign="center";
						   context.textBaseline="middle";
						   context.fillText(res,0,0);
						   context.restore();
					}else{
						   context.clearRect(-250,-250,500,500);
						   angle+=step;
						   if(angle > 360){
								  angle -=360;
						   }
						   context.save();
						   context.beginPath();
						   context.rotate(angle * Math.PI/180);
						   init(context);
						   context.restore();
						   createArrow(context);
					}
			 },60);
	  };
};

//畫箭頭
function createArrow(context){
	  context.save();
	  context.beginPath();
	  context.lineWidth = 5;
	  context.moveTo(155,0);
	  context.lineTo(180,15);
	  context.lineTo(180,5);
	  context.lineTo(250,5);
	  context.lineTo(250,-5);
	  context.lineTo(180,-5);
	  context.lineTo(180,-15);
	  context.closePath();
	  context.fill();
	  context.restore();
}

//畫輪盤
function init(context){
	  for ( var i = 0; i < 10; i++) {
			 context.save();
			 context.beginPath();
			 context.moveTo(0,0);
			 context.fillStyle=color[i];
			 context.arc(0,0,outerR,i*step,(i+1)*step);
			 context.fill();
			 context.restore();
	  }
	 
	  context.save();
	  context.beginPath();
	  context.fillStyle="#fff";
	  context.arc(0,0,interR,0,2*Math.PI);
	  context.fill();
	  context.restore();
	 
	  for ( var i = 0; i < 10; i++) {
			 context.save();
			 context.beginPath();
			 context.fillStyle="white";
			 context.font="15px 微軟雅黑";
			 context.textAlign="center";
			 context.textBaseline="middle";
			 context.rotate(i*step+step/2);
			 context.fillText(info[i],(outerR + interR)/2,0);
			 context.restore();
	  }
}

//隨機換輪盤圖
function getColor(){
	  var random = function(){
			 return Math.floor(Math.random()*255);
	  }
	  return "rgb("+random()+","+random()+","+random()+")";
}