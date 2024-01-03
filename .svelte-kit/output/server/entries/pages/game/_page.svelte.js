import { c as create_ssr_component, b as add_attribute, a as subscribe, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { s as showModal, a as showModal2, t as tileStructure, f as flagStructure } from "../../../chunks/stores2.js";
import { p as page } from "../../../chunks/stores.js";
import "devalue";
const Modal_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "dialog.svelte-iqe50v.svelte-iqe50v{max-width:32em;border-radius:0.2em;border:none;padding:0}dialog.svelte-iqe50v.svelte-iqe50v::backdrop{background:rgba(0, 0, 0, 0.3)}dialog.svelte-iqe50v>div.svelte-iqe50v{padding:1em}dialog[open].svelte-iqe50v.svelte-iqe50v{animation:svelte-iqe50v-zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)}@keyframes svelte-iqe50v-zoom{from{transform:scale(0.95)}to{transform:scale(1)}}dialog[open].svelte-iqe50v.svelte-iqe50v::backdrop{animation:svelte-iqe50v-fade 0.2s ease-out}@keyframes svelte-iqe50v-fade{from{opacity:0}to{opacity:1}}button.svelte-iqe50v.svelte-iqe50v{display:block}",
  map: null
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal_value = false } = $$props;
  let dialog;
  if ($$props.showModal_value === void 0 && $$bindings.showModal_value && showModal_value !== void 0)
    $$bindings.showModal_value(showModal_value);
  $$result.css.add(css$2);
  return `   <dialog class="svelte-iqe50v"${add_attribute("this", dialog, 0)}> <div class="svelte-iqe50v">${slots.header ? slots.header({}) : ``} <hr> ${slots.default ? slots.default({}) : ``} <hr>  <div style="display: flex; justify-content: space-between;"><button autofocus class="svelte-iqe50v" data-svelte-h="svelte-1goync1"><a href="/" style="text-decoration: none; color: inherit;">Exit the game</a></button> <button autofocus class="svelte-iqe50v" data-svelte-h="svelte-825fd8">Go Back!</button></div></div> </dialog>`;
});
const Modal2_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "dialog.svelte-1xbwco.svelte-1xbwco{max-width:20em;border-radius:0.5em;overflow:hidden;background-color:#50328d;box-shadow:0px 0px 20px rgba(0, 0, 0, 0.5);color:#fff;font-family:'Arial', sans-serif}dialog.svelte-1xbwco.svelte-1xbwco::backdrop{background:rgba(0, 0, 0, 0.5)}dialog.svelte-1xbwco>div.svelte-1xbwco{padding:1em}dialog[open].svelte-1xbwco.svelte-1xbwco{animation:svelte-1xbwco-zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)}@keyframes svelte-1xbwco-zoom{from{transform:scale(0.95)}to{transform:scale(1)}}dialog[open].svelte-1xbwco.svelte-1xbwco::backdrop{animation:svelte-1xbwco-fade 0.2s ease-out}@keyframes svelte-1xbwco-fade{from{opacity:0}to{opacity:1}}.custom_button1.svelte-1xbwco.svelte-1xbwco{position:relative;display:inline-block;margin:15px;padding:15px 30px;text-align:center;font-size:18px;letter-spacing:1px;text-decoration:none;color:#F3767C;background:transparent;cursor:pointer;transition:ease-out 0.5s;border:2px solid #725AC1;border-radius:10px;box-shadow:inset 0 0 0 0 #725AC1}.custom_button1.svelte-1xbwco.svelte-1xbwco:hover{color:#F3767C;box-shadow:inset 0 -100px 0 0 #725AC1;transform:scale(1.1)}.custom_button1.svelte-1xbwco.svelte-1xbwco:active{transform:scale(0.9)}.custom_button1.clicked{color:white;box-shadow:inset 0 -100px 0 0 #725AC1;transform:scale(1.12)}.custom_button2.svelte-1xbwco.svelte-1xbwco{position:relative;display:inline-block;margin:15px;padding:15px 30px;text-align:center;font-size:18px;letter-spacing:1px;text-decoration:none;color:#80FF80;background:transparent;cursor:pointer;transition:ease-out 0.5s;border:2px solid #725AC1;border-radius:10px;box-shadow:inset 0 0 0 0 #725AC1}.custom_button2.svelte-1xbwco.svelte-1xbwco:hover{color:#80FF80;box-shadow:inset 0 -100px 0 0 #725AC1;transform:scale(1.1)}.custom_button2.svelte-1xbwco.svelte-1xbwco:active{transform:scale(0.9)}.custom_button2.clicked{color:white;box-shadow:inset 0 -100px 0 0 #725AC1;transform:scale(1.12)}",
  map: null
};
const Modal2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal_value2 = false } = $$props;
  let dialog;
  if ($$props.showModal_value2 === void 0 && $$bindings.showModal_value2 && showModal_value2 !== void 0)
    $$bindings.showModal_value2(showModal_value2);
  $$result.css.add(css$1);
  return `   <dialog class="svelte-1xbwco"${add_attribute("this", dialog, 0)}> <div class="svelte-1xbwco">${slots.header ? slots.header({}) : ``} <hr> ${slots.default ? slots.default({}) : ``} <hr>  <div style="display: flex; justify-content: space-between;"><button autofocus class="custom_button1 svelte-1xbwco" data-svelte-h="svelte-1u6htj5"><a href="/" style="text-decoration: none; color: inherit;">Exit the game</a></button> <button autofocus class="custom_button2 svelte-1xbwco" data-svelte-h="svelte-lq1e7m">View Board Again</button></div></div> </dialog>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".sapper_table.svelte-vdwwxg{display:flex;flex-direction:column;width:35rem}.sapper_row.svelte-vdwwxg{display:flex;justify-content:space-evenly}.sapper_tile.svelte-vdwwxg{display:flex;justify-content:center;align-items:center;border:1px solid #ccc;aspect-ratio:1 / 1;width:-moz-available;width:-webkit-fill-available;width:fill-available;-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;image-rendering:pixelated}.sapper_tile_content.svelte-vdwwxg{font-size:8px}.custom_button1.svelte-vdwwxg{position:relative;display:inline-block;margin:15px;padding:15px 30px;text-align:center;font-size:18px;letter-spacing:1px;text-decoration:none;color:#725AC1;background:transparent;cursor:pointer;transition:ease-out 0.5s;border:2px solid #725AC1;border-radius:10px;box-shadow:inset 0 0 0 0 #725AC1}.custom_button1.svelte-vdwwxg:hover{color:white;box-shadow:inset 0 -100px 0 0 #725AC1;transform:scale(1.1)}.custom_button1.svelte-vdwwxg:active{transform:scale(0.9)}.custom_button1.clicked{color:white;box-shadow:inset 0 -100px 0 0 #725AC1;transform:scale(1.12)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_flagStructure;
  let $$unsubscribe_tileStructure;
  let $page, $$unsubscribe_page;
  $$unsubscribe_flagStructure = subscribe(flagStructure, (value) => value);
  $$unsubscribe_tileStructure = subscribe(tileStructure, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let showModal_value;
  showModal.subscribe((value) => {
    showModal_value = value;
  });
  let showModal_value2;
  showModal2.subscribe((value) => {
    showModal_value2 = value;
  });
  let max_y = 50;
  let max_x = 50;
  let mines = 20;
  for (let i = 0; i < max_y * max_x; i++) {
    tileStructure.update((dict) => {
      dict[i.toString()] = -1;
      return dict;
    });
    flagStructure.update((dict) => {
      dict[i.toString()] = false;
      return dict;
    });
  }
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-n20kvx_START -->${$$result.title = `<title>Game</title>`, ""}<meta name="description" content="About this app"><!-- HEAD_svelte-n20kvx_END -->`, ""}   <div class="text-column svelte-vdwwxg">${$page.url.hash == "#start" ? `<h1 data-svelte-h="svelte-4czae5">Choose game difficulty to start the game!</h1> <div class="svelte-vdwwxg"><p>Mines: ${escape(mines)}</p> <div class="button-container svelte-vdwwxg"><button class="custom_button1 mines svelte-vdwwxg" data-svelte-h="svelte-19kolcr">10 mines</button> <button class="custom_button1 mines svelte-vdwwxg" data-svelte-h="svelte-14zde7x">20 mines</button> <button class="custom_button1 mines svelte-vdwwxg" data-svelte-h="svelte-1vlxxnf">30 mines</button> <button class="custom_button1 mines svelte-vdwwxg" data-svelte-h="svelte-4of94z">50 mines</button></div></div> <div class="svelte-vdwwxg"><p>Field: ${escape(max_x)}x${escape(max_y)}</p> <div class="button-container svelte-vdwwxg"><button class="custom_button1 field svelte-vdwwxg" data-svelte-h="svelte-1g7v75r">10x10</button> <button class="custom_button1 field svelte-vdwwxg" data-svelte-h="svelte-guc8hh">20x20</button> <button class="custom_button1 field svelte-vdwwxg" data-svelte-h="svelte-ovr6f3">30x30</button> <button class="custom_button1 field svelte-vdwwxg" data-svelte-h="svelte-vmy4qn">50x50</button></div></div> <p data-svelte-h="svelte-1cfqa3s"></p> <button class="custom_button1 svelte-vdwwxg" data-svelte-h="svelte-1gx54c6">START THE GAME!</button> ` : `${$page.url.hash == "#sapper" ? `${`<h1 data-svelte-h="svelte-1vbizca">Creating a new game...</h1>`} ${``} ` : ``}`}    </div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      { showModal_value },
      {
        showModal_value: ($$value) => {
          showModal_value = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<h2 slot="header" data-svelte-h="svelte-n5ryyx">Exit Menu</h2>`;
        },
        default: () => {
          return `<ol class="definition-list" data-svelte-h="svelte-ppev9z"><p>Are you sure you want to exit the game?</p> <p>(Your game will not be saved and will count as loss)</p></ol>`;
        }
      }
    )}  ${validate_component(Modal2, "Modal2").$$render(
      $$result,
      { showModal_value2 },
      {
        showModal_value2: ($$value) => {
          showModal_value2 = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<h2 slot="header">${`${`Why are you here!?`}`}</h2>`;
        },
        default: () => {
          return `<ol class="definition-list"><p>Map Size: ${escape(max_x)}x${escape(max_y)}</p> <p>Difficulty: ${escape(mines)} mines</p> <p data-svelte-h="svelte-5t97dw">Exp: Null</p></ol>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_flagStructure();
  $$unsubscribe_tileStructure();
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
