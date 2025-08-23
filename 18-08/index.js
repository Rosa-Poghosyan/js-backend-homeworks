import { Graphs } from "./Graphs.js";


const g = new Graphs();


g.addEdge("A", "B", 2);
g.addEdge("A", "C", 4);
g.addEdge("B", "D", 3);
g.addEdge("B", "E", 1);
g.addEdge("C", "F", 5);
g.addEdge("E", "F", 2);


console.log("Graph adjacency list:", g.list);


console.log("Graph has cycle?", g.hasCycle());


let sp1 = g.shortestPath("A", "F");
console.log(`Shortest path from A to F: ${sp1.path.join(" -> ")}, Distance: ${sp1.distance}`);

let sp2 = g.shortestPath("A", "D");
console.log(`Shortest path from A to D: ${sp2.path.join(" -> ")}, Distance: ${sp2.distance}`);