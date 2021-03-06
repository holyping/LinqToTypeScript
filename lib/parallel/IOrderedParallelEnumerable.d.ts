import { IComparer, RecOrdMap } from "../shared/shared";
import { IParallelEnumerable } from "./IParallelEnumerable";
export interface IOrderedParallelEnumerable<TSource> extends IParallelEnumerable<TSource> {
    thenBy: {
        (keySelector: (x: TSource) => string | number): IOrderedParallelEnumerable<TSource>;
        (keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedParallelEnumerable<TSource>;
        (keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedParallelEnumerable<TSource>;
    };
    thenByAsync: {
        (keySelector: (x: TSource) => Promise<string | number>): IOrderedParallelEnumerable<TSource>;
        (keySelector: (x: TSource) => Promise<number>, comparer: IComparer<number>): IOrderedParallelEnumerable<TSource>;
        (keySelector: (x: TSource) => Promise<string>, comparer: IComparer<string>): IOrderedParallelEnumerable<TSource>;
    };
    thenByDescending: {
        (keySelector: (x: TSource) => string | number): IOrderedParallelEnumerable<TSource>;
        (keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedParallelEnumerable<TSource>;
        (keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedParallelEnumerable<TSource>;
    };
    thenByDescendingAsync: {
        (keySelector: (x: TSource) => Promise<string | number>): IOrderedParallelEnumerable<TSource>;
        (keySelector: (x: TSource) => Promise<number>, comparer: IComparer<number>): IOrderedParallelEnumerable<TSource>;
        (keySelector: (x: TSource) => Promise<string>, comparer: IComparer<string>): IOrderedParallelEnumerable<TSource>;
    };
    getMap: {
        (): Promise<RecOrdMap<TSource>>;
    };
}
