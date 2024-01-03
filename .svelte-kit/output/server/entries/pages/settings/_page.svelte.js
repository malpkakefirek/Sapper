import { c as create_ssr_component, a as subscribe, e as escape } from "../../../chunks/ssr.js";
import { r as readable } from "../../../chunks/index.js";
import { p as page } from "../../../chunks/stores.js";
const time = readable(/* @__PURE__ */ new Date(), function start(set) {
  const interval = setInterval(() => {
    set(/* @__PURE__ */ new Date());
  }, 1e3);
  return function stop() {
    clearInterval(interval);
  };
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "div.svelte-1hzn8rv{width:100%;height:100%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $time, $$unsubscribe_time;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_time = subscribe(time, (value) => $time = value);
  const formatter = new Intl.DateTimeFormat(
    "en",
    {
      hour12: false,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    }
  );
  let mouse = { x: 0, y: 0 };
  $$result.css.add(css);
  $$unsubscribe_page();
  $$unsubscribe_time();
  return `${$$result.head += `<!-- HEAD_svelte-n20kvx_START -->${$$result.title = `<title>Game</title>`, ""}<meta name="description" content="About this app"><!-- HEAD_svelte-n20kvx_END -->`, ""}  <div class="text-column svelte-1hzn8rv">The mouse position is ${escape(mouse.x)} x ${escape(mouse.y)} <h1>You are in <bold>Settings${escape($page.url.hash)}</bold> page!</h1> <p data-svelte-h="svelte-82huk9">mhm game gaming game game game game game game game game game here</p> <pre>time: ${escape(formatter.format($time))} nice :)</pre> <p data-svelte-h="svelte-1foh4ym">Need change. static to dynamic.</p> <pre data-svelte-h="svelte-8v4j80">DONE</pre> </div>`;
});
export {
  Page as default
};
