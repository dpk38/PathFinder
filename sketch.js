// The Rocket's fitness is a function of how close it gets to the target as well as how fast it gets there


var lifetime;  // How long should each generation live

var population;

var lifecycle;
var recordtime;

var target;        // Target position

var obstacles = [];

function setup() {
  createCanvas(640, 360);
  // The number of cycles we will allow a generation to live
  lifetime = 400;

  // Initialize variables
  lifecycle = 0;
  recordtime = lifetime;

  target = new Obstacle(width/2-12, 24, 24, 24);

  // Create a population with a mutation rate, and population max
  var mutationRate = 0.05;
  population = new Population(mutationRate, 50);

  // Create the obstacle course
  obstacles = [];
  obstacles.push(new Obstacle(width-400, height-100, 10, 80));
  obstacles.push(new Obstacle(width-250, height-100, 10, 80));
  obstacles.push(new Obstacle(width-380, height-150, 120, 10));
  obstacles.push(new Obstacle(width-600, height-210, 160, 10));
  obstacles.push(new Obstacle(width-200, height-210, 160, 10));
  obstacles.push(new Obstacle(width-400, height-260, 160, 10));
}

function draw() {
  background(127);

  // Draw the start and target positions
  target.display();


  // If the generation hasn't ended yet
  if (lifecycle < lifetime) {
    population.live(obstacles);
    if ((population.targetReached()) && (lifecycle < recordtime)) {
      recordtime = lifecycle;
    }
    lifecycle++;
    // Otherwise a new generation
  }
  else {
    lifecycle = 0;
    population.fitness();
    population.selection();
    population.reproduction();
  }

  // Draw the obstacles
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].display();
  }

  // Display some info
  fill(0);
  noStroke();
  text("Generation #: " + population.getGenerations(), 10, 18);
  text("Cycles left: " + (lifetime-lifecycle), 10, 36);
  text("Record cycles: " + recordtime, 10, 54);


}

function mousePressed() {
  target.position.x = mouseX;
  target.position.y = mouseY;
  recordtime = lifetime;
}
