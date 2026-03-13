<script lang="ts">
  import '../lib/styles/global.css';
  import Navigation from '$lib/components/Navigation.svelte';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  let { children } = $props();

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
  });
</script>

<svelte:head>
  <title>colescooks</title>
  <meta name="description" content="Cole Newman - Creator, artist, and cook. Everything you can imagine is real." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍳</text></svg>" />
</svelte:head>

<Navigation />

<main>
  {@render children()}
</main>

<style>
  main {
    min-height: 100vh;
  }
</style>
