<script>
    import { page } from "$app/stores";
    import Friend from './Friend.svelte';

    let friends_list = [
          { id: 1, name: 'Lukas', image: '/images/avatars/1.png' },
          { id: 2, name: 'Anna', image: '/images/avatars/2.png' },
          { id: 3, name: 'John', image: '/images/avatars/3.png' },
          { id: 4, name: 'Emily', image: '/images/avatars/4.png' },
          { id: 5, name: 'Michael', image: '/images/avatars/5.png' },
          { id: 6, name: 'Sophia', image: '/images/avatars/6.png' },
          { id: 7, name: 'Daniel', image: '/images/avatars/7.png' },
          { id: 8, name: 'Olivia', image: '/images/avatars/8.png' },
          { id: 9, name: 'David', image: '/images/avatars/9.png' },
          { id: 10, name: 'Emma', image: '/images/avatars/10.png' },
          { id: 11, name: 'Evelina', image: '/images/avatars/11.png' },
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
    .friends-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .friend {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: 10px;
        max-width: 200px;
    }
</style>
