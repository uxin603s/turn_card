function Turn(object){
	this.transform=object.transform || 1;
	this.width=object.width;
	this.height=object.height;
	if(object.width>object.height){
		this.padding=object.width/2;
	}else{
		this.padding=object.height/2;
	}
	this.canvas=new Canvas(object.width+this.padding*2,object.height+this.padding*2);
	this.ctx=this.canvas.ctx;
	this.images=object.images;
	this.mouse_use=false;
	this.auto_use=false;

	/*
	images_dom
	1.正面
	2.反面
	3.手指
	*/

	return this;
}
Turn.prototype.get_edge=function(corner){
	var edge=[];
	for(var i=0;i<corner.length;i++){
		var curr=corner[i];
		var next=corner[i+1];
		if(!next){
			next=corner[0];
		}
		edge.push(curr.get_a_b_type(next));
	}
	return edge;
}
Turn.prototype.set_zone=function(){
	var w_scalar=(this.width/3)>>0;
	var h_scalar=(this.height/3)>>0;
	this.zone_list=[];
	var angle_list=[45,0,-45,90,-90,135,180,-135];

	var half_w=this.width/2;
	var half_h=this.height/2;
	if(half_w>half_h){
		var half_45=half_h;
	}else{
		var half_45=half_w;
	}
	
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(i==1 && j==1)continue;
			var x=w_scalar*i;
			var y=h_scalar*j;
			x+=this.padding;
			y+=this.padding;
			var x1=x+w_scalar;
			var y1=y+h_scalar;
			
			// x*=this.transform;
			// x1*=this.transform;
			// y*=this.transform;
			// y1*=this.transform;
			
			var index=this.zone_list.length;
			
			var tmp_angle=angle_list[index];
			tmp_angle%=180;
			if(tmp_angle<0){
				tmp_angle+=180;
			}
			if(tmp_angle==45 || tmp_angle==135){
				var limit_len=half_45*half_45*2;
			}else if(tmp_angle==0){
				var limit_len=half_w*half_w;
			}else if(tmp_angle==90){
				var limit_len=half_h*half_h;
			}
			this.zone_list.push({x:x,y:y,x1:x1,y1:y1,
				index:index,
				angle:angle_list[index],
				limit_len:limit_len,
			});
		}
	}
}
Turn.prototype.set_card=function(){
	this.card_corner=[
		new Vector({x:this.padding,y:this.padding}),
		new Vector({x:this.padding,y:this.padding+this.height}),
		new Vector({x:this.padding+this.width,y:this.padding+this.height}),
		new Vector({x:this.padding+this.width,y:this.padding}),
	];
	this.card_edge=this.get_edge(this.card_corner);
}
Turn.prototype.set_limit=function(){
	this.limit_corner=[
		new Vector({x:0,y:0}),
		new Vector({x:0,y:this.canvas.height}),
		new Vector({x:this.canvas.width,y:this.canvas.height}),
		new Vector({x:this.canvas.width,y:0}),
	];	
	this.limit_edge=this.get_edge(this.limit_corner);
}
Turn.prototype.loadImage=function(finish_func){
	this.images_dom=[];
	for(var i=0;i<this.images.length;i++){
		var img=new Image;	
		img.onload=function(img,i){
			img.index=i
			this.images_dom.push(img);	
			if(this.images_dom.length==this.images.length){
				this.images_dom.sort(function(a,b){return a.index-b.index})
				for(var i=0;i<this.images_dom.length;i++){
					var img=this.images_dom[i];
					if(i==2){
						var r=img.naturalWidth/img.naturalHeight;
						var w=this.width/3;
						var h=w/r;
						var ctx=new Canvas(w,h).ctx;	
						ctx.drawImage(img,0,0,w,h);
					}else{
						var ctx=new Canvas(this.width,this.height).ctx;	
						ctx.drawImage(img
						,0,0,img.naturalWidth,img.naturalHeight
						,0,0,this.width,this.height
						);
					}		
					this.images_dom[i]=ctx.canvas;
				}
				this.ctx.drawImage(this.images_dom[0],this.padding,this.padding);	
				finish_func && finish_func(this.images_dom);
			}
		}.bind(this,img,i);
		img.src=this.images[i];
	}
}
Turn.prototype.init=function(func){
	
	this.loadImage(function(){
		this.set_zone();
		this.set_card();
		this.set_limit();
		this.mouseEvent();
		
		func && func(this)
	}.bind(this));
	return this;
}