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
            
            await invalidateAll();
        }
        // TODO: add login fail logic

        applyAction(result);
    }
</script>

<svelte:head>
    <title>Login</title>
    <meta name="description" content="Login to the app" />
</svelte:head>

<div class="form dropbox">
    <form
        method="post"
        on:submit|preventDefault={handleSubmit}
        use:form
        action="https://sapper-api.onrender.com/login"
    >
        <div class="title">Login</div>
        <div class="subtitle">please input your email and password below</div>
        <div style="display: flex; justify-content: center;">
            <div class="input-container ic1">
                <input type="email" class="input" name="email" use:validators={[required, email]} placeholder=" " />
                <HintGroup for="email">
                    <Hint on="required">This is a mandatory field</Hint>
                    <Hint on="email" hideWhenRequired>Email is not valid</Hint>
                </HintGroup>
                <div class="cut"></div>
                <label for="email" class="placeholder">Email</label>
            </div>

            <div class="input-container ic2">
                <input type="password" class="input" name="password" use:validators={[required]} placeholder=" " />
                <Hint for="password" on="required">This is a mandatory field</Hint>
                <div class="cut"></div>
                <label for="password" class="placeholder">Password</label>
            </div>
    
            <button disabled={!$form.valid} class="custom_button_gems">Login</button>
            <!-- <button>Login</button> -->
        </div>
    </form>
</div>

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
