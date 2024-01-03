import { readable } from 'svelte/store';
import { writable } from 'svelte/store';

export const tileStructure = writable({"":""});
export const flagStructure = writable({"":""});

export const showModal = writable(false);
export const showModal2 = writable(false);

export const GlobalMax_x = writable(50);
export const GlobalMax_y = writable(50);
export const GlobalMines = writable(10);
export const GlobalGameStarted = writable(0);


export const time = readable(new Date(), function start(set) {
    const interval = setInterval(() => {
        set(new Date());
    }, 1000);

    return function stop() {
        clearInterval(interval);
    };
});