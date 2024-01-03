import * as universal from '../entries/pages/logout/_page.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/logout/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/logout/+page.js";
export const imports = ["_app/immutable/nodes/7.cfd6f5c0.js","_app/immutable/chunks/environment.9aa685ef.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/navigation.b63cbbf1.js","_app/immutable/chunks/singletons.da3230c8.js","_app/immutable/chunks/index.9991ffd9.js"];
export const stylesheets = ["_app/immutable/assets/7.06886043.css"];
export const fonts = [];
