// start slingin' some d3 here.

var height = innerHeight - 150;
var width = innerWidth - 20;
var score = 0;
var collisions = 0;
var highScore = 0;


var colliders = d3.range(20).map(function() { return [Math.random() * height, Math.random() * width]; });
var player = [height / 2, width / 2];



//initialize
d3.select('body')
  .append('svg')
    .attr('height', height)
    .attr('width', width)
  .selectAll('circle')
  .data(colliders)
  .enter().append('circle')
  .attr('transform', function (d) { return 'translate(' + d + ')'; })
  .attr('r', 24)
  .style('fill', d3.rgb(10, 10, 210));

d3.select('body')
  .append('svg')
    .attr('height', 20)
    .attr('width', 20)
  .selectAll('circle')
    .data(player)
  .enter().append('circle')
  .attr('transform', function(d) { return 'translate(' + d + ')'; })
  .attr('r', 16)
  .style('fill', d3.rgb(210, 10, 10));

//randomize dots at set interval
setInterval(function() {
  var colliders = d3.range(20).map(function() { return [Math.random() * height, Math.random() * width] });
  d3.select('body')
  .selectAll('circle')
  .data(colliders)
  .transition().duration(2500)
  .attr('transform', function (d) { return 'translate(' + d + ')'; });  


}, 2500);

setInterval(function() {
  score++;
  d3.select('body')
    .select('.current')
    .text('Current score: ' + score);
}, 50);