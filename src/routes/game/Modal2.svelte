<!-- Modal z przykladow Svelte -->
<script>
    import { showModal2 } from "./stores.js";
    
    export let showModal_value2 = false; // boolean

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal_value2) dialog.showModal();
    
    import { goto } from "$app/navigation";
    async function play_again_button(){
        showModal2.update(() => false); 
        await goto("/game#start");
        await location.reload();
    }
    
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal2.update(() => false))}
    on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <slot name="header" />
        <hr />
        <slot />
        <hr />
        <!-- svelte-ignore a11y-autofocus -->
        <div style="display: flex; justify-content: space-between;">
            <button autofocus on:click={async () => { play_again_button(); }} class="custom_button1">Play Again</button>
            <button autofocus on:click={() => dialog.close()} class="custom_button1">View Board</button>
        </div>
    </div>
</dialog>

<style>
    dialog {
        max-width: 20em;
        border-radius: 0.5em;
        overflow: hidden;
        background-color: #50328d;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
        color: #fff;
        font-family: 'Arial', sans-serif;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
    }
    dialog > header {
        background-color: #7245af;
        padding: 1em;
        text-align: center;
        font-size: 1.5em;
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
