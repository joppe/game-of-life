import { IFactory } from 'app/factory';

/**
 * A simple canvas factory
 */

export interface ICanvas {
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    clear(): void;
}

export interface ICanvasFactoryOptions {
    container: HTMLElement;
    width: number;
    height: number;
}

export const canvasFactory: IFactory<ICanvas, ICanvasFactoryOptions> = ((): IFactory<ICanvas, ICanvasFactoryOptions> => {
    return {
        create(options: ICanvasFactoryOptions): ICanvas {
            const element: HTMLCanvasElement = window.document.createElement('canvas');
            const context: CanvasRenderingContext2D = element.getContext('2d');

            element.setAttribute('width', String(options.width));
            element.setAttribute('height', String(options.height));

            options.container.appendChild(element);

            return {
                element,
                context,
                clear(): void {
                    context.clearRect(0, 0, options.width, options.height);
                }
            };
        }
    };
})();
