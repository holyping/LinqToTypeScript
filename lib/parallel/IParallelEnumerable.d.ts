import { IAsyncParallel, IComparer, IConstructor, IEqualityComparer, IGrouping, ITuple } from "../shared/shared";
import { IAsyncEqualityComparer } from "./../shared/IAsyncEqualityComparer";
import { TypedData } from "./TypedData";
export interface IParallelEnumerable<TSource> extends IAsyncParallel<TSource> {
    readonly dataFunc: TypedData<TSource>;
    concat(second: IAsyncParallel<TSource>): IParallelEnumerable<TSource>;
    distinct(comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    each(action: (x: TSource) => void): IParallelEnumerable<TSource>;
    except(second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    groupBy(keySelector: (x: TSource) => number): IParallelEnumerable<IGrouping<number, TSource>>;
    groupBy(keySelector: (x: TSource) => string): IParallelEnumerable<IGrouping<string, TSource>>;
    groupBy<TKey>(keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>;
    groupByWithSel<TElement>(keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<number, TElement>>;
    groupByWithSel<TElement>(keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string, TElement>>;
    groupByWithSel<TKey, TElement>(keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>;
    intersect(second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    joinByKey<TInner, TKey, TResult>(inner: IAsyncParallel<TInner>, outerKeySelector: (x: TSource) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TSource, y: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IParallelEnumerable<TResult>;
    ofType(type: "object"): IParallelEnumerable<Object>;
    ofType(type: "function"): IParallelEnumerable<Function>;
    ofType(type: "symbol"): IParallelEnumerable<Symbol>;
    ofType(type: "boolean"): IParallelEnumerable<boolean>;
    ofType(type: "number"): IParallelEnumerable<number>;
    ofType(type: "string"): IParallelEnumerable<string>;
    ofType<TResult>(type: IConstructor<TResult>): IParallelEnumerable<TResult>;
    orderBy(predicate: (x: TSource) => number | string): IParallelEnumerable<TSource>;
    orderBy(predicate: (x: TSource) => number, comparer: IComparer<number>): IParallelEnumerable<TSource>;
    orderBy(predicate: (x: TSource) => string, comparer: IComparer<string>): IParallelEnumerable<TSource>;
    orderByDescending(predicate: (x: TSource) => number | string): IParallelEnumerable<TSource>;
    orderByDescending(predicate: (x: TSource) => number, comparer: IComparer<number>): IParallelEnumerable<TSource>;
    orderByDescending(predicate: (x: TSource) => string, comparer: IComparer<string>): IParallelEnumerable<TSource>;
    reverse(): IParallelEnumerable<TSource>;
    select<OUT>(selector: (x: TSource) => OUT): IParallelEnumerable<OUT>;
    select<TKey extends keyof TSource>(key: TKey): IParallelEnumerable<TSource[TKey]>;
    selectAsync<OUT>(selector: (x: TSource) => Promise<OUT>): IParallelEnumerable<OUT>;
    selectAsync<TKey extends keyof TSource, TResult>(this: IParallelEnumerable<{
        [key: string]: Promise<TResult>;
    }>, selector: TKey): IParallelEnumerable<TResult>;
    selectMany<OUT>(selector: (x: TSource) => Iterable<OUT>): IParallelEnumerable<OUT>;
    selectMany<TBindedSource extends {
        [key: string]: Iterable<TOut>;
    }, TOut>(this: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>;
    selectManyAsync<OUT>(selector: (x: TSource) => Promise<Iterable<OUT>>): IParallelEnumerable<OUT>;
    sequenceEquals(second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    sequenceEqualsAsync(second: IAsyncParallel<TSource>, comparer?: IAsyncEqualityComparer<TSource>): Promise<boolean>;
    skip(count: number): IParallelEnumerable<TSource>;
    skipWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
    skipWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>;
    take(amount: number): IParallelEnumerable<TSource>;
    takeWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
    takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>;
    union(second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    unionAsync(second: IAsyncParallel<TSource>, comparer?: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    where(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
    whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>;
    zip<TSecond, TResult>(second: IAsyncParallel<TSecond>, resultSelector: (x: TSource, y: TSecond) => TResult): IParallelEnumerable<TResult>;
    zip<TSecond>(second: IAsyncParallel<TSecond>): IParallelEnumerable<ITuple<TSource, TSecond>>;
    zipAsync<TSecond, TResult>(second: IAsyncParallel<TSecond>, resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IParallelEnumerable<TResult>;
}
