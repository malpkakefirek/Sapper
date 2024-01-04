<script>
    import { page } from "$app/stores";
    import { Friend } from "./Friend.svelte';

    let friends_list = 
          { id: 1, name: 'Lukas', image: 'Lukas.jpg' },
          { id: 2, name: 'Anna', image: 'Anna.jpg' },
          { id: 3, name: 'John', image: 'John.jpg' },
          { id: 4, name: 'Emily', image: 'Emily.jpg' },
          { id: 5, name: 'Michael', image: 'Michael.jpg' },
          { id: 6, name: 'Sophia', image: 'Sophia.jpg' },
          { id: 7, name: 'Daniel', image: 'Daniel.jpg' },
          { id: 8, name: 'Olivia', image: 'Olivia.jpg' },
          { id: 9, name: 'David', image: 'David.jpg' },
          { id: 10, name: 'Emma', image: 'Emma.jpg' },
    ];
</script>

<svelte:head>
    <title>Friends</title>
    <meta name="description" content="About this app" />
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="text-column">
    <div class="friends-container">
        {#each friends_list as friend (friend.id)}
            <div class="friend">
                <Friend {friend} />
            </div>
        {/each}
    </div>
</div>


<style>
    div {
        width: 100%;
        height: 100%;
    }
</style>
