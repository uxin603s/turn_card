Turn.prototype.mouseEvent=function(){	
	if(this.mobile){
		var downevent="touchstart";
		var upevent="touchend";
		var moveevent="touchmove";
	}else{
		var downevent="mousedown";
		var upevent="mouseup";
		var moveevent="mousemove";
	}
	this.canvas.addEventListener(downevent,this.mouseDown.bind(this));
	document.addEventListener(upevent,this.mouseUp.bind(this))
	document.addEventListener(moveevent,this.mouseMove.bind(this));
}
Turn.prototype.get_zone=function(p){	
	
	// var p=p.div(this.transform)
	// console.log(p,this.zone_list)
	for(var i=0;i<this.zone_list.length;i++){		
		var x=this.zone_list[i].x;
		var x1=this.zone_list[i].x1
		var y=this.zone_list[i].y
		var y1=this.zone_list[i].y1
		if(x<p.x && y<p.y && x1>p.x &&y1>p.y){
			return this.zone_list[i];
		}	
	}
	return false;
}
Turn.prototype.mouseDown=function(e){
	// 0.449074
	// transform: scale(0.448958, 0.449074);
	
	if(this.mouse_use)return;
	if(this.auto_use)return;
	this.canvas_vec=new Vector(this.canvas.getBoundingClientRect()).add({x:window.scrollX,y:window.scrollY});
	if(this.device){
		this.start=new Vector({x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY});		
	}else{
		this.start=new Vector({x:e.pageX,y:e.pageY});
	}
	this.start=this.start.sub(this.canvas_vec)
	.div(this.transform);
	var zone_data=this.get_zone(this.start);
	// console.log('mouseDown',zone_data)
	if(!zone_data)return ;
	this.zone_data=zone_data;
	this.mouse_use=true;
	var tmp=[];
	for(var i=0;i<this.card_corner.length;i++){
		var len_square=this.card_corner[i].sub(this.start).len_square();
		tmp.push({corner:this.card_corner[i],len_square:len_square,index:i});		
	}
	tmp.sort(function(a,b){
		return a.len_square-b.len_square;
	})
	this.close_corner_index=tmp[0].index;
	this.end=this.start;
}

Turn.prototype.mouseMove=function(e){
	if(!this.mouse_use)return false;
	if(this.auto_use)return false;
	var start=this.start;
	if(this.device){
		var end=new Vector({x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY});
	}else{
		var end=new Vector({x:e.pageX,y:e.pageY});
	}
	end=end.sub(this.canvas_vec)
	.div(this.transform);
	var axis=end.sub(start);
	if(!axis.len_square())return false;
	var end=new Vector({x:axis.len(),y:0}).rotate(this.zone_data.angle).add(start);			
	var axis=end.sub(start);
	this.work(axis);	
	if(axis.len_square()>=this.zone_data.limit_len){
		var cost_time=500;
		var time_int=Date.now();
		window.requestAnimationFrame(function(){	
			var cut_time=Date.now()-time_int;
			var per=(1+cut_time/cost_time);
			var tmp=axis.mul(per);
			if(!tmp.len_square())return;
			this.work(tmp);
			if(cut_time<=cost_time){			
				window.requestAnimationFrame(arguments.callee.bind(this));	
			}else{
				this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
				this.ctx.drawImage(this.images_dom[1],this.padding,this.padding);
			}
		}.bind(this))
		this.mouse_use=false;
	}else{		
		this.end=end;
	}
}
Turn.prototype.mouseUp=function(e){	
	if(!this.mouse_use)return false;
	if(this.auto_use)return false;
	this.mouse_use=false;
	var axis=this.end.sub(this.start);		
	if(axis.len_square()){	
		var cost_time=200;
		var time_int=Date.now();
		window.requestAnimationFrame(function(){	
			var cut_time=Date.now()-time_int;
			var per=(1-cut_time/cost_time);
			var tmp=axis.mul(per)
			if(!tmp.len_square())return;
			this.work(tmp);
			if(cut_time<=cost_time){			
				window.requestAnimationFrame(arguments.callee.bind(this));	
			}else{
				this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
				this.ctx.drawImage(this.images_dom[0],this.padding,this.padding);
			}
		}.bind(this))
	}else{
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.drawImage(this.images_dom[0],this.padding,this.padding);
		
	}	
}