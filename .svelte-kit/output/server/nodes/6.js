import * as universal from '../entries/pages/login/_page.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/login/+page.js";
export const imports = ["_app/immutable/nodes/6.42c5ed2b.js","_app/immutable/chunks/environment.9aa685ef.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/validators.3c2ecd35.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.4a9ba403.js","_app/immutable/chunks/index.9991ffd9.js","_app/immutable/chunks/navigation.cfe155e2.js"];
export const stylesheets = ["_app/immutable/assets/6.7f289a16.css"];
export const fonts = [];
