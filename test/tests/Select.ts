import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"

describe("select", () => {
    itEnumerable<string>("select parseInt", (asEnumerable) => {
        expect(asEnumerable(["1", "2", "3"]).select(Number.parseInt).toArray()).toEqual([1, 2, 3])
    })

    itAsync("select parseInt Async", async () => {
        expect(await asAsync(["1", "2", "3"]).select(Number.parseInt).toArray()).toEqual([1, 2, 3])
    })

    itAsync("select parseInt Parallel", async () => {
        expect(await asParallel(["1", "2", "3"]).select(Number.parseInt).toArray()).toEqual([1, 2, 3])
    })

    itEnumerable<string>("select length", (asEnumerable) => {
        expect(asEnumerable(["1", "22", "333"]).select("length").toArray()).toEqual([1, 2, 3])
    })

    itAsync("select length async", async () => {
        expect(await asAsync(["1", "22", "333"]).select("length").toArray()).toEqual([1, 2, 3])
    })

    itAsync("select length parallel", async () => {
        expect(await asParallel(["1", "22", "333"]).select("length").toArray()).toEqual([1, 2, 3])
    })
})
