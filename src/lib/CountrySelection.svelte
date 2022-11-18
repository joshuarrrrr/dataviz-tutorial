<script>
  export let values = [];
  export let selected = [];
  export let colors;
</script>

<div id="country-selection">
  {#each values as value (value)}
    <label style:color={colors(value)}>
      <input
        type="checkbox"
        bind:group={selected}
        {value}
        style:accent-color={colors(value)}
      />
      {value}
    </label>
  {/each}
</div>

<style>
  div {
    display: grid;
    gap: 0.2rem;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  }

  label {
    font-size: 1.2rem;
    font-weight: 600;
  }
</style>
