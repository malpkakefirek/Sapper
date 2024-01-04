<script>
    let gemsQuantities = [50, 100, 250, 500, 1000, 1500, 2500, 5000];
    let gemsQuantity = 50; // Default
    const gemCostPerDollar = 100; // Number of gems per dollar

  
    $: totalCost = gemsQuantity / gemCostPerDollar;

    // Snap to nearest, chatgpt madness
    $: gemsQuantity = roundToNearest(gemsQuantity, gemsQuantities);
    function roundToNearest(value, snapValues) {
        const sortedSnaps = snapValues.sort((a, b) => a - b);
        const snapIndex = sortedSnaps.findIndex(snap => snap >= value);
        const lowerSnap = sortedSnaps[snapIndex - 1] || sortedSnaps[0];
        const upperSnap = sortedSnaps[snapIndex] || sortedSnaps[sortedSnaps.length - 1];
        
        const isCloserToLower = Math.abs(value - lowerSnap) < Math.abs(value - upperSnap);
        return isCloserToLower ? lowerSnap : upperSnap;
    }

    import { invalidateAll, goto } from "$app/navigation";
    async function buyGems() {
        let storedSession = localStorage.getItem("session_id");
        if (!storedSession) {
            // TODO: Check if username in storage and remove it
            await goto("/login");
            location.reload();
            return;
        }
        let sessionID = storedSession;
        try {
            const response = await fetch("https://sapper-api.onrender.com/buy_gems", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: sessionID,
                    gemsQuantity: gemsQuantity,
                }),
            });
            const result = await response.json();
            console.log(result);
            if (result.type === "success") {
                console.log(`Bought ${gemsQuantity} gems for $${totalCost.toFixed(2)}`);
                localStorage.setItem("gems", result.new_balance)
                location.reload();
                // await invalidateAll();
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }
    }
</script>


<div class="currency-container">
  <label class="slider-label">Choose the quantity of gems:</label>
  <input type="range" min={gemsQuantities[0]} max={gemsQuantities[gemsQuantities.length - 1]} step="1" list="gemsList" bind:value={gemsQuantity} />

  <datalist id="gemsList">
    {#each gemsQuantities as quantity (quantity)}
      <option value={quantity}></option>
    {/each}
  </datalist>

  <p>Selected Gems: {gemsQuantity}</p>
  <p>Total Cost: ${totalCost.toFixed(2)}</p>

  <button class="custom_button1" on:click={buyGems}>Buy Gems</button>
</div>


<style>
  .currency-container {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 20px;
    max-width: 400px;
  }

  .slider-label {
    margin-bottom: 10px;
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
      color: #725AC1;
      background: transparent;
      cursor: pointer;
      transition: ease-out 0.5s;
      border: 2px solid #725AC1;
      border-radius: 10px;
      box-shadow: inset 0 0 0 0 #725AC1;
    }

    .custom_button1:hover {
        color: white;
        box-shadow: inset 0 -100px 0 0 #725AC1;
        transform: scale(1.1);
    }

    .custom_button1:active {
        transform: scale(0.9);
    }
</style>