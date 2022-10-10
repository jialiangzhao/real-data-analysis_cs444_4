
/* 
Author: jialiangzhao
class: cs444
content: This time I used d3 to realize the function 
of drawing squares and circles with data. I also used 
d3 to make pictures of my last homework. 

*/
function clamp(v) {
    return Math.floor(Math.max(0, Math.min(255, v)));
}

function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}

function color(count) {
    // count = 2500 -> rgb(0, 127, 127) (dark cyan)
    // count = 0 -> rgb(255, 255, 255) (cyan)

    var amount = (2500 - count) / 2500 * 255;
    var s = clamp(amount), s2 = clamp(amount / 2 + 127), s3 = clamp(amount / 2 + 127);
  
    return rgb(s, s2, s3);
}

function toHex(v) {
    var str = "00" + Math.floor(Math.max(0, Math.min(255, v))).toString(16);
    return str.substr(str.length-2);
}


// Helper function to be a hex string out 3 numbers r,g,b in 0..1
function rgb1(r, g, b)
{
    return "#" + toHex(r * 255) + toHex(g * 255) + toHex(b * 255);
}
 

var svg1=d3.select("#vis1").append("svg").attr("width",600).attr("height",300).attr("id","chart_1");
var vis1=svg1.selectAll("rect")
.data(ukDriverFatalities)
.enter().append("rect")
.attr("width",function() { return Math.ceil(600 / (1984 - 1969 + 1)); } )
.attr("height",function() { return Math.ceil(300 / 12); })
.attr("x",function(row) { return Math.ceil(600 / (1984 - 1969 + 1)) * (row.year - 1969); })
.attr("y",function(row) { return Math.ceil(300 / 12) * (11 - row.month); })
.attr("fill", function(row) {
    return color(row.count);
});

var svg2=d3.select("#vis2").append("svg").attr("width",600).attr("height",300).attr("id","chart_2")
.style("background-color","#fee");

var vis2=svg2.selectAll("circle")
.data(ukDriverFatalities)
.enter().append("circle")
.attr("cx",function(row) { return Math.ceil(600 / (1984 - 1969 + 1)) * (row.year - 1969 + 0.5); } )
.attr("cy",function(row) { return Math.ceil(300 / 12) * (11 - row.month + 0.5);})
.attr("r",function(row) { return row.count/500*3; })
.attr("stroke",function() { return "white"; })
.attr("fill", function() {
    return "blue";
});


var svg3=d3.select("#vis3").append("svg").attr("width",600).attr("height",300).attr("id","chart_3")
.style("background-color","#fee").style("fill","#bbb");

var vis3=svg3.selectAll("rect")
.data(ukDriverFatalities)
.enter().append("rect")
.attr("width",function() {   return Math.ceil(600 / ukDriverFatalities.length);} )
.attr("height",function(row) { return row.count / 2500 * 300; })
.attr("x",function(row,index) { return index * 600 / ukDriverFatalities.length; })
.attr("y",function(row) {  return 300- (row.count / 2500 * 300); });



var svg4=d3.select("#vis4").append("svg").attr("width",500).attr("height",500).attr("id","scatterplot_2")
.style("background-color","#fee");

var vis4=svg4.selectAll("circle")
.data(scores)
.enter().append("circle")
.attr("fill", function(row) {
   
    return rgb1(1.5-row.SATM/800,0,1) ; 
})

.attr("r",function(row) { return row.SATV * 10 /800;})
.transition()
.duration(1000)
.attr("r",function(row) { return 0})
.transition()
.duration(5000)
.attr("r",function(row) { return row.SATV * 10 /800;}).attr('cx', 40)      
.attr('cy', 250)     
.transition()       
.duration(2000)      
.attr('cx', 250)     
.transition()      
.duration(2000)   
.attr('cx', 40);   

vis4.attr("cx",function(row) { return row.GPA * 450 /2.5-250; } )
.attr("cy",function(row) { return 650 - (row.ACT * 450 /25);});
    
  


