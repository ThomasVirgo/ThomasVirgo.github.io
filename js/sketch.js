let grid;
let cellSize = 20; //add slider for this to change the difficulty
let width = window.innerWidth/2;
let height = window.innerHeight/2;
let rows = Math.floor(height/cellSize);
let cols = Math.floor(width/cellSize);
if (rows % 2 == 0){rows ++}
if (cols % 2 == 0){cols ++}
let playerPos = [1,1]; //[row,col]

let mazeBtn = document.getElementById('maze-btn');
mazeBtn.addEventListener('click', ()=>generateMaze());


class Node {
    constructor(i,j){
        this.player = false;
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
    playerPos = [1,1];
    fill('blue');
    rect(1*cellSize, 1*cellSize, cellSize, cellSize);
    grid[1][1]['player']=true;
    fill('green');
    rect((cols-2)*cellSize,(rows-2)*cellSize, cellSize, cellSize);
    grid[rows-2][cols-2]['end']=true;

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

function movePlayer(i,j){
    if (isInGrid(i,j) && !grid[i][j]['obstacle']){
        fill('white');
        rect(playerPos[1]*cellSize, playerPos[0]*cellSize, cellSize, cellSize);
        fill('blue');
        rect(j*cellSize, i*cellSize, cellSize, cellSize);
        playerPos = [i,j];
    }
}

function keyPressed(){
    // if (keyIsDown){
    //    if (keyCode === LEFT_ARROW){
    //     console.log('left arrow pressed')
    //     let [i,j] = [playerPos[0], playerPos[1]-1];
    //     movePlayer(i,j);
    //     }
    //     if (keyCode === RIGHT_ARROW){
    //         console.log('right arrow pressed')
    //         let [i,j] = [playerPos[0], playerPos[1]+1];
    //         movePlayer(i,j);
    //     }
    //     if (keyCode === UP_ARROW){
    //         console.log('up arrow pressed')
    //         let [i,j] = [playerPos[0]-1, playerPos[1]];
    //         movePlayer(i,j);
    //     }
    //     if (keyCode === DOWN_ARROW){
    //         console.log('down arrow pressed')
    //         let [i,j] = [playerPos[0]+1, playerPos[1]];
    //         movePlayer(i,j);
    //     } 
    // }
}

function keyReleased(){
    console.log('released key')
}

function setup() {
    let canvas = createCanvas(width, height);
    frameRate(20);
    canvas.center();
    generateMaze();
}
  
function draw() {
    if (keyIsDown(LEFT_ARROW)){
        let [i,j] = [playerPos[0], playerPos[1]-1];
        movePlayer(i,j);
        console.log('left arrow down')
    }
    if (keyIsDown(RIGHT_ARROW)){
        let [i,j] = [playerPos[0], playerPos[1]+1];
        movePlayer(i,j);
    }
    if (keyIsDown(UP_ARROW)){
        let [i,j] = [playerPos[0]-1, playerPos[1]];
        movePlayer(i,j);
    }
    if (keyIsDown(DOWN_ARROW)){
        let [i,j] = [playerPos[0]+1, playerPos[1]];
        movePlayer(i,j);
    }
    
}