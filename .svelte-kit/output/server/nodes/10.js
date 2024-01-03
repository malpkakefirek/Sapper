import * as universal from '../entries/pages/shop/_page.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/shop/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/shop/+page.js";
export const imports = ["_app/immutable/nodes/10.f8463034.js","_app/immutable/chunks/environment.9aa685ef.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/each.e139ce12.js","_app/immutable/chunks/stores.b51042c6.js","_app/immutable/chunks/singletons.4a9ba403.js","_app/immutable/chunks/index.9991ffd9.js","_app/immutable/chunks/navigation.cfe155e2.js"];
export const stylesheets = ["_app/immutable/assets/10.6cf3cf06.css"];
export const fonts = [];
