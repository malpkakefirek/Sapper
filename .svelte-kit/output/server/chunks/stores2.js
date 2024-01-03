import { r as readable, w as writable } from "./index.js";
const tileStructure = writable({ "": "" });
const flagStructure = writable({ "": "" });
const showModal = writable(false);
const showModal2 = writable(false);
readable(/* @__PURE__ */ new Date(), function start(set) {
  const interval = setInterval(() => {
    set(/* @__PURE__ */ new Date());
  }, 1e3);
  return function stop() {
    clearInterval(interval);
  };
});
export {
  showModal2 as a,
  flagStructure as f,
  showModal as s,
  tileStructure as t
};
