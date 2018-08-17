// Initialize the population
function Population(m, num) {
  this.mutationRate = m; // Mutation rate
  this.population = new Array(num); // Array to hold the current population
  this.matingPool = []; // Array for "mating pool"
  this.generations = 0; // Number of generations
  //make a new set of creatures
  for (var i = 0; i < this.population.length; i++) {
    var position = createVector(width / 2, height + 20);
    this.population[i] = new Rocket(position, new DNA(), this.population.length);
  }


  this.live = function(os) {
    // For every creature
    for (var i = 0; i < this.population.length; i++) {
      // If it finishes, mark it down as done!
      this.population[i].checkTarget();
      this.population[i].run(os);
    }
  }

  // Did anything finish?
  this.targetReached = function() {
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].hitTarget) return true;
    }
    return false;
  }

  // Calculate fitness for each creature
  this.fitness = function() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].fitness();
    }
  }

  // Generate a mating pool
  this.selection = function() {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    var maxFitness = this.getMaxFitness();

    // Calculate fitness for each member of the population
    // A higher fitness = more entries to mating pool more likely to be picked as a parent
    for (var i = 0; i < this.population.length; i++) {
      var fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
      var n = int(fitnessNormal * 100); // Arbitrary multiplier
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Making the next generation
  this.reproduction = function() {
    // Refill the population with children from the mating pool
    for (var i = 0; i < this.population.length; i++) {

      var m = int(random(this.matingPool.length));
      var d = int(random(this.matingPool.length));

      var mom = this.matingPool[m];
      var dad = this.matingPool[d];

      var momgenes = mom.getDNA();
      var dadgenes = dad.getDNA();

      var child = momgenes.crossover(dadgenes);

      child.mutate(this.mutationRate);

      var position = createVector(width / 2, height + 20);
      this.population[i] = new Rocket(position, child, this.population.length);
    }
    this.generations++;
  }

  this.getGenerations = function() {
    return this.generations;
  }

  // Find highest fitness for the population
  this.getMaxFitness = function() {
    var record = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > record) {
        record = this.population[i].getFitness();
      }
    }
    return record;
  }

}
