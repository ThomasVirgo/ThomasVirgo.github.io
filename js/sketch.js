let grid;
let cellSize = 20;
let width = window.innerWidth;
let height = window.innerHeight;
let rows = Math.floor(height/cellSize)/2;
let cols = Math.floor(width/cellSize)/2;

let mazeBtn = document.getElementById('maze-btn');
mazeBtn.addEventListener('click', ()=>generateMaze());


class Node {
    constructor(i,j){
        this.start = false; //true if node is the starting point;
        this.end = false;  //true if node is the end point;
        this.visited = false;
        this.distance = Infinity; //change to zero if start node
        this.current = false;
        this.checked = false;
        this.obstacle = false;
        this.mazeVisited = false;
        this.rowIdx = i;
        this.colIdx = j;
    }

    getMazeNeighbours = () => {
        let x = this.colIdx;
        let y = this.rowIdx;
        // neighbour position, wall position
        let neighbours = [[y, x+2, y, x+1], [y, x-2, y, x-1], [y+2, x, y+1, x], [y-2, x, y-1,x]];
        let output = [];
        for (let index in neighbours){
            let entry = neighbours[index];
            if (isInGrid(entry[0],entry[1])){
                output.push(entry);
            }
        }
        return output;
    }
}

const createGrid = () => {
    grid = [];
    for (let i=0; i<rows; i++){
        grid.push([]);
        for (let j=0; j<cols; j++){
            grid[i][j] = new Node(i,j);
            fill('white');
            stroke('black');
            rect(j*cellSize, i*cellSize, cellSize, cellSize);
        }
    }
}

const isInGrid = (i,j) => {
    if (i>=0 && i<rows && j>=0 && j<cols){return true}
    return false 
}

const generateMaze = () => {
    createGrid();
    let available = [];
    let stack = [], current;
    for (let i=0; i<rows; i++){
        for (let j=0; j<cols; j++){
            if (j%2 == 0 || i%2 == 0){
                grid[i][j]['obstacle'] = true;
                push();
                fill('black');
                rect(j*cellSize, i*cellSize, cellSize, cellSize);
                pop();
            } else {
                available.push(grid[i][j]);
            }
        }
    }

    // choose initial cell randomly, mark it visited and push to stack. 
    let initialCell = random(available);
    initialCell.mazeVisited = true;
    stack.push(initialCell);
    

    // while the stack is not empty
    while (stack.length > 0){
    
        //pop a cell from the stack and make it current cell
        current = stack.pop();
        let adjacent = current.getMazeNeighbours();
        
        // if the current cell has any unvisited neighbours
        let unvisited = adjacent.filter(entry => {
            return grid[entry[0]][entry[1]]['mazeVisited'] == false
        });
        
        if (unvisited.length >0){ // if the current cell has any neighbours which have not been visited
            //push the current cell to the stack
            stack.push(current);

            // choose one of the unvisited neighbours
            unvisited = random(unvisited);

            //remove the wall between current cell and chosen cell
            let posX = unvisited[1];
            let posY = unvisited[0];
            let unvisitedCell = grid[posY][posX];
            let wallX = unvisited[3];
            let wallY = unvisited[2];
            push();
            fill('white');
            rect(wallX*cellSize, wallY*cellSize, cellSize, cellSize);
            pop();
            grid[wallY][wallX]['obstacle'] = false;

            // mark the chosen cell as visited
            unvisitedCell.mazeVisited = true;

            //push chosen cell to stack
            stack.push(unvisitedCell);
        }
    }
}

function setup() {
    let canvas = createCanvas(width, height);
    generateMaze();
}
  
function draw() {
    
}