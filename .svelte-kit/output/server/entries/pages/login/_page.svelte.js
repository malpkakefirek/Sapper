import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../chunks/ssr.js";
import { u as useForm, H as HintGroup, a as Hint } from "../../../chunks/useForm.js";
import "devalue";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".touched:invalid{border-color:red;outline-color:red}form.svelte-17o38z0{flex:none}div.svelte-17o38z0{width:100%;height:100%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  const form = useForm();
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$result.css.add(css);
  $$unsubscribe_form();
  return `  ${$$result.head += `<!-- HEAD_svelte-sn1vrk_START -->${$$result.title = `<title>Login</title>`, ""}<meta name="description" content="Login to the app"><!-- HEAD_svelte-sn1vrk_END -->`, ""} <form method="post" action="https://sapperapi.malpkakefirek.repl.co/login" class="svelte-17o38z0"><h1 data-svelte-h="svelte-1wsy7a9">Login</h1> <div style="display: flex; justify-content: center;" class="svelte-17o38z0"><input type="email" name="email"> ${validate_component(HintGroup, "HintGroup").$$render($$result, { for: "email" }, {}, {
    default: () => {
      return `${validate_component(Hint, "Hint").$$render($$result, { on: "required" }, {}, {
        default: () => {
          return `This is a mandatory field`;
        }
      })} ${validate_component(Hint, "Hint").$$render($$result, { on: "email", hideWhenRequired: true }, {}, {
        default: () => {
          return `Email is not valid`;
        }
      })}`;
    }
  })} <input type="password" name="password"> ${validate_component(Hint, "Hint").$$render($$result, { for: "password", on: "required" }, {}, {
    default: () => {
      return `This is a mandatory field`;
    }
  })} <button ${!$form.valid ? "disabled" : ""}>Login</button> </div></form> <pre></pre>`;
});
export {
  Page as default
};
