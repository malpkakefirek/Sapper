import * as universal from '../entries/pages/register/_page.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/register/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/register/+page.js";
export const imports = ["_app/immutable/nodes/8.28c04afa.js","_app/immutable/chunks/environment.9aa685ef.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js","_app/immutable/chunks/validators.09245258.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.9da193b5.js","_app/immutable/chunks/index.9991ffd9.js","_app/immutable/chunks/navigation.a73baae4.js"];
export const stylesheets = ["_app/immutable/assets/6.7f289a16.css"];
export const fonts = [];
