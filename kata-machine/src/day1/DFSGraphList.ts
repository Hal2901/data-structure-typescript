function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    if (curr === needle) {
        return true;
    }

    if (seen[curr]) {
        return false;
    }

    seen[curr] = true;

    // pre
    path.push(curr);

    if (curr === needle) {
        return true;
    }
    //recurse
    const list = graph[curr];

    for (let i = 0; i < list.length; ++i) {
        const edge = list[i];
        if (walk(graph, edge.to, needle, seen, path)) {
            path.push(edge.to);
            break;
        }
    }
    //post
    path.pop();

    return false;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    walk(graph, source, needle, seen, path);

    if (path.length === 0) {
        return null;
    }

    return path;
}
