// start slingin' some d3 here.

var height = innerHeight - 150;
var width = innerWidth - 20;
var score = 0;
var collisions = 0;
var highScore = 0;

//initialize colliders
//var colliders = d3.range(20).map(function() { return [Math.random() * height, Math.random() * width]; });
var colliders = d3.range(20).map(function() { return Math.random(); });
var player = [{x: height / 2, y: width / 2}];


var drag = d3.behavior.drag().on('drag', function (d) {
  // d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
  var loc = d3.mouse(this);
  // mouse = {x: loc[0], y: loc[1]};
  d3.select(this).attr('cx', loc[0]).attr('cy', loc[1]);
});

d3.select('.board')
  .append('svg')
    .attr('height', height)
    .attr('width', width)
  .selectAll('circle')
  .data(colliders)
  .enter().append('circle')
  .attr('transform', function (d) { return 'translate(' + d + ')'; })
  // .attr('cx', Math.random() * height)
  // .attr('cy', Math.random() * width)
  .attr('r', 24)
  .attr('class', 'enemy')
  .style('fill', d3.rgb(10, 10, 210));

// initalize player
d3.select('svg')
  // .append('svg')
  //   .attr('height', 100)
  //   .attr('width', 100)
  .selectAll('circle')
  .data(colliders.concat(player))
  .enter().append('circle')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 24)
  .attr('class', 'player')
  .style('fill', d3.rgb(210, 10, 10))
  .call(drag);


// var clicked = function () {
//   console.log('clicked');
// };

// d3.select('player')
//   .call(drag);


 

//randomize dots at set interval
setInterval(function() {
  var colliders = d3.range(20).map(function() { return [Math.random() * height, Math.random() * width]; });
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
}, 100);

