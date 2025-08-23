export class Graphs {
    constructor() {
        this.list = {};
    }
    addVertex(v) {
        if (!this.list[v]) {
            this.list[v] = [];
        }
    }
    addEdge(u, v, w) {
        this.addVertex(u);
        this.addVertex(v);
        this.list[u].push({ node: v, weight: w });
        this.list[v].push({ node: u, weight: w });
    }

    hasCycle() {
        const visited = new Set();

        const dfs = (v, parent) => {
            visited.add(v);

            for (const neighbor of this.list[v]) {
                const node = neighbor.node ?? neighbor;
                if (!visited.has(node)) {
                    if (dfs(node, v)) return true;
                } else if (node !== parent) {
                    return true;
                }
            }
            return false;
        };

        for (const vertex of Object.keys(this.list)) {
            if (!visited.has(vertex)) {
                if (dfs(vertex, null)) return true;
            }
        }
        return false;
    }

    shortestPath(u, v) {
        const distances = {};
        const prev = {};
        const pq = new Set(Object.keys(this.list));
        for(let node in this.list) {
            distances[node] = Infinity;
            prev[node] = null;
        }
        distances[u] = 0;
        while(pq.size) {
            let minNode = null;
            for(let node of pq) {
                if(minNode === null || distances[node] < distances[minNode]) {
                    minNode = node;
                }
            }
            pq.delete(minNode);
            if(minNode === v) break;
            for(let neighbor of this.list[minNode]) {
                const alt = distances[minNode] + (neighbor.weight ?? 1);
                if(alt < distances[neighbor.node ?? neighbor]) {
                    distances[neighbor.node ?? neighbor] = alt;
                    prev[neighbor.node ?? neighbor] = minNode;
                }
            }
        }
        const path = [];
        let curr = v;
        while(curr) {
            path.unshift(curr);
            curr = prev[curr];
        }
        return { path, distance: distances[v] === Infinity ? -1 : distances[v] };
    }
}
