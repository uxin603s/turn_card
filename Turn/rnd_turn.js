Turn.prototype.rnd_turn=function(option){
	if(this.mouse_use)return false;
	if(this.auto_use)return false;
	this.auto_use=true;
	
	option || (option={});
	var rnd_index=option.rnd_index;
	var millisecond=option.millisecond || 5000;
	var finish_func=option.finish_func;
	var type=option.type;
	
	
	if(isNaN(rnd_index)){
		var rnd_index=(this.zone_list.length*Math.random())>>0;
	}
	var zone_data=this.zone_list[rnd_index];
	if(!zone_data)return false;
	this.zone_data=zone_data;
	var tmp=[];
	for(var i=0;i<this.card_corner.length;i++){
		var len_square=this.card_corner[i].sub(new Vector({x:this.zone_data.x,y:this.zone_data.y})).len_square();
		tmp.push({index:i,len_square:len_square})
	}
	
	tmp.sort(function(a,b){
		return a.len_square-b.len_square;
	});
	
	this.close_corner_index=tmp[0].index;
	var angle=this.zone_data.angle
	var start=new Vector(this.card_corner[this.close_corner_index]);
	
	
	var end=new Vector({x:1,y:0})
	.rotate(angle).add(start);
	var axis=end.sub(start);
	
	var one_len=axis.get_one_len();
	var rate=1;
	var limit_len=this.zone_data.limit_len*4;
	var range1=limit_len/(7*7);
	var range2=limit_len/(4*4);
	var range1_flag=true;
	var range2_flag=true;
	// var tt=Date.now();
	var rate_len=one_len.mul(rate);
	var animation_id=null;
	window.requestAnimationFrame(function(){	
		axis=axis.add(rate_len);
		var len_square=axis.len_square();
		
		if(range1_flag && len_square>range1){
			rate_len=one_len.mul(0.4);
			range1_flag=false;
		}else if(range2_flag && len_square>range2){
			rate_len=rate_len.mul(1.03);
		} 	
		
		this.work(axis);
		
		if(len_square<limit_len){		
			animation_id=window.requestAnimationFrame(arguments.callee.bind(this));
		}else{
			this.mouse_use=false;
			this.auto_use=false;		
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
			this.ctx.drawImage(this.images_dom[1],this.padding,this.padding);
			cancelAnimationFrame(animation_id);
			finish_func && finish_func();
			// console.log(Date.now()-tt)
			// console.log('gogo',this)
		}
	}.bind(this));
}