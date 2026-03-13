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
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="colescooks" />
  <meta property="og:description" content="Cole Newman - Creator, artist, and cook. Everything you can imagine is real." />
  <meta property="og:image" content="/images/hero-kitchen.png" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="colescooks" />
  <meta name="twitter:description" content="Cole Newman - Creator, artist, and cook. Everything you can imagine is real." />
  <meta name="twitter:image" content="/images/hero-kitchen.png" />
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
