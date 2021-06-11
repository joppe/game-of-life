import { ControlsFactoryOptions } from '@/game-of-life/controls/ControlsFactoryOptions.type';
import { Factory } from '@/game-of-life/Factory.type';

export const controlsFactory: Factory<void, ControlsFactoryOptions> = (
    options: ControlsFactoryOptions,
): void => {
    let interval: number;

    const wrapper: HTMLDivElement = window.document.createElement('div');
    // wrapper.classList.add('py-3');
    options.container.appendChild(wrapper);

    const next: HTMLButtonElement = window.document.createElement('button');
    next.innerText = 'next';
    // next.classList.add('btn', 'btn-primary', 'mr-2');
    wrapper.appendChild(next);
    next.addEventListener('click', (): void => {
        window.clearInterval(interval);

        options.api.redraw();
    });

    const auto: HTMLButtonElement = window.document.createElement('button');
    auto.innerText = 'auto';
    // auto.classList.add('btn', 'btn-success', 'mr-2');
    wrapper.appendChild(auto);
    auto.addEventListener('click', (): void => {
        window.clearInterval(interval);

        interval = window.setInterval((): void => {
            options.api.redraw();
        }, options.delay);
    });

    options.container.addEventListener('click', (event: MouseEvent): void => {
        options.api.addCell(event.clientX, event.clientY);
    });
};
