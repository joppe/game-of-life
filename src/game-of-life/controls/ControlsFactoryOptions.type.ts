import { GameOfLife } from '@/game-of-life/GameOfLife.type';

export type ControlsFactoryOptions = {
    api: GameOfLife;
    container: HTMLElement;
    delay: number;
};
