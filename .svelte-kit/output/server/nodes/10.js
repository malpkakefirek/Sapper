import * as universal from '../entries/pages/shop/_page.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/shop/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/shop/+page.js";
export const imports = ["_app/immutable/nodes/10.63f6ae42.js","_app/immutable/chunks/environment.9aa685ef.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/each.e139ce12.js","_app/immutable/chunks/stores.380de3c2.js","_app/immutable/chunks/singletons.da3230c8.js","_app/immutable/chunks/index.9991ffd9.js","_app/immutable/chunks/navigation.b63cbbf1.js"];
export const stylesheets = ["_app/immutable/assets/10.6cf3cf06.css"];
export const fonts = [];
