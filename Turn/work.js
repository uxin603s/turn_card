Turn.prototype.work=function(offset){	
	var corner_offset=this.card_corner[this.close_corner_index].add(offset);
	var corner_offset_v=corner_offset.add(offset.OrthogonalVector())
	var line=corner_offset.get_a_b_type(corner_offset_v);	
	var cut_shape_corner=[];
	var limit_point=[]
	for(var i=0;i<this.limit_edge.length;i++){
		var tmp=Vector.prototype.get_line_inter_point(this.limit_edge[i],line);	
		if(tmp && tmp.x>=0 && tmp.y>=0 && tmp.x<=this.canvas.width && tmp.y<=this.canvas.height){	
			limit_point.push(tmp);
		}		
	}
	if(!limit_point.length)return false;
	
	var one_len=offset.get_one_len().mul(this.canvas.width*2);
	// console.log(limit_point,one_len)
	cut_shape_corner.push(limit_point[0]);
	cut_shape_corner.push(limit_point[1]);
	cut_shape_corner.push(limit_point[1].sub(one_len));
	cut_shape_corner.push(limit_point[0].sub(one_len));
	// console.log(cut_shape_corner)
	var card_point=[];
	for(var i=0;i<this.card_edge.length;i++){
		var tmp=Vector.prototype.get_line_inter_point(this.card_edge[i],line);	
		if(!tmp)continue;
		if(tmp.x>=this.padding && tmp.y>=this.padding && tmp.x<=this.canvas.width-this.padding && tmp.y<=this.canvas.height-this.padding){		
			card_point.push(tmp);
		}		
	}
	if(!card_point.length)return false;
	
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.ctx.drawImage(this.images_dom[0],this.padding,this.padding);
	
	var center=card_point[0].add(card_point[1]).div(2);//旋轉點
	
	var angle1=card_point[0].sub(card_point[1]).angle();
	
	var mirror_center=new Vector({x:this.canvas.width-center.x,y:center.y})
	var mirror_p0=new Vector({x:this.canvas.width-card_point[0].x,y:card_point[0].y})
	var mirror_p1=new Vector({x:this.canvas.width-card_point[1].x,y:card_point[1].y})
	
	var angle2=mirror_p0.sub(mirror_p1).angle();	
	var angle=angle1-angle2;
	
	this.card_n_process(this.images_dom[1].ctx,center,mirror_center,angle);
	this.shadow(this.ctx,[/*陰影*/
		card_point[0],
		card_point[1],
		this.card_corner[this.close_corner_index],
	]);
	this.cut(this.ctx,cut_shape_corner);/*裁切*/
	this.finger_process(this.images_dom[2].ctx,center,mirror_center,angle);
}
Turn.prototype.finger_process=function(ctx,p1,p2,angle){
	var angle1=this.zone_data.angle-angle-90;//this.zone_data.angle+90
	var padding_vec=new Vector({x:this.padding,y:this.padding})
	var vec=padding_vec.add(p1.sub(p2));
	var finger_center_vec={
		x:ctx.canvas.width/2.5,
		y:ctx.canvas.height/5
	};
	var finger_list=[
		{
			vec:finger_center_vec,
			angle:[90,135,180],
		},
		{
			vec:{x:this.width-finger_center_vec.x,y:finger_center_vec.y},
			angle:[45],
		},
		{
			vec:{x:this.width-finger_center_vec.x,y:this.height-finger_center_vec.y},
			angle:[0,-45,-90],
		},
		{
			vec:{x:finger_center_vec.x,y:this.height-finger_center_vec.y},
			angle:[-135],
		},	
	]
	this.ctx.save();
	this.ctx.translate(p1.x,p1.y);
	this.ctx.rotate((angle)*Math.PI/180);
	this.ctx.translate(-p1.x,-p1.y);
	for(var i=0;i<finger_list.length;i++){
		if(finger_list[i].angle.indexOf(this.zone_data.angle)==-1)continue;
		var finger_vec=vec.add(finger_list[i].vec);
		this.ctx.save();
		this.ctx.translate(finger_vec.x,finger_vec.y);
		this.ctx.rotate(angle1*Math.PI/180);
		this.ctx.translate(-finger_vec.x,-finger_vec.y);
		var tmp=finger_vec.sub(finger_center_vec);
		this.ctx.drawImage(ctx.canvas,tmp.x,tmp.y);
		this.ctx.restore();
	}
	this.ctx.restore();
}
Turn.prototype.card_n_process=function(ctx,p1,p2,angle){
	var padding_vec=new Vector({x:this.padding,y:this.padding})
	var vec=padding_vec.add(p1.sub(p2));
	this.ctx.save();
	this.ctx.translate(p1.x,p1.y);
	this.ctx.rotate(angle*Math.PI/180);
	this.ctx.translate(-p1.x,-p1.y);
	this.ctx.drawImage(ctx.canvas,vec.x,vec.y);//center.x,,center.y
	this.ctx.restore();
}