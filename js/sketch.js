let grid, cellSize, width, height, rows, cols, playerPos, currentNode, searching;
cellSize=20;
width = window.innerWidth/2;
height = window.innerHeight/2;
rows = Math.floor(height/cellSize);
cols = Math.floor(width/cellSize);
if (rows % 2 == 0){rows ++}
if (cols % 2 == 0){cols ++}

let mazeBtn = document.getElementById('maze-btn');
mazeBtn.addEventListener('click', ()=>generateMaze());

let difficulty = document.getElementById('difficulty');
difficulty.addEventListener('change', updateDifficulty);

let find = document.getElementById('find');
find.addEventListener('click', search);

function search(){
    searching = true;
    frameRate(100);
};

function updateDifficulty(){
    cellSize = 35-difficulty.value;
    generateMaze();
}


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
    width = window.innerWidth/2;
    height = window.innerHeight/2;
    rows = Math.floor(height/cellSize);
    cols = Math.floor(width/cellSize);
    if (rows % 2 == 0){rows ++}
    if (cols % 2 == 0){cols ++}
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
    clear();
    createGrid();
    frameRate(20);
    width = window.innerWidth/2;
    height = window.innerHeight/2;
    rows = Math.floor(height/cellSize);
    cols = Math.floor(width/cellSize);
    if (rows % 2 == 0){rows ++}
    if (cols % 2 == 0){cols ++}
    playerPos = [1,1]; //[row,col]
    fill('blue');
    rect(1*cellSize, 1*cellSize, cellSize, cellSize);
    grid[1][1]['player']=true;
    grid[1][1]['current']=true;
    grid[1][1]['distance']=0;
    currentNode = grid[1][1];
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


function setup() {
    width = window.innerWidth/2;
    height = window.innerHeight/2;
    let canvas = createCanvas(width, height);
    frameRate(20);
    canvas.center();
    generateMaze();
}
  
function draw() {
    if (keyIsDown(LEFT_ARROW)){
        let [i,j] = [playerPos[0], playerPos[1]-1];
        movePlayer(i,j);
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

    //Dijkstra Algorithm
    if (searching){
        for (let i=0; i<rows; i++){
        let searchRow = grid[i];
        let test = searchRow.find(element => element.current == true)
        if (test){
            currentNode = test;
        }
    }


    let idx1 = currentNode.rowIdx;
    let idx2 = currentNode.colIdx;
    let idxToCheck = [[idx1+1, idx2], [idx1-1, idx2], [idx1, idx2 +1], [idx1, idx2-1]];
    for (let entry in idxToCheck){
        let currRowIdx = idxToCheck[entry][0];
        let currColIdx = idxToCheck[entry][1];
        if (currRowIdx>=0 && currRowIdx<rows && currColIdx >=0 && currColIdx<cols){
            let checkNode = grid[currRowIdx][currColIdx];
            if (checkNode.visited == true || checkNode.obstacle == true){continue}; //no need to revisit nodes
            checkNode.checked = true;

            if (checkNode.end != true){
                let c = color(50, 55, 100);
                fill(c);
                rect(currColIdx*cellSize, currRowIdx*cellSize, cellSize, cellSize);
            }
            
            let testDistance = currentNode.distance + 1;
            if (testDistance < checkNode.distance){
                checkNode.distance = testDistance;
            } 
        }
    }
    // mark the current node as visited and no longer the current node.
    currentNode.visited = true;
    currentNode.current = false;
    // check if current node is the end node and hence search is complete
    if (currentNode.end == true){
        console.log('complete');
        searching = false;
        let shortestPath = [];
        let pathNode = currentNode;
        shortestPath.push(currentNode);
        let counter = 0;
        while (pathNode.distance){
            counter ++;
            let currentDistance = pathNode.distance;
            let x = pathNode.colIdx;
            let y = pathNode.rowIdx;
            let potentialParents = [[y,x-1], [y, x+1], [y-1,x], [y+1,x]];
            for (let entry in potentialParents){
                let a = potentialParents[entry][0];
                let b = potentialParents[entry][1];
                if (isInGrid(a,b) && grid[a][b]['distance'] == currentDistance - 1){
                    pathNode = grid[a][b];
                    shortestPath.push(pathNode);
                    break;
                }
            }
        }
        for (let i=0; i<shortestPath.length; i++){
            let myNode = shortestPath[i];
            push();
            fill(color(66,245,239));
            rect(myNode.colIdx*cellSize, myNode.rowIdx*cellSize, cellSize, cellSize, 5)
            pop();
        }
    }

    // select the next node to be the current node
    let shortestDist = Infinity;
    let nextNode = currentNode;
    for (let i=0; i<rows; i++){
        for (let j=0; j<cols; j++){
            let testingNode = grid[i][j];
            if (i == currentNode.rowIdx && j == currentNode.colIdx){continue}
            if (testingNode.visited == true){continue}
            if (grid[i][j]['distance']<shortestDist){
                shortestDist = grid[i][j]['distance'];
                nextNode = grid[i][j]
            }
        }
    }
    nextNode.current = true;
    }
      
}