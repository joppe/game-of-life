/**
 * OptionsInterface
 */
export interface IOptions {
    backgroundColor: string;
    cellSize: number;
    delay: number;
    foregroundColor: string;
    horizontalCells: number;
    strokeColor: string;
    verticalCells: number;
}

export const DEFAULT_OPTIONS: IOptions = {
    backgroundColor: '#6E8898',
    cellSize: 10,
    delay: 500,
    foregroundColor: '#D3D0CB',
    horizontalCells: 60,
    strokeColor: '#2E5266',
    verticalCells: 60
};
