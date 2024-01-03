import * as universal from '../entries/pages/shop/_page.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/shop/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/shop/+page.js";
export const imports = ["_app/immutable/nodes/10.9445cfb5.js","_app/immutable/chunks/environment.9aa685ef.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/each.e139ce12.js","_app/immutable/chunks/stores.78b0b726.js","_app/immutable/chunks/singletons.9da193b5.js","_app/immutable/chunks/index.9991ffd9.js","_app/immutable/chunks/navigation.a73baae4.js"];
export const stylesheets = ["_app/immutable/assets/10.6cf3cf06.css"];
export const fonts = [];
