import * as universal from '../entries/pages/settings/_page.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/settings/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/settings/+page.js";
export const imports = ["_app/immutable/nodes/9.55f9af62.js","_app/immutable/chunks/environment.9aa685ef.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/index.9991ffd9.js","_app/immutable/chunks/stores.78b0b726.js","_app/immutable/chunks/singletons.9da193b5.js"];
export const stylesheets = ["_app/immutable/assets/4.23d8e8f9.css"];
export const fonts = [];