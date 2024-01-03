

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.680f1a26.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/stores.b51042c6.js","_app/immutable/chunks/singletons.4a9ba403.js","_app/immutable/chunks/index.9991ffd9.js"];
export const stylesheets = [];
export const fonts = [];
