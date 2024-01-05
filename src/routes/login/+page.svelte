<!-- svelte-ignore a11y-no-static-element-interactions -->
<script>
    import {
        useForm,
        validators,
        HintGroup,
        Hint,
        email,
        required,
    } from "svelte-use-form";
    import { applyAction, deserialize } from "$app/forms";
    import { invalidateAll, goto } from "$app/navigation";

    const form = useForm();

    /** @param {{ currentTarget: EventTarget & HTMLFormElement}} event */
    async function handleSubmit(event) {
        const data = new FormData(event.currentTarget);
        const response = await fetch(event.currentTarget.action, {
            method: "POST",
            body: data,
        });

        /** @type {import('@sveltejs/kit').ActionResult} */
        const result = deserialize(await response.text());
        console.log(result);
        if (result.type === "success") {
            if (result.session_id && result.username) {
                localStorage.setItem("session_id", result.session_id);
                localStorage.setItem("username", result.username);
            }
            await goto("/");
            location.reload();
        }
        // TODO: add login fail logic

        // applyAction(result);
    }
</script>

<svelte:head>
    <title>Login</title>
    <meta name="description" content="Login to the app" />
</svelte:head>

<form
    method="post"
    on:submit|preventDefault={handleSubmit}
    use:form
    action="https://sapper-api.onrender.com/login"
>
    <h1>Login</h1>
    <div style="display: flex; justify-content: center;">
        <input type="email" name="email" use:validators={[required, email]} />
        <HintGroup for="email">
            <Hint on="required">This is a mandatory field</Hint>
            <Hint on="email" hideWhenRequired>Email is not valid</Hint>
        </HintGroup>

        <input type="password" name="password" use:validators={[required]} />
        <Hint for="password" on="required">This is a mandatory field</Hint>

        <button disabled={!$form.valid}>Login</button>
        <!-- <button>Login</button> -->
    </div>
</form>

<pre />

<style>
    :global(.touched:invalid) {
        border-color: red;
        outline-color: red;
    }

    form {
        flex: none;
    }

    div {
        width: 100%;
        height: 100%;
    }
</style>
