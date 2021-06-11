import { ControlsFactoryOptions } from '@/game-of-life/controls/ControlsFactoryOptions.type';
import { Factory } from '@/game-of-life/Factory.type';

export const controlsFactory: Factory<void, ControlsFactoryOptions> = (
    options: ControlsFactoryOptions,
): void => {
    let interval: number;
    let delay = options.delay;

    function run(): void {
        window.clearInterval(interval);

        interval = window.setInterval((): void => {
            options.api.redraw();
        }, delay);
    }

    const wrapper: HTMLDivElement = window.document.createElement('div');
    options.container.appendChild(wrapper);

    const next: HTMLButtonElement = window.document.createElement('button');
    next.innerText = 'next';
    wrapper.appendChild(next);
    next.addEventListener('click', (): void => {
        window.clearInterval(interval);

        options.api.redraw();
    });

    const speed: HTMLInputElement = window.document.createElement('input');
    speed.setAttribute('type', 'range');
    speed.setAttribute('min', '20');
    speed.setAttribute('step', '10');
    speed.setAttribute('max', '1000');

    speed.value = String(options.delay);

    wrapper.appendChild(speed);
    speed.addEventListener('change', (): void => {
        delay = parseInt(<string>speed.value, 10);

        run();
    });

    const reset: HTMLButtonElement = window.document.createElement('button');
    reset.innerText = 'reset';
    wrapper.appendChild(reset);
    reset.addEventListener('click', (): void => {
        window.clearInterval(interval);

        options.api.reset();
    });

    const auto: HTMLButtonElement = window.document.createElement('button');
    auto.innerText = 'auto';
    wrapper.appendChild(auto);
    auto.addEventListener('click', run);

    options.container.addEventListener('click', (event: MouseEvent): void => {
        options.api.addCell(event.clientX, event.clientY);
    });
};
