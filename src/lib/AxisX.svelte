<script>
  export let label = "x";
  export let scale;
  export let numTicks = 10;
  export let tickSize = 5;
  export let tickSizeInner = 0;
  export let tickFormat = undefined;

  $: ticks = scale.ticks(numTicks, tickFormat);
</script>

{#each ticks as tick (tick)}
  <g class="tick" transform="translate({scale(tick)},0)">
    {#if tickSizeInner}
      <line class="inner" y2={-tickSizeInner} />
    {/if}
    <line class="outer" y2={tickSize} />
    <text y={tickSize} fill="black" dy="1em">{tick}</text>
  </g>
{/each}
{#if label}
  <text class="label" x={Math.max(...scale.range())} dy="2.4em">{label} →</text>
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
    text-anchor: middle;
  }

  text.label {
    font-weight: 600;
    fill: black;
  }
</style>
