getPolylineMiddlePoint : function(pl){
    var n = pl.getVertexCount();
    var length = pl.getLength();
    var d = 0;
    var i = 0;
    var j = 1;

    while(j <= n){
        inc = pl.getVertex(i++).distanceFrom(pl.getVertex(j++));
        if( d+inc >= length/2)
            break;
        d += inc;
    }

    var c = (length/2 - d)/pl.getVertex(--i).distanceFrom(pl.getVertex(--j));
    return this.getConvexCombination(pl.getVertex(j),pl.getVertex(i),c);
}

function getConvexCombination(map, ll1,ll2,c){
   var proj = map.getCurrentMapType().getProjection();
   ll1 = proj.fromLatLngToPixel(ll1,this.map.getZoom());
   ll2 = proj.fromLatLngToPixel(ll2,this.map.getZoom());
   var ll3 = new GPoint( ll1.x*c+ll2.x*(1-c), ll1.y*c+ll2.y*(1-c));
   ll3 =  proj.fromPixelToLatLng(ll3,this.map.getZoom());
   return ll3;
}

function getPolylinePoints (map, pl, stepDistance){
    var n = pl.getVertexCount();
    var length = pl.getLength();
    var d = 0;
    var i = 0;
    var j = 1;

    while(j <= n){
        inc = pl.getVertex(i++).distanceFrom(pl.getVertex(j++));
        if( d+inc >= stepDistance)
            var c = (stepDistance - d)/pl.getVertex(i - 1).distanceFrom(pl.getVertex(j - 1));
            var point =  getConvexCombination(map, pl.getVertex(j),pl.getVertex(i),c);

            break;
        d += inc;
    }
}
