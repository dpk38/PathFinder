# PathFinder

Machine Learning based Evolutionary Algorithmic Path Finder

Implemented Genetic Algorithm to design a path finder system.
This was expressed in the form of a group of rockets that are navigating through a system of obstacles to reach a target. The target is chosen by the user with a mouse click.
The rockets initially move in random directions and fail to reach the target. We now implement the Selection process of the Genetic Algorithms to select the best performing individuals by evaluvating their fitness function.
From the selected rockets, we crossover to create a new population. From them, we choose a few rockets randomly and mutate their vectors. This prevents them from stalling in a local minima.
The rockets of the new population traverse the course again and the process is repeated.
Over a couple of generations, the rockets finally reach the target as required.
Technology Stack: Front End: HTML, CSS Back End: JavaScript

The attached ppt describes the same in detail.
