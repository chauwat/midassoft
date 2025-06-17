const memo: {[key: string]: boolean} = {}

function minEnergy(
    start: number, shops: number[], stations: number[], target: number
): number {
    // Base case
    if (start == target && shops.length == 0) {
        return 0
    }

    const key = `${start}.${shops}`
    if (memo[key]) {
        return Infinity
    }
    memo[key] = true

    let minPathIndex = Math.min(...shops, target)
    let maxPathIndex = Math.max(...shops, target)
    console.log(start, minPathIndex, maxPathIndex)

    // Copy shop
    let remainingShops = [...shops];

    // Mark Visit: Remove that shops index
    if (remainingShops.includes(start)) {
        remainingShops.splice(remainingShops.indexOf(start), 1);
    }

    let totalEnergy: number[] = []

    // Action at anytime: Left, Right, Go to Station if at A
    // Go Left
    if (start > minPathIndex) {
        console.log("Walk L", start)
        totalEnergy.push(
            minEnergy(start - 1, remainingShops, stations, target, 1) + 1
        )
    }

    // Go Right
    if (start < maxPathIndex) {
        console.log("Walk R", start)
        totalEnergy.push(
            minEnergy(start + 1, remainingShops, stations, target, 2) + 1
        )
    }

    // Go to stations
    if (stations.includes(start)) {
        for (let stationOut of stations) {
            if (start == stationOut) {
                continue
            }

            if (stationOut < minPathIndex || stationOut > maxPathIndex) {
                continue
            }

            console.log("Go Station", start)

            totalEnergy.push(
                minEnergy(stationOut, remainingShops, stations, target)
            )
        }
    }

    if (totalEnergy.length == 0) {
        return Infinity
    }

    return Math.min(...totalEnergy)
}

// const test1 = {
//     starts: 1,
//     shops: [6],
//     stations: [3, 5],
//     target: 2
// }

const test1 = {
    starts: 2,
    shops: [4, 9],
    stations: [3, 6, 8],
    target: 7
}

console.log(minEnergy(test1.starts, test1.shops, test1.stations, test1.target))