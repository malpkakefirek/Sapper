<!-- svelte-ignore a11y-no-static-element-interactions -->
<script>
    import { invalidateAll, goto } from "$app/navigation";
    import { onMount } from 'svelte';
    
    onMount(async () => {
        let storedSession = localStorage.getItem("session_id");
        if (!storedSession) {
            // TODO: Check if username in storage and remove it
            await goto("/");
            location.reload();
            return;
        }
        let sessionID = storedSession;
        try {
            const response = await fetch("https://sapper-api.onrender.com/logout", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({session_id: sessionID}),
            });
            const result = await response.json();
            console.log(result);
            if (result.type === "success") {
                localStorage.removeItem("session_id");
                localStorage.removeItem("username");
                await goto("/");
                location.reload();
                // await invalidateAll();
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }
    });
</script>

<svelte:head>
    <title>Logout</title>
    <meta name="description" content="Logout from the app" />
</svelte:head>

<pre />

<style>
    :global(.touched:invalid) {
        border-color: red;
        outline-color: red;
    }

    /* div {
        width: 100%;
        height: 100%;
    } */
</style>
