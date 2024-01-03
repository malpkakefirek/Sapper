import { c as create_ssr_component, g as getContext, a as subscribe, b as add_attribute, e as escape, s as setContext } from "./ssr.js";
import { w as writable } from "./index.js";
const Hint = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let touched;
  let errors;
  let hideWhenError;
  let requiredError;
  let value;
  let $formContext, $$unsubscribe_formContext;
  let { for: name = "" } = $$props;
  let { form = "svelte-use-form" } = $$props;
  let { class: _class = "" } = $$props;
  let { id = void 0 } = $$props;
  let { on = "" } = $$props;
  let { hideWhen = "" } = $$props;
  let { hideWhenRequired = false } = $$props;
  let { showWhenUntouched = false } = $$props;
  if (!name)
    name = getContext(`${form}_hint-group-name`);
  const formContext = getContext(form);
  $$unsubscribe_formContext = subscribe(formContext, (value2) => $formContext = value2);
  if ($$props.for === void 0 && $$bindings.for && name !== void 0)
    $$bindings.for(name);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.class === void 0 && $$bindings.class && _class !== void 0)
    $$bindings.class(_class);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.on === void 0 && $$bindings.on && on !== void 0)
    $$bindings.on(on);
  if ($$props.hideWhen === void 0 && $$bindings.hideWhen && hideWhen !== void 0)
    $$bindings.hideWhen(hideWhen);
  if ($$props.hideWhenRequired === void 0 && $$bindings.hideWhenRequired && hideWhenRequired !== void 0)
    $$bindings.hideWhenRequired(hideWhenRequired);
  if ($$props.showWhenUntouched === void 0 && $$bindings.showWhenUntouched && showWhenUntouched !== void 0)
    $$bindings.showWhenUntouched(showWhenUntouched);
  touched = $formContext[name]?.touched ?? {};
  errors = $formContext[name]?.errors ?? {};
  hideWhenError = hideWhen ? errors[hideWhen] : "";
  requiredError = errors["required"];
  value = errors[on];
  $$unsubscribe_formContext();
  return `${!(hideWhenRequired && requiredError) && !hideWhenError ? `${(touched || showWhenUntouched) && value ? `<div${add_attribute("id", id, 0)} class="${"svelte-use-form-hint " + escape(_class, true)}">${slots.default ? slots.default({ value }) : ``}</div>` : ``}` : ``}`;
});
const HintGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form = "svelte-use-form" } = $$props;
  let { for: name = "" } = $$props;
  setContext(`${form}_hint-group-name`, name);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.for === void 0 && $$bindings.for && name !== void 0)
    $$bindings.for(name);
  return `${slots.default ? slots.default({ form }) : ``}`;
});
const isChrome = () => /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
const animationName = "svelte-use-form-webkit-autofill";
const css = `
@keyframes ${animationName} {
    from {}
}

input:-webkit-autofill {
    animation-name: svelte-use-form-webkit-autofill;
}
`;
function startAnimationWhenAutofilled() {
  if (document.getElementById("svelte-use-form-chrome-autofill-styles") === null) {
    const style = document.createElement("style");
    style.setAttribute("id", "svelte-use-form-chrome-autofill-styles");
    style.setAttribute("type", "text/css");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }
}
function handleChromeAutofill(textElement, control, callback) {
  if (!isChrome())
    return;
  function handleAnimationStart(event) {
    if (event.animationName.includes(animationName)) {
      const currentValue = textElement.value;
      if (!currentValue) {
        control.valid = true;
        callback();
      }
    }
  }
  textElement.addEventListener("animationstart", handleAnimationStart);
  startAnimationWhenAutofilled();
}
class FormControl {
  validators;
  /**
   * Returns an object containing possible validation errors
   * @example
   * (All validators are throwing an error)
   * `{ required: true, minLength: 4, maxLength: 20 }`
   * (Only required is invalid)
   * `{ required: true }`
   */
  errors = {};
  /**
   * Contains a map of values, that will be shown
   * in place of the original validation error.
   */
  errorMap = {};
  /**
   * The DOM elements representing this control
   */
  elements = [];
  /** Does the FormControl pass all given validators? */
  valid = true;
  /**
   * If the FormControl has been interacted with.
   * (triggered by blur event)
   */
  _touched = false;
  /** The initial value of the FormControl. Defaults to `""` if not set via `useForm(params)`. */
  initial;
  // TODO can we get the Form via Svelte context?
  formRef;
  _value = "";
  get value() {
    return this._value;
  }
  get touched() {
    return this._touched;
  }
  /**
   * This will only change the internal value of the control, not the one displayed in the actual HTML-Element
   *
   * See `change(value: String)` for doing both
   */
  set value(value) {
    this._value = value;
    this.validate();
  }
  set touched(value) {
    this._touched = value;
    this.elements.forEach((element) => {
      if (value)
        element.classList.add("touched");
      else
        element.classList.remove("touched");
    });
  }
  constructor(formControl) {
    this.formRef = formControl.formRef;
    this.validators = formControl.validators;
    this.errorMap = formControl.errorMap;
    this.initial = formControl.value;
    this.elements = formControl.elements;
    this.value = formControl.value;
  }
  /**
   * Set an error manually.
   *
   * The error will be removed after changes to the value or on validate()
   *
   * Used for setting an error that would be difficult to implement with a validator.
   * @example Backend Response returning Login failed
   * ``` typescript
   * function submit() {
   *    apiLogin($form.values).then(response => {})
   *    .catch(error => {
   *        if (error.status === 403) {
   *            $form.password.error({ login: "Password or username is incorrect" });
   *        }
   *    })
   * }
   * ```
   */
  error(errors) {
    this.errors = { ...errors, ...this.errors };
    this.valid = false;
    this.formRef()["_notifyListeners"]();
  }
  /** Change the value and the value of all HTML-Elements associated with this control */
  change(value) {
    this.value = value;
    this.elements.forEach((element) => element.value = value);
    this.formRef()["_notifyListeners"]();
  }
  /** Validate the FormControl by querying through the given validators. */
  validate() {
    let valid = true;
    this.errors = {};
    for (const validator of this.validators) {
      const errors = validator(this.value, this.formRef(), this);
      if (!errors)
        continue;
      valid = false;
      for (const error of Object.entries(errors)) {
        let [key, value] = error;
        const errorMapping = this.errorMap[key];
        if (errorMapping) {
          value = typeof errorMapping === "function" ? errorMapping(value) : errorMapping;
        }
        this.errors[key] = value;
      }
    }
    this.valid = valid;
    this.elements.forEach((element) => element.setCustomValidity(valid ? "" : "Field is invalid"));
    return valid;
  }
  /** Reset the form control value to its initial value or `{ value }` and untouch it */
  reset({ value } = {}) {
    const resetValue = value == null ? this.initial : value;
    this.elements.forEach((element) => element.value = resetValue);
    this.value = resetValue;
    this.touched = false;
    this.formRef()["_notifyListeners"]();
  }
}
class Form {
  /**
   * Function for creating a Form
   * @remarks This allows us to specify the index signatures in the class
   */
  static create(initialData, notifyListeners) {
    return new Form(initialData, notifyListeners);
  }
  _notifyListeners;
  get valid() {
    let valid = true;
    this.forEachControl((formControl) => {
      if (!formControl.valid)
        valid = false;
    });
    return valid;
  }
  get touched() {
    let touched = true;
    this.forEachControl((formControl) => {
      if (!formControl.touched)
        touched = false;
    });
    return touched;
  }
  get values() {
    let values = {};
    this.forEachControl((formControl, key) => {
      values[key] = formControl.value;
    });
    return values;
  }
  set touched(value) {
    this.forEachControl((formControl) => {
      formControl.touched = value;
    });
    this._notifyListeners();
  }
  constructor(initialData, notifyListeners) {
    for (const [k, v] of Object.entries(initialData)) {
      this._addControl(k, v.initial, v.validators, [], v.errorMap);
    }
    this._notifyListeners = notifyListeners;
  }
  /** Reset the whole form */
  reset() {
    this.forEachControl((formControl) => formControl.reset());
  }
  /** @internal Add a form conrol to the Form */
  _addControl(name, initial = "", validators = [], elements = [], errorMap = {}) {
    this[name] = new FormControl({
      value: initial,
      validators,
      elements,
      errorMap,
      formRef: () => this
    });
  }
  forEachControl(callback) {
    for (const [key, value] of Object.entries(this)) {
      if (value instanceof FormControl) {
        callback(value, key);
      }
    }
  }
}
class FormControlMissingError extends Error {
}
function isTextElement(node) {
  return node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement;
}
function isFormControlElement(node) {
  return node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement || node instanceof HTMLSelectElement;
}
function isIgnoredElement(node) {
  return node.hasAttribute("data-suf-ignore") && node.getAttribute("data-suf-ignore") === "true" || // <div data-suf-ignore="true">
  node.getAttribute("data-suf-ignore") === true;
}
const formReferences = writable([]);
function useForm(properties = {}, formName = "svelte-use-form") {
  const subscribers = [];
  let eventListeners = [];
  let state = Form.create(properties, notifyListeners);
  let observer;
  action.subscribe = subscribe2;
  action.set = set;
  setContext(formName, action);
  function action(node) {
    setupForm(node);
    formReferences.update((values) => [
      ...values,
      { node, form: state, notifyListeners }
    ]);
    return {
      update: () => {
      },
      destroy: () => {
        unmountEventListeners();
        observer.disconnect();
      }
    };
  }
  function setupForm(node) {
    const inputElements = [
      ...getNodeElementsByTagName(node, "input")
    ];
    const textareaElements = [
      ...getNodeElementsByTagName(node, "textarea")
    ];
    const selectElements = [
      ...getNodeElementsByTagName(node, "select")
    ];
    const textElements = [...inputElements, ...textareaElements];
    setupTextElements(textElements);
    setupSelectElements(selectElements);
    hideNotRepresentedFormControls([...textElements, ...selectElements]);
    setupFormObserver(node);
    notifyListeners();
  }
  function setupTextElements(textElements) {
    for (const textElement of textElements) {
      const name = textElement.name;
      let formControl = state[name];
      if (!formControl) {
        const initial = getInitialValueFromTextElement(textElement);
        state._addControl(name, initial, [], [textElement], {});
        formControl = state[name];
      } else {
        formControl.elements.push(textElement);
        if (textElement.type === "radio" && textElement instanceof HTMLInputElement && textElement.checked) {
          formControl.initial = textElement.value;
        }
      }
      switch (textElement.type) {
        case "checkbox":
        case "radio":
          mountEventListener(textElement, "click", handleBlurOrClick);
          break;
        default:
          setInitialValue(textElement, formControl);
          handleAutofill(textElement, formControl);
          mountEventListener(textElement, "blur", handleBlurOrClick);
      }
      mountEventListener(textElement, "input", handleInput);
    }
  }
  function setupSelectElements(selectElements) {
    for (const selectElement of selectElements) {
      const name = selectElement.name;
      const formControl = state[name];
      if (!formControl) {
        const initial = selectElement.value;
        state._addControl(name, initial, [], [selectElement], {});
      } else {
        formControl.elements.push(selectElement);
        setInitialValue(selectElement, formControl);
      }
      mountEventListener(selectElement, "input", handleInput);
      mountEventListener(selectElement, "input", handleBlurOrClick);
      mountEventListener(selectElement, "blur", handleBlurOrClick);
    }
  }
  function setupFormObserver(form) {
    observer = new MutationObserver(observeForm);
    observer.observe(form, { childList: true, subtree: true });
  }
  function observeForm(mutations) {
    for (const mutation of mutations) {
      if (mutation.type !== "childList")
        continue;
      for (const node of mutation.addedNodes) {
        if (!(isFormControlElement(node) && !isIgnoredElement(node)))
          continue;
        const initialFormControlProperty = properties[node.name];
        if (!state[node.name] && initialFormControlProperty) {
          state._addControl(
            node.name,
            initialFormControlProperty.initial,
            initialFormControlProperty.validators,
            [],
            // The setup function will add this node to the form control
            initialFormControlProperty.errorMap
          );
        }
        if (isTextElement(node))
          setupTextElements([node]);
        else if (node instanceof HTMLSelectElement)
          setupSelectElements([node]);
      }
      for (const node of mutation.removedNodes) {
        if (!(node instanceof HTMLElement))
          continue;
        const elements = isFormControlElement(node) ? [node] : getAllFormControlElements(node);
        elements.forEach((element) => {
          delete state[element.name];
          eventListeners = eventListeners.filter((eventListener) => eventListener.node !== element);
        });
      }
    }
    notifyListeners();
  }
  function mountEventListener(node, event, listener) {
    node.addEventListener(event, listener);
    eventListeners.push({ node, event, listener });
  }
  function unmountEventListeners() {
    for (const { node, event, listener } of eventListeners) {
      node.removeEventListener(event, listener);
    }
  }
  function handleAutofill(textElement, formControl) {
    handleChromeAutofill(textElement, formControl, notifyListeners);
    function handleNoEventAutofilling() {
      if (textElement.value !== formControl.initial) {
        handleBlurOrClick({ target: textElement });
        return true;
      }
      return false;
    }
    const autofillingWithoutEventInstantly = handleNoEventAutofilling();
    if (!autofillingWithoutEventInstantly)
      setTimeout(() => handleNoEventAutofilling(), 100);
  }
  function handleInput({ target: node }) {
    if (isFormControlElement(node)) {
      const name = node.name;
      const formControl = state[name];
      if (!formControl)
        throw new FormControlMissingError();
      let value;
      if (node.type === "checkbox" && node instanceof HTMLInputElement) {
        value = node.checked ? "checked" : "";
      } else {
        value = node.value;
      }
      formControl.value = value;
      notifyListeners();
    }
  }
  function handleBlurOrClick({ target: node }) {
    if (isFormControlElement(node)) {
      const formControl = state[node.name];
      if (!formControl)
        throw new FormControlMissingError();
      if (!formControl.touched)
        handleInput({ target: node });
      formControl.touched = true;
      node.classList.add("touched");
      notifyListeners();
    }
  }
  function hideNotRepresentedFormControls(nodes) {
    for (const key of Object.keys(properties)) {
      let isFormControlRepresentedInDom = false;
      for (const node of nodes) {
        if (key === node.name)
          isFormControlRepresentedInDom = true;
      }
      if (!isFormControlRepresentedInDom)
        delete state[key];
    }
  }
  function setInitialValue(element, formControl) {
    if (formControl.initial)
      element.value = formControl.initial;
  }
  function notifyListeners() {
    for (const callback of subscribers)
      callback(state);
  }
  function subscribe2(callback) {
    subscribers.push(callback);
    callback(state);
    return { unsubscribe: () => unsubscribe(callback) };
  }
  function unsubscribe(subscriber) {
    const index = subscribers.indexOf(subscriber);
    subscribers.splice(index, 1);
  }
  function set(value) {
    state = value;
    notifyListeners();
  }
  return action;
}
function getInitialValueFromTextElement(textElement) {
  let initial;
  if (textElement.type === "radio" && textElement instanceof HTMLInputElement) {
    initial = textElement.checked ? textElement.value : "";
  } else if (textElement.type === "checkbox" && textElement instanceof HTMLInputElement) {
    initial = textElement.checked ? "checked" : "";
  } else {
    initial = textElement.value;
  }
  return initial;
}
function getNodeElementsByTagName(node, tagName) {
  return Array.from(node.getElementsByTagName(tagName)).filter((element) => !isIgnoredElement(element));
}
function getAllFormControlElements(node) {
  const inputs = getNodeElementsByTagName(node, "input");
  const textareas = getNodeElementsByTagName(node, "textarea");
  const selects = getNodeElementsByTagName(node, "select");
  return [...inputs, ...textareas, ...selects];
}
export {
  HintGroup as H,
  Hint as a,
  useForm as u
};
