function Canvas(w,h){
	var canvas=document.createElement("canvas");
	canvas.width=w;
	canvas.height=h;
	
	canvas.ctx=canvas.getContext('2d');
	return canvas;
}