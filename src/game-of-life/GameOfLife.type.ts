export type GameOfLife = {
    addCell(x: number, y: number): void;
    redraw(): void;
    reset(): void;
};
