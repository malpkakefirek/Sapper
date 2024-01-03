import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../chunks/ssr.js";
import { u as useForm, H as HintGroup, a as Hint } from "../../../chunks/useForm.js";
import "devalue";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".touched:invalid{border-color:red;outline-color:red}form.svelte-17o38z0{flex:none}div.svelte-17o38z0{width:100%;height:100%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form2, $$unsubscribe_form2;
  let { form } = $$props;
  const form2 = useForm();
  $$unsubscribe_form2 = subscribe(form2, (value) => $form2 = value);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$result.css.add(css);
  $$unsubscribe_form2();
  return `  ${$$result.head += `<!-- HEAD_svelte-piv73q_START -->${$$result.title = `<title>Register</title>`, ""}<meta name="description" content="Register to the app"><!-- HEAD_svelte-piv73q_END -->`, ""} <form method="post" action="https://sapperapi.malpkakefirek.repl.co/register" class="svelte-17o38z0"><h1 data-svelte-h="svelte-issj3d">Register</h1> <div style="display: flex; justify-content: center;" class="svelte-17o38z0"><input type="email" name="email"> ${validate_component(HintGroup, "HintGroup").$$render($$result, { for: "email" }, {}, {
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
  })} <input type="username" name="username"> ${validate_component(HintGroup, "HintGroup").$$render($$result, { for: "username" }, {}, {
    default: () => {
      return `${validate_component(Hint, "Hint").$$render($$result, { on: "required" }, {}, {
        default: () => {
          return `This is a mandatory field`;
        }
      })} ${validate_component(Hint, "Hint").$$render($$result, { on: "pattern", hideWhenRequired: true }, {}, {
        default: () => {
          return `Username can only contain letters, numbers and underscores`;
        }
      })} ${validate_component(Hint, "Hint").$$render($$result, { on: "minLength", hideWhenRequired: true }, {}, {
        default: () => {
          return `Username must be at least 5 characters long`;
        }
      })} ${validate_component(Hint, "Hint").$$render($$result, { on: "maxLength", hideWhenRequired: true }, {}, {
        default: () => {
          return `Username must be at most 24 characters long`;
        }
      })}`;
    }
  })} <input type="password" name="password"> ${validate_component(HintGroup, "HintGroup").$$render($$result, { for: "password" }, {}, {
    default: () => {
      return `${validate_component(Hint, "Hint").$$render($$result, { for: "password", on: "required" }, {}, {
        default: () => {
          return `This is a mandatory field`;
        }
      })} ${validate_component(Hint, "Hint").$$render(
        $$result,
        {
          for: "password",
          on: "minLength",
          hideWhenRequired: true
        },
        {},
        {
          default: () => {
            return `Password must be at least 8 characters long`;
          }
        }
      )} ${validate_component(Hint, "Hint").$$render(
        $$result,
        {
          for: "password",
          on: "maxLength",
          hideWhenRequired: true
        },
        {},
        {
          default: () => {
            return `Password must be at most 64 characters long`;
          }
        }
      )}`;
    }
  })} <label for="passwordConfirmation" data-svelte-h="svelte-14qscnk">Password Confirmation</label> <input type="password" name="passwordConfirmation"> ${validate_component(HintGroup, "HintGroup").$$render($$result, { for: "passwordConfirmation" }, {}, {
    default: () => {
      return `${validate_component(Hint, "Hint").$$render($$result, { on: "required" }, {}, {
        default: () => {
          return `This is a mandatory field`;
        }
      })} ${validate_component(Hint, "Hint").$$render(
        $$result,
        {
          on: "passwordMatch",
          hideWhenRequired: true
        },
        {},
        {
          default: () => {
            return `Passwords do not match`;
          }
        }
      )}`;
    }
  })}<br> <button ${!$form2.valid ? "disabled" : ""}>Login</button> </div></form> <pre data-svelte-h="svelte-3dgmvo">

</pre>`;
});
export {
  Page as default
};
