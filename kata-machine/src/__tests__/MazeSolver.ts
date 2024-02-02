import maze_solver from "@code/MazeSolver";

test("maze solver", function () {
    const maze = ["xxxx x", "x  x x", "x xx x", "x    x", "x xxxx"];

    const mazeResult = [
        { x: 4, y: 0 },
        { x: 4, y: 1 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 3, y: 3 },
        { x: 2, y: 3 },
        { x: 1, y: 3 },
        { x: 1, y: 4 },
    ];

    // there is only one path through
    const result = maze_solver(maze, "x", { x: 4, y: 0 }, { x: 1, y: 4 });
    expect(drawPath(maze, result)).toEqual(drawPath(maze, mazeResult));
});

function drawPath(data: string[], path: Point[]) {
    const data2 = data.map((row) => row.split(""));
    path.forEach((p) => {
        if (data2[p.y] && data2[p.y][p.x]) {
            data2[p.y][p.x] = "*";
        }
    });
    return data2.map((d) => d.join(""));
}
