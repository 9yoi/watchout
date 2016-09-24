// start slingin' some d3 here.

var height = innerHeight - 150;
var width = innerWidth - 20;
var score = 0;
var collisions = 0;
var highScore = 0;

//initialize colliders
var colliders = d3.range(15).map(function() { return [Math.random() * height, Math.random() * width]; });
var player = [[height / 2, width / 2]];


var collide = function () {
  collisions++;
    
  d3.select('body')
    .select('.collisions')
    .text('Collisions: ' + collisions);


  if (score > highScore) {
    highScore = score;
  }

  score = 0;

  d3.select('body')
    .select('.current')
    .text('Current score: ' + score);
      
  d3.select('body')
    .select('.highscore')
    .text('High score: ' + highScore);
};

var pixels = function(str){
  return '' + Number(str) + 'px';
};


var move = function() {
  console.log('hi');
  d3.select('.player')
    .attr('x', d3.event.x - parseInt(d3.select('.player').attr('width')) / 2)
    .attr('y', d3.event.y - parseInt(d3.select('.player').attr('height')) / 2);
};

var drag = d3.behavior.drag().on('drag', move);

d3.select('.board')
  .append('svg')
    .attr('height', height)
    .attr('width', width);
  
d3.select('svg')
  .selectAll('.enemy')
  .data(colliders)
  .enter()
  .append('image')
  .attr ('xlink:href', 'https://media.giphy.com/media/yo1whaKkz38ME/giphy.gif')
  .attr('height', 100)
  .attr('width', 100)
  .attr('transform', function (d) { return 'translate(' + d + ')'; })
  .attr('class', 'enemy');

// initalize player
d3.select('svg')
  .selectAll('.player')
  .data(player)
  .enter()
  .append('image')
  .attr('xlink:href', 'paths.svg')
  // .attr('transform', function (d) { return 'translate(' + d + ')'; })
  // .attr('cx', function(d) { return d[0]; })
  // .attr('cy', function(d) { return d[1]; })
  .attr('height', 50)
  .attr('width', 50)
  .attr('x', height / 2)
  .attr('y', width / 2)
  .attr('xlink:href', 'asteroid.png')
  .attr('class', 'player')
  // .style('fill', d3.rgb(210, 10, 10))
  .call(drag);


var colliding = false;
//randomize dots at set interval
setInterval(function() {
  var colliders = d3.range(15).map(function() { return [Math.random() * width, Math.random() * height]; });
  d3.select('body')
  .selectAll('.enemy')
  .data(colliders)
  .transition().duration(2500)
  .attr('transform', function (d) { return 'translate(' + d + ')'; });  
  if ( height !== innerHeight - 150) {
    height = innerHeight - 150;


  }
  if ( width !== innerWidth - 20) {
    width = innerWidth - 20;
    d3.select('svg')
      .attr('height', height)
      .attr('width', width);    
  }

}, 2500);

// updating score and detecting collisions
setInterval(function() {
  score++;
  var enemies = [];
  d3.select('body')
    .select('.current')
    .text('Current score: ' + score);
  d3.selectAll('.enemy').each(function(d) {
    enemies.push(d3.select(this).attr('transform'));
  });
  var playerloc = [Number(d3.select('.player').attr('x')) + 25, Number(d3.select('.player').attr('y')) + 25]; 
  var coordinates = enemies.map(function(translate) { return translate.slice(10).split(','); });
  
  coordinates.forEach(function(coordinate) {
    var x = Number(coordinate[0].slice(0,5)) + 75 - playerloc[0];
    var y = Number(coordinate[1].slice(0,5)) + 75 - playerloc[1];
    
    if (Math.abs(x) < 75 && Math.abs(y) < 75) {
      if (colliding === false){
        collide();
      }
      colliding = true;
    } else {
      colliding = false;
    }
  });


}, 100);



