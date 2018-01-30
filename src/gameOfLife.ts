/**
 * Create the Game of Life
 */

import { canvasFactory, ICanvas } from 'app/canvas';
import { DEFAULT_OPTIONS, IOptions } from 'app/options';
import { cellRegistryFactory, ICell } from 'app/cells';
import { controlFactory } from 'app/controls';

export interface IGameOfLifeApi {
    addCell(x: number, y: number): void;
    redraw(): void;
    reset(): void;
}

export const gameOfLife: (start?: ICell[], config?: Partial<IOptions>) => void = (start: ICell[] = [], config: Partial<IOptions> = {}): void => {
    const options: IOptions = {...DEFAULT_OPTIONS, ...config};
    const canvas: ICanvas = canvasFactory.create({
        container: options.container,
        width: options.cellSize * options.horizontalCells,
        height: options.cellSize * options.verticalCells
    });
    const cellRegistry = cellRegistryFactory.create({
        cells: start
    });

    function show(x: number, y: number): boolean {
        const count = cellRegistry.neighborCount(x, y);

        if (cellRegistry.exists(x, y)) {
            if (count === 2 || count == 3) {
                return true;
            }
        } else if (count === 3) {
            return true;
        }

        return false;
    }

    function draw(): void {
        canvas.clear();

        canvas.context.fillStyle = options.backgroundColor;

        for (let x = 0; x < options.horizontalCells; x += 1) {
            for (let y = 0; y < options.verticalCells; y += 1) {
                canvas.context.strokeRect(x * options.cellSize, y * options.cellSize, options.cellSize, options.cellSize);
                canvas.context.fillRect(x * options.cellSize, y * options.cellSize, options.cellSize, options.cellSize);
            }
        }

        canvas.context.fillStyle = options.foregroundColor;
        canvas.context.strokeStyle = options.strokeColor;

        for (const id in cellRegistry.get()) {
            const cell: ICell = cellRegistry.findById(id);

            canvas.context.strokeRect(cell.x * options.cellSize, cell.y * options.cellSize, options.cellSize, options.cellSize);
            canvas.context.fillRect(cell.x * options.cellSize, cell.y * options.cellSize, options.cellSize, options.cellSize);
        }
    }

    const api: IGameOfLifeApi = {
        addCell(mouseX: number, mouseY: number): void {
            const rect: ClientRect = canvas.element.getBoundingClientRect();

            if (
                mouseX > rect.left && mouseX < rect.right &&
                mouseY > rect.top && mouseY < rect.bottom
            ) {
                const x: number = Math.floor((mouseX - rect.left) / options.cellSize);
                const y: number = Math.floor((mouseY - rect.top) / options.cellSize);

                if (cellRegistry.exists(x, y)) {
                    cellRegistry.remove(x, y);
                } else {
                    cellRegistry.add(x, y);
                }

                draw();
            }
        },

        redraw(): void {
            const cells: ICell[] = [];

            for (const id in cellRegistry.get()) {
                const cell: ICell = cellRegistry.findById(id);
                const surroundingCells:ICell[] = cellRegistry.surroundingCells(cell.x, cell.y);

                surroundingCells.concat([cell]).forEach((cell: ICell): void => {
                    if (show(cell.x, cell.y)) {
                        cells.push(cell);
                    }
                });
            }

            cellRegistry.set(cells);

            draw();
        },

        reset(): void {
            cellRegistry.set([]);

            draw();
        }
    };

    controlFactory.create({
        api,
        container: options.container,
        delay: options.delay
    });

    draw();
};
