import * as universal from '../entries/pages/friends/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/friends/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/friends/+page.js";
export const imports = ["_app/immutable/nodes/4.471855d5.js","_app/immutable/chunks/environment.9aa685ef.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/index.9991ffd9.js","_app/immutable/chunks/stores.b51042c6.js","_app/immutable/chunks/singletons.4a9ba403.js"];
export const stylesheets = ["_app/immutable/assets/4.23d8e8f9.css"];
export const fonts = [];
