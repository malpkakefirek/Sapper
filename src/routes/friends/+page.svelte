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

    let profile_name = 'Null';
    let profile_id = -1;
    import { onMount } from 'svelte';
    onMount(async () => {
        profile_id = localStorage.getItem('profile_viewed_id');
        profile_name = localStorage.getItem('profile_viewed_name');
    });




    let searchTerm = ''; 
    let SearchList = [];
    
    function filterFriends() {
        if (searchTerm.trim() === '') {
            return [];
        }
        return friends_list.filter(friend => friend.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    function handleSubmit() {
        SearchList=filterFriends();
        console.log(SearchList);
    }
</script>

<svelte:head>
    <title>Friends</title>
    <meta name="description" content="About this app" />
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="text-column">
    {#if $page.url.hash == "#profile"}
        <img src={friends_list[profile_id].image} alt="avatar of {friends_list[profile_id].name}" />
        <p>{friends_list[profile_id].name}</p>
        <p>{friends_list[profile_id].id}</p>
    {:else if $page.url.hash == "#list"}
        <div class="friends-container">
            {#each friends_list as friend (friend.id)}
                <div class="friend">
                    <Friend {friend} />
                </div>
            {/each}
        </div>
    {:else if $page.url.hash == "#add"}
        <label for="searchInput">Search by name:</label>
        <input type="text" id="searchInput" bind:value={searchTerm} />
        <button on:click={handleSubmit}>Submit</button>
        
        
        <ul>
            {#each SearchList as friend (friend.id)}
                <li>
                    <img src={friend.image} alt={friend.name} />
                    <p>ID: {friend.id}</p>
                    <p>Name: {friend.name}</p>
                </li>
            {/each}
        </ul>
    {/if}
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
