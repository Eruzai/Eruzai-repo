
const WALL = 'X';
const GOAL = 'G';
const VISITED = '1';

let maze1 = [
    ['S', ' ', 'X'],
    ['X', ' ', 'X'],
    ['X', ' ', 'G']
];

let maze2 = [
    ['S', ' ', 'X', ' ', ' '],
    [' ', 'X', 'X', 'X', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', 'X', 'X', 'X', ' '],
    [' ', ' ', ' ', 'X', 'G']
];

/**
 * Draws a map to the console.
 * 
 * @param {Array<Array<String>>} maze 
 */
let draw = (maze) => {
    let drawing = '';

    const rows = maze.length;
    const columns = maze[0].length; // We should be doing a check to make sure maze[0] actually exists.

    // Draw top border.
    drawing += '+';
    for (let i = 0; i < columns; i++) {
        drawing += '-';
    }
    drawing += '+\n';

    // Draw maze contents
    for (let i = 0; i < rows; i++) {
        drawing += '|'; // Left border
        for (let j = 0; j < columns; j++) {
            drawing += maze[i][j];
        }
        drawing += '|\n'; // Right border
    }

    // Draw bottom border.
    drawing += '+';
    for (let i = 0; i < columns; i++) {
        drawing += '-';
    }
    drawing += '+\n';

    console.log(drawing);
}

/**
 * Perform a recursive search of a maze.  Assumes the start is in the top-left corner.
 * 
 * @param {Array<Array<String>>} maze 
 * @param {number} x 
 * @param {number} y 
 * @returns {boolean|Array<Array<String>>} The completed maze, or a boolean if search is still in progress.
 */
let traverseMaze = (maze, x, y) => {
    // Negative exit cases
    if (
        x < 0 // Out of bounds left
        || x >= maze[0].length // OOB right
        || y < 0 // OOB up
        || y >= maze.length // OOB down
        || maze[y][x] === WALL
        || maze[y][x] === VISITED
    ) {
        return false;
    }

    // Positive exit case
    if (maze[y][x] === GOAL) {
        return true;
    }

    // Set the current cell to visited so subsequent recursions know to skip it.
    // This prevents infite loop situations (such as look left, look right, look left, ..., etc.).
    maze[y][x] = VISITED;

    // |= performs a logical OR assignment, so if any of the recursive calls returns true
    // then foundTheExit will be true even if the other calls are false
    foundTheExit = traverseMaze(maze, x - 1, y); // Look left
    foundTheExit |= traverseMaze(maze, x, y - 1); // Look up
    foundTheExit |= traverseMaze(maze, x + 1, y); // Look right 
    foundTheExit |= traverseMaze(maze, x, y + 1); // Look down

    if (x === 0 && y === 0) {
        // If the current recursive call is the 0,0 (starting) point, that means we've
        // completed all other recursive calls and we can return the maze.
        maze[y][x] = 'S'; // Just set it back to 'S' for asthetic purposes.
        return maze;
    }
    else if (foundTheExit) {
        // Update the current cell as part of the solution path.
        maze[y][x] = GOAL;
        return true;
    }
    else {
        // We haven't found the solution yet.
        return false;
    }
}

const solvedMaze1 = traverseMaze(maze1, 0, 0);
const solvedMaze2 = traverseMaze(maze2, 0, 0);

draw(solvedMaze1);
draw(solvedMaze2);