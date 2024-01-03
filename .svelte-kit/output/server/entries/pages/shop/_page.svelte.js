import { c as create_ssr_component, b as add_attribute, e as escape, f as each, a as subscribe, v as validate_component } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
const Item_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".item-container.svelte-1laxkz8{display:flex;flex-direction:column;align-items:center;text-align:center;margin:10px}.button-container.svelte-1laxkz8{display:flex;justify-content:space-between}.custom_button1.svelte-1laxkz8{position:relative;flex:1;display:inline-block;margin:5px;padding:6px;text-align:center;font-size:14px;letter-spacing:1px;text-decoration:none;color:#CCAC00;background:transparent;cursor:pointer;transition:ease-out 0.5s;border:2px solid #CCAC00;border-radius:10px;box-shadow:inset 0 0 0 0 #CCAC00}.custom_button1.svelte-1laxkz8:hover{color:white;box-shadow:inset 0 -100px 0 0 #CCAC00;transform:scale(1.1)}.custom_button1.svelte-1laxkz8:active{transform:scale(0.9)}.custom_button2.svelte-1laxkz8{position:relative;flex:1;display:inline-block;margin:5px;padding:6px;text-align:center;font-size:14px;letter-spacing:1px;text-decoration:none;color:#4CAF50;background:transparent;cursor:pointer;transition:ease-out 0.5s;border:2px solid #4CAF50;border-radius:10px;box-shadow:inset 0 0 0 0 #4CAF50}.custom_button2.svelte-1laxkz8:hover{color:white;box-shadow:inset 0 -100px 0 0 #4CAF50;transform:scale(1.1)}.custom_button2.svelte-1laxkz8:active{transform:scale(0.9)}",
  map: null
};
const Item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { item } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$3);
  return `<div class="item-container svelte-1laxkz8"><img${add_attribute("src", item.image, 0)} alt="${"icon of " + escape(item.name, true)}"> <h3>${escape(item.name)}</h3> ${item.isOwned ? `${item.isEquipped ? `<button class="custom_button2 svelte-1laxkz8" data-svelte-h="svelte-bugboo">EQUIPPED</button>` : `<button class="custom_button1 svelte-1laxkz8" data-svelte-h="svelte-f2hc8w">EQUIP</button>`}` : `<div class="button-container svelte-1laxkz8"><button class="custom_button1 svelte-1laxkz8">${escape(item.priceCoins)} Coins</button> <button class="custom_button2 svelte-1laxkz8">${escape(item.priceGems)} Gems</button></div>`} </div>`;
});
const BattlePass_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".carousel-container.svelte-10h4uub{display:flex;justify-content:space-between;align-items:center;max-width:600px;margin:auto;transform:scale(1.25)}.carousel-image.svelte-10h4uub{max-width:200px;height:auto}.darkened.svelte-10h4uub{filter:brightness(0.5);max-width:160px;transform:scale(0.66)}",
  map: null
};
const BattlePass = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let images = [
    // TODO: POPULATE THIS WITH ACTUAL SKIN TEXTURES
    "/src/lib/images/1.svg",
    "/src/lib/images/2.svg",
    "/src/lib/images/3.svg",
    "/src/lib/images/4.svg",
    "/src/lib/images/5.svg",
    "/src/lib/images/6.svg",
    "/src/lib/images/7.svg"
  ];
  let currentIndex = 0;
  $$result.css.add(css$2);
  return `<div class="carousel-container svelte-10h4uub">${``} <img${add_attribute("src", images[currentIndex], 0)} alt="Middle" class="carousel-image svelte-10h4uub"> ${currentIndex < images.length - 1 ? `<img${add_attribute("src", images[(currentIndex + 1) % images.length], 0)} alt="Right" class="carousel-image darkened svelte-10h4uub">` : ``}</div>`;
});
const Currency_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".currency-container.svelte-1prsloo{padding:20px;border:1px solid #ddd;border-radius:8px;margin:20px;max-width:400px}.slider-label.svelte-1prsloo{margin-bottom:10px}.custom_button1.svelte-1prsloo{position:relative;display:inline-block;margin:15px;padding:15px 30px;text-align:center;font-size:18px;letter-spacing:1px;text-decoration:none;color:#725AC1;background:transparent;cursor:pointer;transition:ease-out 0.5s;border:2px solid #725AC1;border-radius:10px;box-shadow:inset 0 0 0 0 #725AC1}.custom_button1.svelte-1prsloo:hover{color:white;box-shadow:inset 0 -100px 0 0 #725AC1;transform:scale(1.1)}.custom_button1.svelte-1prsloo:active{transform:scale(0.9)}",
  map: null
};
const gemCostPerDollar = 100;
function roundToNearest(value, snapValues) {
  const sortedSnaps = snapValues.sort((a, b) => a - b);
  const snapIndex = sortedSnaps.findIndex((snap) => snap >= value);
  const lowerSnap = sortedSnaps[snapIndex - 1] || sortedSnaps[0];
  const upperSnap = sortedSnaps[snapIndex] || sortedSnaps[sortedSnaps.length - 1];
  const isCloserToLower = Math.abs(value - lowerSnap) < Math.abs(value - upperSnap);
  return isCloserToLower ? lowerSnap : upperSnap;
}
const Currency = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let totalCost;
  let gemsQuantities = [50, 100, 250, 500, 1e3, 1500, 2500, 5e3];
  let gemsQuantity = 50;
  $$result.css.add(css$1);
  gemsQuantity = roundToNearest(gemsQuantity, gemsQuantities);
  totalCost = gemsQuantity / gemCostPerDollar;
  return `<div class="currency-container svelte-1prsloo"><label class="slider-label svelte-1prsloo" data-svelte-h="svelte-fvzqit">Choose the quantity of gems:</label> <input type="range"${add_attribute("min", gemsQuantities[0], 0)}${add_attribute("max", gemsQuantities[gemsQuantities.length - 1], 0)} step="1" list="gemsList"${add_attribute("value", gemsQuantity, 0)}> <datalist id="gemsList">${each(gemsQuantities, (quantity) => {
    return `<option${add_attribute("value", quantity, 0)}></option>`;
  })}</datalist> <p>Selected Gems: ${escape(gemsQuantity)}</p> <p>Total Cost: $${escape(totalCost.toFixed(2))}</p> <button class="custom_button1 svelte-1prsloo" data-svelte-h="svelte-1wqpd2s">Buy Gems</button> </div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "div.svelte-1ttgp4u{width:100%;height:100%}.items-container.svelte-1ttgp4u{display:flex;flex-wrap:wrap;justify-content:space-around}.item.svelte-1ttgp4u{display:flex;flex-wrap:wrap;justify-content:space-around;margin:10px;max-width:200px}.currency-container.svelte-1ttgp4u{display:flex;flex-wrap:wrap;justify-content:space-around}.battlepass-container.svelte-1ttgp4u{display:flex;flex-wrap:wrap;justify-content:space-around}",
  map: null
};
let boosters_owned = 11;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let owned_items = [];
  let shop_items = [];
  let boosters = [
    {
      id: 1,
      name: "Booster",
      image: "/src/lib/images/1.svg",
      priceCoins: 200,
      priceGems: 50
    }
  ];
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-n20kvx_START -->${$$result.title = `<title>Game</title>`, ""}<meta name="description" content="About this app"><!-- HEAD_svelte-n20kvx_END -->`, ""}  <div class="text-column svelte-1ttgp4u"> ${$page.url.hash == "#skins" ? `<div class="items-container svelte-1ttgp4u">${each(shop_items, (item) => {
    return `<div class="item svelte-1ttgp4u">${validate_component(Item, "Item").$$render($$result, { item }, {}, {})} </div>`;
  })}</div>` : ``} ${$page.url.hash == "#equip" ? `<div class="items-container svelte-1ttgp4u">${each(owned_items, (item) => {
    return `<div class="item svelte-1ttgp4u">${validate_component(Item, "Item").$$render($$result, { item }, {}, {})} </div>`;
  })}</div>` : ``} ${$page.url.hash == "#battlepass" ? `<div class="battlepass-container svelte-1ttgp4u">${validate_component(BattlePass, "BattlePass").$$render($$result, {}, {}, {})}</div>` : ``} ${$page.url.hash == "#boosters" ? `<div class="items-container svelte-1ttgp4u">${each(boosters, (item) => {
    return `<div class="item svelte-1ttgp4u">${validate_component(Item, "Item").$$render($$result, { item }, {}, {})}
                    You have: ${escape(boosters_owned)} boosters
                </div>`;
  })}</div>` : ``} ${$page.url.hash == "#currency" ? `<div class="currency-container svelte-1ttgp4u">${validate_component(Currency, "Currency").$$render($$result, {}, {}, {})}</div>` : ``} </div>`;
});
export {
  Page as default
};
