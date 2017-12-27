import { IEqualityComparer } from "./IEqualityComparer"

export interface IAsyncParallel<TSource> extends AsyncIterable<TSource> {
    aggregate(func: (x: TSource, y: TSource) => TSource): Promise<TSource>,
    aggregate<TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>,
    aggregate<TAccumulate, TResult>(
            seed: TAccumulate,
            func: (x: TAccumulate, y: TSource) => TAccumulate,
            resultSelector: (x: TAccumulate) => TResult): Promise<TResult>,
    all(predicate: (x: TSource) => boolean): Promise<boolean>,
    any(predicate?: (x: TSource) => boolean): Promise<boolean>,
    average(this: IAsyncParallel<number>): Promise<number>
    average(selector: (x: TSource) => number): Promise<number>,
    contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>,
    count(predicate?: (x: TSource) => boolean): Promise<number>,
    elementAt(index: number): Promise<TSource>,
    elementAtOrDefault(index: number): Promise<TSource | null>,
    first(predicate?: (x: TSource) => boolean): Promise<TSource>,
    firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    last(predicate?: (x: TSource) => boolean): Promise<TSource>,
    lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    max(this: IAsyncParallel<number>): Promise<number | never>,
    max(selector: (x: TSource) => number): Promise<number | never>,
    min(this: IAsyncParallel<number>): Promise<number | never>,
    min(selector: (x: TSource) => number): Promise<number | never>,
    single(predicate?: (x: TSource) => boolean): Promise<TSource>,
    singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    sum(this: IAsyncParallel<number>): Promise<number>
    sum(this: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number>,
    toArray(): Promise<TSource[]>
    toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>>,
    toSet(): Promise<Set<TSource>>,
    [Symbol.asyncIterator]: () => AsyncIterableIterator<TSource>
}