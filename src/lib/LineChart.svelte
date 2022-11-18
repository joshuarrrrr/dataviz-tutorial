<script>
  export let title = "";
  export let data;
  export let x;
  export let y;
  export let height = 300;
  export let color = "rebeccapurple";
  export let xDomain = null;
  export let yDomain = null;

  import * as d3 from "d3";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";

  let width;
  const padding = { top: 30, right: 40, bottom: 40, left: 30 };

  $: xScale = d3
    .scaleLinear()
    .domain(xDomain || d3.extent(data.map((d) => d[x])))
    .range([padding.left, width - padding.right]);
  $: yScale = d3
    .scaleLinear()
    .domain(yDomain || d3.extent(data.map((d) => d[y])))
    .range([height - padding.bottom, padding.top])
    .nice();

  $: lineGenerator = d3
    .line()
    .curve(d3.curveMonotoneX)
    .defined(
      (d) => d[x] != null && !isNaN(d[x]) && d[y] != null && !isNaN(d[y])
    )
    .x((d) => xScale(d[x]))
    .y((d) => yScale(d[y]));
</script>

<div bind:clientWidth={width}>
  {#if width}
    <svg viewBox="0 0 {width} {height}">
      {#if title}
        <text id="title" dx=".2em" dy="1em">{title}</text>
      {/if}
      <g class="x-axis" transform="translate(0,{height - padding.bottom})">
        <AxisX label={x} scale={xScale} numTicks={width / 100} />
      </g>

      <g class="y-axis" transform="translate({width - padding.right},0)">
        <AxisY
          label={y}
          scale={yScale}
          numTicks={height / 90}
          tickSizeInner={width - padding.left - padding.right}
        />
      </g>

      <path class="line" d={lineGenerator(data)} stroke={color} />
    </svg>
  {/if}
</div>

<style>
  .line {
    stroke-width: 1.5;
    fill: none;
  }

  #title {
    font-size: 1.4rem;
  }
</style>
