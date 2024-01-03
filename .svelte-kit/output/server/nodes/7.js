import * as universal from '../entries/pages/logout/_page.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/logout/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/logout/+page.js";
export const imports = ["_app/immutable/nodes/7.b86e3b67.js","_app/immutable/chunks/environment.9aa685ef.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/navigation.cfe155e2.js","_app/immutable/chunks/singletons.4a9ba403.js","_app/immutable/chunks/index.9991ffd9.js"];
export const stylesheets = ["_app/immutable/assets/7.06886043.css"];
export const fonts = [];
