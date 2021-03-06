import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"
import { EqualityComparer } from "../../src/index";

describe("contains", () => {
    itEnumerable<string | number>("Countains", (asEnumerable) => {
        const array = asEnumerable([1, "2", "3"])

        expect(array.contains(2)).toBe(false)
        expect(array.contains(1)).toBe(true)
    })

    itAsync("CountainsAsync", async () => {
        const array = asAsync([1, "2", "3"])

        expect(await array.contains(2)).toBe(false)
        expect(await array.contains(1)).toBe(true)
    })

    itAsync("Countains Parallel", async () => {
        const array = asParallel([1, "2", "3"])

        expect(await array.contains(2)).toBe(false)
        expect(await array.contains(1)).toBe(true)
    })

    itEnumerable<string | number>("Contains With Comparer", (asEnumerable) => {
        const array = asEnumerable([1, "2", "3"])

        expect(array.contains(2, EqualityComparer)).toBe(true)
        expect(array.contains("2", EqualityComparer)).toBe(true)
        expect(array.contains(4, EqualityComparer)).toBe(false)
    })

    itAsync("Contains With Comparer Async", async () => {
        const array = asAsync([1, "2", "3"])

        expect(await array.contains(2, EqualityComparer)).toBe(true)
        expect(await array.contains("2", EqualityComparer)).toBe(true)
        expect(await array.contains(4, EqualityComparer)).toBe(false)
    })

    itAsync("Contains With Comparer Parallel", async () => {
        const array = asParallel([1, "2", "3"])

        expect(await array.contains(2, EqualityComparer)).toBe(true)
        expect(await array.contains("2", EqualityComparer)).toBe(true)
        expect(await array.contains(4, EqualityComparer)).toBe(false)
    })

    itEnumerable("contains empty to be false", (asEnumerable) =>
        expect(asEnumerable([] as number[]).contains(0)).toBe(false))

    itAsync("contains empty to be false async", async () => {
        const value = await asAsync([] as number[]).contains(0)
        expect(value).toBe(false)
    })

    itAsync("contains empty to be false async", async () => {
        const value = await asParallel([] as number[]).contains(0)
        expect(value).toBe(false)
    })

    itEnumerable("contains false", (asEnumerable) =>
        expect(asEnumerable([1, 2]).contains(0)).toBe(false))

    itAsync("Contains False Async", async () =>
        expect(await asAsync([1, 2]).contains(0)).toBe(false))

    itAsync("Contains False Parallel", async () =>
        expect(await asParallel([1, 2]).contains(0)).toBe(false))

    itEnumerable("contains true", (asEnumerable) =>
        expect(asEnumerable([1, 2]).contains(1)).toBe(true))

    it("Contains True Async", async () =>
        expect(await asAsync([1, 2]).contains(1)).toBe(true))

    it("Contains True Parallel", async () =>
        expect(await asParallel([1, 2]).contains(1)).toBe(true))

})
