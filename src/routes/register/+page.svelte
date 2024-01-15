<!-- svelte-ignore a11y-no-static-element-interactions -->
<script>
    import {
        useForm,
        validators,
        HintGroup,
        Hint,
        email,
        required,
        pattern,
        minLength,
        maxLength,
    } from "svelte-use-form";
    import { enhance, applyAction, deserialize } from '$app/forms';
    import { page } from "$app/stores";
    import { invalidateAll, goto } from '$app/navigation';

    function passwordMatch(value, form) {
        if (value !== form.values.password || value !== form.values.passwordConfirmation) {
          return { passwordMatch: true };
        }
    }
    
    /** @type {import('./$types').ActionData} */
    export let form;

    const form2 = useForm();

    /** @param {{ currentTarget: EventTarget & HTMLFormElement}} event */
    async function handleSubmit(event) {
        const data = new FormData(event.currentTarget);
        const response = await fetch(event.currentTarget.action, {
            method: 'POST',
            body: data
        });

        /** @type {import('@sveltejs/kit').ActionResult} */
        const result = deserialize(await response.text());
        console.log(result);
        if (result.type === 'success') {
            if (result.session_id && result.username) {
                localStorage.setItem("session_id", result.session_id);
                localStorage.setItem("username", result.username);
                await goto("/");
                location.reload();
            }
            // rerun all `load` functions, following the successful update
            await invalidateAll();
        }

        applyAction(result);
    }
</script>

<svelte:head>
    <title>Register</title>
    <meta name="description" content="Register to the app" />
</svelte:head>

<form
    method="post" 
    on:submit|preventDefault={handleSubmit}
    use:form2
    action="https://sapper-api.onrender.com/register" 
>
    <h1>Register</h1>
    <div style="display: flex; justify-content: center;">
        <input type="email" name="email" use:validators={[required, email]} />
        <HintGroup for="email">
            <Hint on="required">This is a mandatory field</Hint>
            <Hint on="email" hideWhenRequired>Email is not valid</Hint>
        </HintGroup>
        
        <input 
            type="username" 
            name="username" 
            use:validators={[
                required, 
                pattern("^[a-zA-Z0-9_]+$"), 
                minLength(5), 
                maxLength(24)
            ]} 
        />
        <HintGroup for="username">
            <Hint on="required">This is a mandatory field</Hint>
            <Hint on="pattern" hideWhenRequired>Username can only contain letters, numbers and underscores</Hint>
            <Hint on="minLength" hideWhenRequired>Username must be at least 5 characters long</Hint>
            <Hint on="maxLength" hideWhenRequired>Username must be at most 24 characters long</Hint>
        </HintGroup>

        <input 
            type="password" 
            name="password" 
            use:validators={[
                required,
                minLength(8),
                maxLength(64),
                passwordMatch
            ]} 
        />
        <HintGroup for="password">
            <Hint for="password" on="required">This is a mandatory field</Hint>
            <Hint for="password" on="minLength" hideWhenRequired>Password must be at least 8 characters long</Hint>
            <Hint for="password" on="maxLength" hideWhenRequired>Password must be at most 64 characters long</Hint>
            <Hint on="passwordMatch" hideWhenRequired>Passwords do not match</Hint>
        </HintGroup>
        
        <label for="passwordConfirmation">Password Confirmation</label>
        <input
          type="password"
          name="passwordConfirmation"
          use:validators={[required, passwordMatch]}
        />
        <HintGroup for="passwordConfirmation">
          <Hint on="required">This is a mandatory field</Hint>
          <Hint on="passwordMatch" hideWhenRequired>Passwords do not match</Hint>
        </HintGroup><br />

        <button disabled={!$form2.valid}>Login</button>
        <!-- <button>Login</button> -->
    </div>
</form>
<pre>

</pre>

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
