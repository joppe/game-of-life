/**
 * Interface for a factory method
 */

export interface IFactory<T, K> {
    create(options: K): T;
}
