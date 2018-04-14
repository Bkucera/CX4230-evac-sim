class Node {
    key:number;
    priority:number;

    constructor(key: number,priority: number){
        this.key = key;
        this.priority = priority;
    }
}

//This queue is sorted by priority for each enqueue
class Queue {

    nodesArr: Node[] = [];

    enqueue(priority:number, key:number){
        this.nodesArr.push(new Node(key, priority));
        this.nodesArr.sort(
            function(a, b) {
                return a.priority - b.priority;
            }
        )
    }

    dequeue():number{
        return this.nodesArr.shift().key;
    }

    empty():boolean{
        return !this.nodesArr.length;
    }
}

//Computes the shortest path between two node

class Algorithm{

    inf = 1/0;
    vertices = {};

    addVertex(name:string, edges:any){
        this.vertices[name] = edges;
    }

    shortestPath(start:string, finish:string){

        let nodesArr = new Queue(),
        shortest,
        dist = {},
        prev = {},
        path = [],
        vertex,
        neighbor,
        alt;

        for(vertex in this.vertices){
            if(vertex === start){
                dist[vertex] = 0;
                nodesArr.enqueue(0, vertex);
            }else{
                dist[vertex] = this.inf;
                nodesArr.enqueue(this.inf, vertex);
            }
            prev[vertex] = null;
        }

        while(!nodesArr.empty()){
            shortest = nodesArr.dequeue();
            if(shortest === finish){
                while(prev[shortest]){
                    path.push(shortest);
                    shortest = prev[shortest];
                }
                break;
            }

            if(!shortest || dist[shortest] === this.inf){
                continue;
            }

            for(neighbor in this.vertices[shortest]){
                alt = dist[shortest] + this.vertices[shortest][neighbor];

                if(alt < dist[neighbor]){
                    dist[neighbor] = alt;
                    prev[neighbor] = shortest;
                    nodesArr.enqueue(alt, neighbor);
                }
            }
        }
        return path.concat(start).reverse();
    }
}

let routes:Algorithm = new Algorithm();
routes.addVertex('a', { b: 7, c: 8 });
routes.addVertex('c', { a: 8 });
routes.addVertex('b', { a: 7, f: 8 });
routes.addVertex('f', { b: 8 });

console.log(routes.shortestPath('a', 'b'));