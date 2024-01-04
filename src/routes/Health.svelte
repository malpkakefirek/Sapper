<script>
    let promise = fetch('https://sapper-api.onrender.com/health').then((x) => x.json());
</script>

{#await promise}
    <!-- optionally show something while promise is pending -->
    <p style="color: purple;font-weight: bold;">loading...</p>
{:then data}
    <!-- promise was fulfilled -->
    <p style="color: purple;font-weight: bold;">Status: {data.response}</p>
    <p style="color: purple;">Time: {data.timing}</p>
{:catch error}
    <!-- optionally show something while promise was rejected -->
    <p style="color: red;">Error: {error}</p>
{/await}