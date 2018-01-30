/**
 * Create the Game of Life
 */

import { canvasFactory, ICanvas } from 'app/canvas';
import { DEFAULT_OPTIONS, IOptions } from 'app/options';
import { cellRegistryFactory, ICell } from 'app/cells';

export const gameOfLife: (start?: ICell[], config?: Partial<IOptions>) => void = (start: ICell[] = [], config: Partial<IOptions> = {}): void => {
    const options: IOptions = {...DEFAULT_OPTIONS, ...config};
    const container: HTMLBodyElement = window.document.querySelector('body');
    const canvas: ICanvas = canvasFactory.create({
        container: container,
        width: options.cellSize * options.horizontalCells,
        height: options.cellSize * options.verticalCells
    });
    const cellRegistry = cellRegistryFactory.create({
        cells: start
    });
    const next = window.document.createElement('button');
    next.innerText = 'next';
    container.appendChild(next);

    function draw() {
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

    function redraw() {
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
    }

    draw();

    next.addEventListener('click', redraw);
};
