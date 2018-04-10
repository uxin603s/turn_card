Turn.prototype.test_func=function(card_n_img_mirror,center,angle){
	// this.debug(card_n_img_mirror,1);
	// console.log(center)
	// this.debug(card_n_img_mirror,1);
	var padding_vec=new Vector({x:this.padding,y:this.padding})
	var center=center.sub(padding_vec)
	var ctx=new Canvas(card_n_img_mirror.width,card_n_img_mirror.height).ctx;
	ctx.drawImage(card_n_img_mirror,0,0)
	// console.log()
	
	var ctx=ctx.custom_rotate_box(center,angle).ctx;
	
	var fix=ctx.fix;
	var all_fix=new Vector(fix);
	var center=center.add(fix);
	var ctx=ctx.custom_rotate(center,angle).ctx;
	
	
	var ctx1=new Canvas(ctx.canvas.width,ctx.canvas.height).ctx;
	ctx1.save();
	
	ctx1.translate(ctx.canvas.width,0);
	ctx1.scale(-1,1);
	
	ctx1.drawImage(ctx.canvas,0,0);
	ctx1.restore();
	ctx=ctx1;
	
	// var ctx=ctx.custom_rotate_box(center,180).ctx;
	// var fix=ctx.fix;
	// all_fix=all_fix.add(fix)
	// var center=center.add(fix);
	
	
	
	// this.debug(ctx1.canvas);
	
	// var offset=(new Vector({x:ctx.canvas.width-center.x*2,y:0}));
	var offset=(new Vector({x:ctx.canvas.width-center.x*2,y:0})).rotate(180-angle);
	// var ctx=ctx.custom_offset(offset).ctx;
	
	// this.debug(ctx.canvas);
	
	var ctx=ctx.custom_rotate_box(center,-angle).ctx;
	var fix=ctx.fix;
	all_fix=all_fix.add(fix);
	
	var center=center.add(fix);
	var ctx=ctx.custom_rotate(center,-angle).ctx;
	
	var ctx=ctx.custom_rotate_box(center,180).ctx;
	var fix=ctx.fix;
	var center=center.add(fix);
	var ctx=ctx.custom_rotate(center,180).ctx;
	// this.debug(ctx.canvas,1);
	
	all_fix=all_fix.add(fix)
	// ctx.canvas.style="position:absolute;top:"+-all_fix.y+"px;left:"+-all_fix.x+"px;"
	ctx.fix=all_fix;
	ctx.offset=offset;
	// this.debug(ctx.canvas,1);
	return ctx.canvas;
}
	// var mirror_ctx=this.test_func(card_n_img_mirror,center,-angle).ctx;
	// this.ctx.drawImage(mirror_ctx.canvas,this.padding-mirror_ctx.fix.x-mirror_ctx.offset.x,this.padding-mirror_ctx.fix.y-mirror_ctx.offset.y);
	
	// var mirror_ctx=new Canvas(this.canvas.width,this.canvas.height).ctx;
	// this.draw(mirror_ctx,card_n_img_mirror);
	// var mirror_ctx=this.rotate_and_mirror(mirror_ctx,center,angle).ctx;
	
	// this.ctx.drawImage(mirror_ctx.canvas,0,0);
	
	
	
	
	// for(var i=0;i<inter.length;i++){
		// this.help_point(inter[i]);
	// }
	
	// var mirror_ctx=this.test_func(card_n_img_mirror,center,-angle).ctx;
	// var finger_ctx=new Canvas(this.canvas.width,this.canvas.height).ctx;	
	// this.put_finger(finger_ctx,angle);
	// var finger_ctx=this.rotate_and_mirror(finger_ctx,center,angle);
	// this.ctx.drawImage(finger_ctx,0,0);
/*----------------*/
// var corner=[
	// new Vector({x:0,y:0}),
	// new Vector({x:0,y:this.height}),
	// new Vector({x:this.width,y:this.height}),
	// new Vector({x:this.width,y:0}),
// ];
// var edge=[];
// for(var i=0;i<corner.length;i++){
	// var curr=corner[i];
	// var next=corner[i+1];
	// if(!next){
		// next=corner[0];
	// }
	// edge.push(curr.get_a_b_type(next));
// }
// var cut_shape_corner1=this.get_cut_shape_corner(axis,corner[this.close_corner_index]);	
// var inter=this.get_inter(cut_shape_corner1,edge);
// var center1=inter[0].add(inter[1]).div(2);//旋轉點
// var test=card_n_img_mirror.ctx.test_gogo(center1).ctx;
// var fix1=test.fix;
// var test=test.custom_rotate(new Vector({x:test.canvas.width/2,y:test.canvas.height/2}),angle).ctx;
// var test=test.custom_mirror(0).ctx;

// var offset=(new Vector({x:test.canvas.width-fix1.x*2,y:0}))
// var test=test.custom_offset(offset).ctx;
// var test=test.custom_rotate(new Vector({x:test.canvas.width/2,y:test.canvas.height/2}),-angle).ctx;
// this.ctx.drawImage(test.canvas,fix1.x,fix1.y)
// console.log(fix1)
// var test=test.remove_rotate_box(fix1).ctx;
// this.debug(test.canvas,1);

// var test=card_n_img_mirror.ctx.test_gogo(center).ctx;
// this.help_point(center,card_n_img_mirror.ctx);
// this.debug(card_n_img_mirror,1);
// this.help_point(center,mirror_ctx);
// this.debug(mirror_ctx.canvas,1);
/*----------------*/

// var tt=(new Vector({x:this.canvas.width-center.x,y:center.y}))
// var tt1=(new Vector({x:this.canvas.width-inter[0].x,y:inter[0].y}))
// var tt2=(new Vector({x:this.canvas.width-inter[1].x,y:inter[1].y}))
// var a2=tt1.sub(tt2);
// console.log(a2)
// var angle2=(Math.atan2(a2.y,a2.x)*180/Math.PI);//計算斜率角度
// var a3=a1.add(a2).sub(inter[0]);
// var angle3=(Math.atan2(a3.y,a3.x)*180/Math.PI);//計算斜率角度
// console.log(angle1,angle2)
// var a=axis.OrthogonalVector();
// var angle=(Math.atan2(a.y,a.x)*180/Math.PI);//計算斜率角度

Turn.prototype.put_finger=function(ctx,angle){
	// console.log(this.angle);
	// zone_data.angle
	var finger=this.images_dom[2];
	var center=new Vector({x:finger.width/2,y:finger.height/4});
	var finger_ctx=finger.ctx.add_rotate_box(center).ctx;	
	var fix=finger_ctx.fix;
	var finger_ctx=finger_ctx.custom_offset(new Vector({x:0,y:finger.height/5})).ctx
	var fix_center=center.add(fix);
	var finger_ctx=finger_ctx.custom_rotate(fix_center,angle).ctx;
	
	switch(this.zone_data.angle){
		case 45:
			ctx.drawImage(finger_ctx.canvas
			,0,0
			,finger_ctx.canvas.width,finger_ctx.canvas.height
			,this.padding-fix.x,this.padding-fix.y
			,finger_ctx.canvas.width,finger_ctx.canvas.height
			);
			break;
		case 0: case -90: case -45:
			ctx.drawImage(finger_ctx.canvas
			,0,0
			,finger_ctx.canvas.width,finger_ctx.canvas.height
			,this.padding-fix.x,this.padding-fix.y+this.height*5/6
			,finger_ctx.canvas.width,finger_ctx.canvas.height
			);
			break;
		case -135:
			ctx.drawImage(finger_ctx.canvas
			,0,0
			,finger_ctx.canvas.width,finger_ctx.canvas.height
			,this.padding-fix.x+this.width-finger.width,this.padding-fix.y+this.height*5/6
			,finger_ctx.canvas.width,finger_ctx.canvas.height
			);
			break;
		case 135: case 180: case 90:
			ctx.drawImage(finger_ctx.canvas
			,0,0
			,finger_ctx.canvas.width,finger_ctx.canvas.height
			,this.padding-fix.x+this.width-finger.width,this.padding-fix.y
			,finger_ctx.canvas.width,finger_ctx.canvas.height
			);
			break;
	}
}
	
CanvasRenderingContext2D.prototype.custom_offset=function(offset){
	var ctx=new Canvas(
		this.canvas.width,
		this.canvas.height
	).ctx;
	ctx.save();
	ctx.translate(-offset.x,-offset.y);
	ctx.drawImage(this.canvas,0,0);
	ctx.restore();
	return ctx.canvas
}

CanvasRenderingContext2D.prototype.custom_rotate_box=function(center,angle){
	var corner=[
		new Vector({x:0,y:0}),
		new Vector({x:this.canvas.width,y:0}),
		new Vector({x:this.canvas.width,y:this.canvas.height}),
		new Vector({x:0,y:this.canvas.height}),
	];
	var x={min:0,max:this.canvas.width};
	var y={min:0,max:this.canvas.height};
	for(var i=0;i<corner.length;i++){
		var tmp=corner[i].sub(center).rotate(angle).add(center);
		var tmp_x=tmp.x;
		var tmp_y=tmp.y;
		if(tmp_x<x.min){
			x.min=tmp_x
		}
		if(tmp_x>x.max){
			x.max=tmp_x
		}
		if(tmp_y<y.min){
			y.min=tmp_y
		}
		if(tmp_y>y.max){
			y.max=tmp_y
		}
	}
	
	var scalar={
		x:0-x.min,
		x1:x.max-this.canvas.width,
		y:0-y.min,
		y1:y.max-this.canvas.height,
	}
	var w=scalar.x+scalar.x1;
	var h=scalar.y+scalar.y1;
	var ctx=new Canvas(w+this.canvas.width,h+this.canvas.height).ctx;
	ctx.drawImage(this.canvas,scalar.x,scalar.y);
	ctx.fix={x:scalar.x,y:scalar.y};
	return ctx.canvas;
}
CanvasRenderingContext2D.prototype.custom_rotate=function(center,angle){
	// if(!offset)offset={x:0,y:0}
	var ctx=new Canvas(this.canvas.width,this.canvas.height).ctx;
	ctx.save();
	ctx.translate(center.x,center.y);
	ctx.rotate((angle)/180*Math.PI);
	ctx.translate(-center.x,-center.y);
	ctx.drawImage(this.canvas,0,0);
	ctx.restore();
	return ctx.canvas;
}
CanvasRenderingContext2D.prototype.custom_mirror=function(type,fix_center,angle){
	var ctx1=this;
	if(angle){	
		var ctx1=this.custom_rotate(fix_center,angle).ctx;	
		// Turn.prototype.debug(ctx1.canvas,1);
	}
	
	var ctx=new Canvas(ctx1.canvas.width,ctx1.canvas.height).ctx;
	ctx.save();
	if(type==0){
		ctx.translate(ctx1.canvas.width,0);
		ctx.scale(-1,1);
	}else{
		ctx.translate(0,ctx1.canvas.height);
		ctx.scale(1,-1);
	}
	
	
	ctx.drawImage(ctx1.canvas,0,0);
	ctx.restore();
	
	if(angle){
		if(type==0){
			var offset=(new Vector({x:ctx.canvas.width-fix_center.x*2,y:0}))
		}else{
			var offset=(new Vector({x:0,y:ctx.canvas.height-fix_center.x*2}))
		}
		var ctx=ctx.custom_offset(offset).ctx;
		var ctx=ctx.custom_rotate(fix_center,-angle).ctx;
	}
	return ctx.canvas;
}
CanvasRenderingContext2D.prototype.remove_rotate_box=function(fix){
	var ctx=new Canvas(
		this.canvas.width-fix.x*2,
		this.canvas.height-fix.y*2
	).ctx;
	ctx.drawImage(this.canvas,
	fix.x,fix.y,
	this.canvas.width-fix.x*2,this.canvas.height-fix.y*2,
	0,0,
	ctx.canvas.width,ctx.canvas.height
	);
	return ctx.canvas;
}
CanvasRenderingContext2D.prototype.add_rotate_box=function(center){
	if(this.canvas.width>this.canvas.height){
		var scalar=this.canvas.width;
	}else{
		var scalar=this.canvas.height;
	}
	scalar=((scalar*1.4142135623730951)*1.5)>>0;
	var ctx=new Canvas(scalar,scalar).ctx;
	var fix={
		x:(scalar-this.canvas.width)/2,
		y:(scalar-this.canvas.height)/2,
	};
	ctx.fix=fix;
	ctx.drawImage(this.canvas,
		0,0,
		this.canvas.width,this.canvas.height,
		fix.x,fix.y,
		this.canvas.width,this.canvas.height
	);
	return ctx.canvas;
}

CanvasRenderingContext2D.prototype.test_gogo=function(center){
	var left_s=center.x
	var left_e=this.canvas.width-center.x;
	var right_s=center.y;
	var right_e=this.canvas.height-center.y;
	if(left_s>left_e){
		var left_scalar=left_s;
	}else{
		var left_scalar=left_e;
	}
	if(right_s>right_e){
		var right_scalar=right_s;
	}else{
		var right_scalar=right_e;
	}
	// var ctx=this;
	
	// Turn.prototype.debug(ctx.canvas,1);
	// left_scalar*=2
	// right_scalar*=2
	var scalar=Math.sqrt(left_scalar*left_scalar+right_scalar*right_scalar);
	var x=scalar;//-(this.canvas.width+center.x);
	var y=scalar;//-(this.canvas.height+center.y);
	console.log(this.canvas.width,this.canvas.height,center)
	var x=scalar-center.x
	var y=scalar-center.y
	// var x1=scalar-this.canvas.width;
	// var y1=scalar-this.canvas.heigth;
	// console.log(left_s,left_e,right_s,right_e);	
	var ctx=new Canvas(scalar*2,scalar*2).ctx;
	console.log(x,y);
	// var fix={x:0,y:0}
	// var fix={
		// x:(scalar-this.canvas.width)/2,
		// y:(scalar-this.canvas.height)/2,
	// };
	// center
	// .sub(center)
	
	var fix={
		x:x,
		y:y,
	};
	// var fix={
		// x:0,
		// y:0,
	// };
	// console.log(fix.sub(center));
	// console.log(scalar-left_scalar,scalar-right_scalar)
	// console.log(ctx.canvas)
	ctx.fix=fix;
	ctx.drawImage(this.canvas
		,0,0
		,this.canvas.width,this.canvas.height
		,fix.x,fix.y
		,this.canvas.width,this.canvas.height
	);
	// Turn.prototype.help_point(fix,ctx);
	// Turn.prototype.help_point(center,ctx);
	Turn.prototype.help_point({x:scalar,y:scalar},ctx);
	// console.log('help_point')
	
	return ctx.canvas;
}
Turn.prototype.rotate_and_mirror=function(ctx,center,angle){	
	var ctx=ctx.add_rotate_box(center).ctx;		
	var fix=ctx.fix;
	var fix_center=center.add(ctx.fix);	
	var ctx=ctx.custom_mirror(0,fix_center,-angle).ctx;
	
	var ctx=ctx.custom_rotate(fix_center,180).ctx;	
	ctx.fix=fix
	var ctx=ctx.remove_rotate_box(fix).ctx;
	
	return ctx.canvas;
}
Turn.prototype.auto=function(one_len,start_p,object_p,type,statement_func,stop_after_func){
	this.mouse_use=false;
	window.requestAnimationFrame(function(){	
		if(type==1){
			object_p=object_p.sub(one_len);
		}else{
			object_p=object_p.add(one_len);
		}	
		var axis=object_p.sub(start_p);
		var len_square=axis.len_square();
		
		if(statement_func(len_square,one_len)){	
			this.work(axis);		
			window.requestAnimationFrame(arguments.callee.bind(this));	
		}else{			
			if(stop_after_func){
				stop_after_func && stop_after_func(object_p);	
			}else{
				this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
				this.ctx.drawImage(this.images_dom[0],this.padding,this.padding);	
			}
		}
	}.bind(this))
}
// console.log(one_len,axis.len());
// return
// var cost_time=millisecond/3*2;
// var stop_time=millisecond/3;
// var time_int=Date.now();
// var stop_per=0.25;
// var time_id=null;
// var animation_id=null;
// var rate=1;
// var end=new Vector({x:Math.sqrt(this.zone_data.limit_len)*2,y:0})
// .rotate(angle)
// var axis=end.sub(start);

// var animation_id=null;
// var time_int=Date.now();
// var half_millisecond=millisecond/3;
// var tmp=0;
// window.requestAnimationFrame(function(){	
	// var cut_time=Date.now()-time_int;
	// if(cut_time<half_millisecond){
		// var pp=Math.sin(cut_time/half_millisecond*180/2*Math.PI/180);	
		// tmp=pp
		// var per=(cut_time/half_millisecond)*pp;
		// var new_axis=axis.mul(per);
		// this.work(new_axis);
		// console.log('階段一',per);
	// }else{
		// var per=cut_time/half_millisecond;
		// var new_axis=axis.mul(per);
		// this.work(new_axis);
		// console.log('階段二',per);
	// }
	// if(cut_time<millisecond){
		// animation_id=window.requestAnimationFrame(arguments.callee.bind(this));
	// }else{
		// this.mouse_use=false;
		// this.auto_use=false;		
		// this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		// this.ctx.drawImage(this.images_dom[1],this.padding,this.padding);
		// cancelAnimationFrame(animation_id);
	// }
// }.bind(this));