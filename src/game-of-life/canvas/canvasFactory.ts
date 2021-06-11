import { Canvas } from '@/game-of-life/canvas/Canvas.type';
import { CanvasOptions } from '@/game-of-life/canvas/CanvasOptions.type';
import { Factory } from '@/game-of-life/Factory.type';
import { Size } from '@/game-of-life/Size.type';

export const canvasFactory: Factory<Canvas, CanvasOptions> = (
    options: CanvasOptions,
): Canvas => {
    const element: HTMLCanvasElement = window.document.createElement('canvas');
    const context: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
        element.getContext('2d')
    );

    element.setAttribute('width', String(options.size.width));
    element.setAttribute('height', String(options.size.height));

    options.container.appendChild(element);

    return {
        element,
        context,
        clear(size: Size = options.size): void {
            context.clearRect(0, 0, size.width, size.height);
        },
    };
};
