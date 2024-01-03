import * as universal from '../entries/pages/logout/_page.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/logout/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/logout/+page.js";
export const imports = ["_app/immutable/nodes/7.f114214f.js","_app/immutable/chunks/environment.9aa685ef.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/navigation.a73baae4.js","_app/immutable/chunks/singletons.9da193b5.js","_app/immutable/chunks/index.9991ffd9.js"];
export const stylesheets = ["_app/immutable/assets/7.06886043.css"];
export const fonts = [];
