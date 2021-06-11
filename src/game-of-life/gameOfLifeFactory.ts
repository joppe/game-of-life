import { Canvas } from '@/game-of-life/canvas/Canvas.type';
import { canvasFactory } from '@/game-of-life/canvas/canvasFactory';
import { Cell } from '@/game-of-life/cell/Cell.type';
import { cellRegistryFactory } from '@/game-of-life/cell/cellRegistryFactory';
import { controlsFactory } from '@/game-of-life/controls/controlsFactory';
import { GameOfLife } from '@/game-of-life/GameOfLife.type';
import { GameOfLifeOptions } from '@/game-of-life/GameOfLifeOptions.type';

const DEFAULT_OPTIONS: GameOfLifeOptions = {
    backgroundColor: '#6E8898',
    cellSize: 10,
    container: window.document.body,
    delay: 500,
    foregroundColor: '#D3D0CB',
    horizontalCells: 60,
    strokeColor: '#2E5266',
    verticalCells: 60,
};

export const gameOfLifeFactory: (
    start?: Cell[],
    config?: Partial<GameOfLifeOptions>,
) => void = (
    start: Cell[] = [],
    config: Partial<GameOfLifeOptions> = {},
): void => {
    const options: GameOfLifeOptions = { ...DEFAULT_OPTIONS, ...config };
    const canvas: Canvas = canvasFactory({
        container: options.container,
        size: {
            width: options.cellSize * options.horizontalCells,
            height: options.cellSize * options.verticalCells,
        },
    });
    const cellRegistry = cellRegistryFactory({
        cells: start,
    });

    function show(x: number, y: number): boolean {
        const count = cellRegistry.neighborCount(x, y);

        if (cellRegistry.exists(x, y)) {
            if (count === 2 || count === 3) {
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
                canvas.context.strokeRect(
                    x * options.cellSize,
                    y * options.cellSize,
                    options.cellSize,
                    options.cellSize,
                );
                canvas.context.fillRect(
                    x * options.cellSize,
                    y * options.cellSize,
                    options.cellSize,
                    options.cellSize,
                );
            }
        }

        canvas.context.fillStyle = options.foregroundColor;
        canvas.context.strokeStyle = options.strokeColor;

        for (const id in cellRegistry.get()) {
            const cell: Cell = <Cell>cellRegistry.findById(id);

            canvas.context.strokeRect(
                cell.x * options.cellSize,
                cell.y * options.cellSize,
                options.cellSize,
                options.cellSize,
            );
            canvas.context.fillRect(
                cell.x * options.cellSize,
                cell.y * options.cellSize,
                options.cellSize,
                options.cellSize,
            );
        }
    }

    const api: GameOfLife = {
        addCell(mouseX: number, mouseY: number): void {
            const rect: ClientRect = canvas.element.getBoundingClientRect();

            if (
                mouseX > rect.left &&
                mouseX < rect.right &&
                mouseY > rect.top &&
                mouseY < rect.bottom
            ) {
                const x: number = Math.floor(
                    (mouseX - rect.left) / options.cellSize,
                );
                const y: number = Math.floor(
                    (mouseY - rect.top) / options.cellSize,
                );

                if (cellRegistry.exists(x, y)) {
                    cellRegistry.remove(x, y);
                } else {
                    cellRegistry.add(x, y);
                }

                draw();
            }
        },

        redraw(): void {
            const cells: Cell[] = [];

            for (const id in cellRegistry.get()) {
                const cell: Cell = <Cell>cellRegistry.findById(id);
                const surroundingCells: Cell[] = cellRegistry.surroundingCells(
                    cell.x,
                    cell.y,
                );

                surroundingCells.concat([cell]).forEach((cell: Cell): void => {
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
        },
    };

    controlsFactory({
        api,
        container: options.container,
        delay: options.delay,
    });

    draw();
};
