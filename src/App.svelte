<script>
  import * as d3 from "d3";
  import { co2Data } from "./lib/data";
  import CountrySelection from "./lib/CountrySelection.svelte";
  import LineChart from "./lib/LineChart.svelte";

  const countries = d3.sort([
    "Europe",
    "Germany",
    "China",
    "United States",
    "Denmark",
    "Japan",
    "Africa",
    "India",
  ]);
  let selectedCountries = [];
  $: xDomain = [1800, d3.max(co2Data, (d) => d.year)];
  $: yDomain = [
    0,
    d3.max(
      co2Data.filter((d) => ["World", ...countries].includes(d.country)),
      (d) => d[attribute]
    ),
  ];
  $: colors = d3.scaleOrdinal(d3.schemeTableau10).domain(countries);
  const attribute = "co2_per_capita";
</script>

<main>
  <CountrySelection
    values={countries}
    bind:selected={selectedCountries}
    {colors}
  />

  <section>
    <LineChart
      title="World"
      data={co2Data.filter((row) => row.country === "World")}
      x="year"
      y={attribute}
      {xDomain}
      {yDomain}
      color="black"
      height={200}
    />
  </section>

  {#each selectedCountries || [] as country (country)}
    <section>
      <LineChart
        title={country}
        data={co2Data.filter((row) => row.country === country)}
        x="year"
        y={attribute}
        {xDomain}
        {yDomain}
        color={colors(country)}
        height={200}
      />
    </section>
  {/each}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 1000px;
    margin: auto;
  }

  section {
    display: flex;
    flex-direction: column;
  }
</style>
