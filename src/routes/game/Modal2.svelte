<!-- Modal z przykladow Svelte -->
<script>
    import { showModal2 } from "./stores.js";
    
    export let showModal_value2 = false; // boolean

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal_value2) dialog.showModal();
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
            <button autofocus on:click={() => showModal2.update(() => false)} class="custom_button1"><a href="/" style="text-decoration: none; color: inherit;">Exit the game</a></button>
            <button autofocus on:click={() => dialog.close()} class="custom_button2">View Board Again</button>
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
    .custom_button1 {
      position: relative;
      display: inline-block;
      margin: 15px;
      padding: 15px 30px;
      text-align: center;
      font-size: 18px;
      letter-spacing: 1px;
      text-decoration: none;
      color: #F3767C;
      background: transparent;
      cursor: pointer;
      transition: ease-out 0.5s;
      border: 2px solid #725AC1;
      border-radius: 10px;
      box-shadow: inset 0 0 0 0 #725AC1;
    }

    .custom_button1:hover {
        color: #F3767C;
        box-shadow: inset 0 -100px 0 0 #725AC1;
        transform: scale(1.1);
    }

    .custom_button1:active {
      transform: scale(0.9);
    }

    :global(.custom_button1.clicked) {
        color: white;
        box-shadow: inset 0 -100px 0 0 #725AC1;
        transform: scale(1.12);
    }

    
    .custom_button2 {
      position: relative;
      display: inline-block;
      margin: 15px;
      padding: 15px 30px;
      text-align: center;
      font-size: 18px;
      letter-spacing: 1px;
      text-decoration: none;
      color: #80FF80;
      background: transparent;
      cursor: pointer;
      transition: ease-out 0.5s;
      border: 2px solid #725AC1;
      border-radius: 10px;
      box-shadow: inset 0 0 0 0 #725AC1;
    }

    .custom_button2:hover {
        color: #80FF80;
        box-shadow: inset 0 -100px 0 0 #725AC1;
        transform: scale(1.1);
    }

    .custom_button2:active {
      transform: scale(0.9);
    }

    :global(.custom_button2.clicked) {
        color: white;
        box-shadow: inset 0 -100px 0 0 #725AC1;
        transform: scale(1.12);
    }
</style>
