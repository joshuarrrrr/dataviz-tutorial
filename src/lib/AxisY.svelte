<script>
  export let label = "y";
  export let scale;
  export let numTicks = 10;
  export let tickSize = 5;
  export let tickSizeInner = 0;
  export let tickFormat = undefined;

  $: ticks = scale.ticks(numTicks, tickFormat);
</script>

{#each ticks as tick (tick)}
  <g class="tick" transform="translate(0,{scale(tick)})">
    {#if tickSizeInner}
      <line class="inner" x2={-tickSizeInner} />
    {/if}
    <line class="outer" x2={tickSize} />
    <text x="5" dx=".2em" dy=".3em">{tick}</text>
  </g>
{/each}
{#if label}
  <text class="label" y={Math.min(...scale.range())} dy="-1em">{label} ↑</text>
{/if}

<style>
  .tick line.outer {
    stroke: black;
  }

  .tick line.inner {
    stroke: #ddd;
  }

  text {
    fill: black;
  }

  text.label {
    font-weight: 600;
    text-anchor: end;
  }
</style>
