class Path{
    constructor(x1, y1, x2, y2){
        this.start = new Vector(x1, y1)
        this.end = new Vector(x2, y2)
        this.radius = 20
    }
    draw(){
        ctx.beginPath()
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 2
        ctx.moveTo(this.start.x, this.start.y)
        ctx.lineTo(this.end.x, this.end.y)
        ctx.stroke()
         ctx.beginPath();
         ctx.strokeStyle = 'rgba(255,255,255, 0.5';
         ctx.lineWidth = this.radius * 2;
         ctx.moveTo(this.start.x, this.start.y);
         ctx.lineTo(this.end.x, this.end.y);
         ctx.stroke();
        
    }
}