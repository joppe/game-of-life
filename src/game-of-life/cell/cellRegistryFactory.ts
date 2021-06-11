import { Cell } from '@/game-of-life/cell/Cell.type';
import { CellCollection } from '@/game-of-life/cell/CellCollection.type';
import { CellRegistry } from '@/game-of-life/cell/CellRegistry.type';
import { CellRegistryFactoryOptions } from '@/game-of-life/cell/CellRegistryFactoryOptions.type';
import { Factory } from '@/game-of-life/Factory.type';

export const cellRegistryFactory: Factory<
    CellRegistry,
    CellRegistryFactoryOptions
> = (options: CellRegistryFactoryOptions): CellRegistry => {
    let store: CellCollection = {};

    function id(x: number, y: number): string {
        return `x${x}y${y}`;
    }

    const cellRegistry = {
        add(x: number, y: number): Cell {
            const cell: Cell = {
                x,
                y,
            };

            if (!this.exists(x, y)) {
                store[id(x, y)] = cell;
            }

            return cell;
        },

        remove(x: number, y: number): void {
            delete store[id(x, y)];
        },

        find(x: number, y: number): Cell | undefined {
            return store[id(x, y)];
        },

        findById(id: string): Cell | undefined {
            return store[id];
        },

        exists(x: number, y: number): boolean {
            return this.find(x, y) !== undefined;
        },

        get(): CellCollection {
            return store;
        },

        set(cells: Cell[]) {
            store = {};

            cells.forEach((cell: Cell) => {
                this.add(cell.x, cell.y);
            });
        },

        surroundingCells(x: number, y: number): Cell[] {
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
            const cells: Cell[] = this.surroundingCells(x, y);

            return cells.reduce((accumulator, neighbor) => {
                if (this.exists(neighbor.x, neighbor.y)) {
                    return accumulator + 1;
                }

                return accumulator;
            }, 0);
        },
    };

    cellRegistry.set(options.cells);

    return cellRegistry;
};
