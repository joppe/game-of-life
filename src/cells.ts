/**
 * Registry for cells
 */

import { IFactory } from 'app/factory';

export type CellCollection = {
    [index: string]: ICell;
};

export interface ICell {
    x: number;
    y: number;
}

export interface ICellRegistry {
    add(x: number, y: number): ICell;

    remove(x: number, y: number): void;

    find(x: number, y: number): ICell | undefined;

    findById(id: string): ICell | undefined;

    exists(x: number, y: number): boolean;

    get(): CellCollection;

    set(cells: ICell[]): void;

    surroundingCells(x: number, y: number): ICell[];

    neighborCount(x: number, y: number): number;
}

export interface ICellRegistryFactoryOptions {
    cells: ICell[];
}

export const cellRegistryFactory: IFactory<ICellRegistry, ICellRegistryFactoryOptions> = ((): IFactory<ICellRegistry, ICellRegistryFactoryOptions> => {
    return {
        create(options: ICellRegistryFactoryOptions): ICellRegistry {
            let store: CellCollection = {};

            function id(x: number, y: number): string {
                return `x${x}y${y}`;
            }

            const cellRegistry = {
                add(x: number, y: number): ICell {
                    if (this.exists(x, y)) {
                        return;
                    }

                    const cell: ICell = {
                        x,
                        y
                    };

                    store[id(x, y)] = cell;

                    return cell;
                },

                remove(x: number, y: number): void {
                    delete store[id(x, y)];
                },

                find(x: number, y: number): ICell | undefined {
                    return store[id(x, y)];
                },

                findById(id: string): ICell | undefined {
                    return store[id];
                },

                exists(x: number, y: number): boolean {
                    return this.find(x, y) !== undefined;
                },

                get(): CellCollection {
                    return store;
                },

                set(cells: ICell[]) {
                    store = {};

                    cells.forEach((cell: ICell) => {
                        this.add(cell.x, cell.y);
                    });
                },

                surroundingCells(x: number, y: number): ICell[] {
                    const top: number = y - 1;
                    const bottom: number = y + 1;
                    const right: number = x + 1;
                    const left: number = x - 1;

                    return [
                        { x: left, y: top }, // left-top
                        { x, y: top }, // top
                        { x: right, y: top }, // right-top
                        { x: right, y }, // right
                        { x: right, y: bottom }, // right-bottom
                        { x, y: bottom }, // bottom
                        { x: left, y: bottom }, // left-bottom
                        { x: left, y }, // left
                    ];
                },

                neighborCount(x: number, y: number): number {
                    const cells: ICell[] = this.surroundingCells(x, y);

                    return cells.reduce((accumulator, neighbor) => {
                        if (this.exists(neighbor.x, neighbor.y)) {
                            return accumulator + 1;
                        }

                        return accumulator;
                    }, 0);
                }
            };

            cellRegistry.set(options.cells);

            return cellRegistry;
        }
    };
})();
