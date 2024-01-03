

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.c0a88cab.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/stores.380de3c2.js","_app/immutable/chunks/singletons.da3230c8.js","_app/immutable/chunks/index.9991ffd9.js"];
export const stylesheets = [];
export const fonts = [];
