

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.69394496.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/stores.78b0b726.js","_app/immutable/chunks/singletons.9da193b5.js","_app/immutable/chunks/index.9991ffd9.js"];
export const stylesheets = [];
export const fonts = [];
