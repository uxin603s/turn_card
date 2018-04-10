Turn.prototype.cut=function(ctx,corner,globalCompositeOperation){
	ctx.save();
	ctx.globalCompositeOperation=globalCompositeOperation || "destination-out";
	// console.log(corner.constructor.name)
	if(corner.constructor.name=="Array"){
		ctx.beginPath();
		for(var i=0;i<corner.length;i++){
			if(i==0){		
				ctx.moveTo(corner[i].x,corner[i].y);
			}else{
				ctx.lineTo(corner[i].x,corner[i].y);
			}	
		}	
		ctx.closePath();
		ctx.fill();
	}else{
		ctx.drawImage(corner
			,0,0,corner.width,corner.height
			,this.padding,this.padding,corner.width,corner.height
		);
	}
	ctx.restore();
}
Turn.prototype.shadow=function(ctx,corner){
	var shawow_ctx=new Canvas(this.canvas.width,this.canvas.height).ctx;
	shawow_ctx.save();
		
	shawow_ctx.fillStyle = 'rgba(255,255,255,1)'; 
	shawow_ctx.shadowOffsetX = 0;
	shawow_ctx.shadowOffsetY = 0;
	shawow_ctx.shadowBlur = 20;
	shawow_ctx.shadowColor = 'rgba(0, 0, 0, 1)';
	shawow_ctx.beginPath();
	for(var i=0;i<corner.length;i++){
		if(i==0){		
			shawow_ctx.moveTo(corner[i].x,corner[i].y);
		}else{
			shawow_ctx.lineTo(corner[i].x,corner[i].y);
		}	
	}	
	shawow_ctx.closePath();
	shawow_ctx.fill();
	shawow_ctx.restore();	
	// this.cut(shawow_ctx,this.images_dom[0],"destination-in");/*裁切陰影*/
	this.cut(shawow_ctx,corner);/*裁切*/
	ctx.drawImage(shawow_ctx.canvas,0,0);
}


Turn.prototype.debug=function(canvas,clear){
	canvas.style="position:absolute;top:0;left:0;"
	var dom=document.getElementById("gogo");
	if(clear){
		dom.innerHTML="";
	}
	dom.appendChild(canvas);
}
Turn.prototype.help_point=function(point,ctx,color){
	if(!ctx){
		ctx=this.ctx;
	}
	ctx.save();
	
	if(color){
		ctx.fillStyle=color;
	}else{
		ctx.fillStyle="#000000";
	}
	ctx.beginPath();
	ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
}
