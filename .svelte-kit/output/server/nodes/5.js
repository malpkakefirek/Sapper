import * as universal from '../entries/pages/game/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/game/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/game/+page.js";
export const imports = ["_app/immutable/nodes/5.b6da5d45.js","_app/immutable/chunks/environment.9aa685ef.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/each.e139ce12.js","_app/immutable/chunks/stores.51db46f6.js","_app/immutable/chunks/index.9991ffd9.js","_app/immutable/chunks/stores.b51042c6.js","_app/immutable/chunks/singletons.4a9ba403.js","_app/immutable/chunks/navigation.cfe155e2.js"];
export const stylesheets = ["_app/immutable/assets/5.4a1afbcf.css"];
export const fonts = [];
