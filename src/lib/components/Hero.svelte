<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let heroSection: HTMLElement;
  let titleText: HTMLElement;
  let quoteContainer: HTMLElement;
  let ctaButton: HTMLButtonElement;
  let ingredientElements: HTMLElement[] = [];
  let heroImage: HTMLElement;
  let contentOverlay: HTMLElement;

  const quote = "Everything you can imagine is real.";
  const attribution = "— Pablo Picasso";

  // Floating ingredients with their images and positions
  const ingredients = [
    { src: '/images/ingredient-tomato.svg', alt: 'tomato', size: 80, top: '8%', left: '5%', delay: 0 },
    { src: '/images/ingredient-egg.svg', alt: 'egg', size: 70, top: '15%', right: '8%', delay: 0.1 },
    { src: '/images/ingredient-herb.svg', alt: 'herb', size: 60, top: '45%', left: '3%', delay: 0.2 },
    { src: '/images/ingredient-lemon.svg', alt: 'lemon', size: 75, bottom: '25%', right: '5%', delay: 0.3 },
    { src: '/images/ingredient-garlic.svg', alt: 'garlic', size: 55, bottom: '15%', left: '8%', delay: 0.4 },
    { src: '/images/ingredient-pepper.svg', alt: 'pepper', size: 65, top: '30%', right: '3%', delay: 0.5 },
    { src: '/images/ingredient-mushroom.svg', alt: 'mushroom', size: 60, bottom: '35%', left: '12%', delay: 0.6 },
    { src: '/images/ingredient-avocado.svg', alt: 'avocado', size: 70, top: '60%', right: '10%', delay: 0.7 },
  ];

  let mouseX = 0;
  let mouseY = 0;
  let windowWidth = 1;
  let windowHeight = 1;

  function handleMouseMove(e: MouseEvent) {
    mouseX = (e.clientX / windowWidth - 0.5) * 2;
    mouseY = (e.clientY / windowHeight - 0.5) * 2;

    // Subtle parallax on ingredients based on mouse position
    ingredientElements.forEach((el, i) => {
      if (el) {
        const depth = 0.5 + (i * 0.1);
        gsap.to(el, {
          x: mouseX * 15 * depth,
          y: mouseY * 10 * depth,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });
  }

  onMount(() => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    const tl = gsap.timeline({ delay: 0.2 });

    // Hero background fades in with scale
    tl.from(heroImage, {
      scale: 1.1,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    });

    // Content overlay slides up
    tl.from(contentOverlay, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.8");

    // Title animates up
    tl.from(titleText, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5");

    // Quote fades in
    tl.from(quoteContainer, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    // CTA button
    tl.from(ctaButton, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3");

    // Ingredients fly in from random directions with bounce
    ingredientElements.forEach((el, i) => {
      if (el) {
        const fromLeft = i % 2 === 0;
        gsap.from(el, {
          x: fromLeft ? -200 : 200,
          y: gsap.utils.random(-100, 100),
          rotation: gsap.utils.random(-180, 180),
          scale: 0,
          opacity: 0,
          duration: 1,
          delay: 0.8 + (i * 0.1),
          ease: "back.out(1.7)"
        });

        // Continuous floating animation - each ingredient has unique movement
        gsap.to(el, {
          y: `+=${15 + i * 3}`,
          rotation: `+=${5 - i}`,
          duration: 2.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5 + i * 0.1
        });
      }
    });

    // Resize handler
    const handleResize = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  function scrollToContent() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }

  function handleIngredientHover(index: number) {
    gsap.to(ingredientElements[index], {
      scale: 1.3,
      rotation: '+=20',
      duration: 0.3,
      ease: "back.out(2)"
    });
  }

  function handleIngredientLeave(index: number) {
    gsap.to(ingredientElements[index], {
      scale: 1,
      rotation: '-=20',
      duration: 0.3,
      ease: "power2.out"
    });
  }
</script>

<svelte:window on:mousemove={handleMouseMove} />

<section bind:this={heroSection} class="hero">
  <!-- Background Image -->
  <div bind:this={heroImage} class="hero-background">
    <img src="/images/hero-kitchen.png" alt="Cozy kitchen scene" />
    <div class="background-overlay"></div>
  </div>

  <!-- Floating Ingredients -->
  <div class="floating-ingredients">
    {#each ingredients as ingredient, i}
      <div
        bind:this={ingredientElements[i]}
        class="floating-ingredient"
        style="
          {ingredient.top ? `top: ${ingredient.top};` : ''}
          {ingredient.bottom ? `bottom: ${ingredient.bottom};` : ''}
          {ingredient.left ? `left: ${ingredient.left};` : ''}
          {ingredient.right ? `right: ${ingredient.right};` : ''}
          width: {ingredient.size}px;
          height: {ingredient.size}px;
        "
        role="img"
        aria-label={ingredient.alt}
        on:mouseenter={() => handleIngredientHover(i)}
        on:mouseleave={() => handleIngredientLeave(i)}
      >
        <img src={ingredient.src} alt={ingredient.alt} />
      </div>
    {/each}
  </div>

  <!-- Content -->
  <div bind:this={contentOverlay} class="hero-content">
    <div bind:this={titleText} class="title-container">
      <span class="title-label">Welcome to</span>
      <h1 class="title">colescooks</h1>
      <p class="subtitle">Creator. Chef. Culinary Experimenter.</p>
    </div>

    <blockquote bind:this={quoteContainer} class="quote-container">
      <p class="quote-text">"{quote}"</p>
      <cite class="quote-attribution">{attribution}</cite>
    </blockquote>

    <button bind:this={ctaButton} class="cta" on:click={scrollToContent}>
      <span>Explore</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </button>
  </div>

</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  /* Background */
  .hero-background {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .background-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 248, 240, 0.85) 0%,
      rgba(255, 248, 240, 0.7) 50%,
      rgba(255, 248, 240, 0.6) 100%
    );
  }

  /* Floating Ingredients */
  .floating-ingredients {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
  }

  .floating-ingredient {
    position: absolute;
    pointer-events: auto;
    cursor: pointer;
    transition: filter 0.3s ease, opacity 0.3s ease;
    filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.1));
    opacity: 0.4;
  }

  .floating-ingredient:hover {
    filter: drop-shadow(0 8px 15px rgba(0, 0, 0, 0.15));
    opacity: 0.7;
  }

  .floating-ingredient img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* Content */
  .hero-content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xl);
    text-align: center;
    padding: var(--space-2xl) var(--space-lg);
  }

  .title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
  }

  .title-label {
    font-family: var(--font-accent);
    font-size: 1.5rem;
    color: var(--color-orange);
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
  }

  .title {
    font-family: var(--font-display);
    font-size: clamp(4rem, 15vw, 10rem);
    font-weight: 700;
    color: var(--color-charcoal);
    line-height: 1;
    letter-spacing: -0.02em;
    text-shadow: 0 4px 30px rgba(255, 255, 255, 0.5);
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--color-charcoal);
    margin-top: var(--space-sm);
    font-weight: 500;
  }

  /* Quote */
  .quote-container {
    max-width: 700px;
    padding: var(--space-lg) var(--space-xl);
    background: radial-gradient(ellipse at center, rgba(245, 235, 224, 0.95) 0%, rgba(245, 235, 224, 0) 70%);
    border-radius: var(--radius-lg);
  }

  .quote-text {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-style: italic;
    color: var(--color-charcoal);
    line-height: 1.3;
    margin-bottom: var(--space-sm);
  }

  .quote-attribution {
    font-family: var(--font-accent);
    font-size: 1.25rem;
    color: var(--color-orange);
    font-style: normal;
  }

  /* CTA Button */
  .cta {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-xl);
    background: var(--color-orange);
    color: var(--color-cream);
    font-family: var(--font-body);
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: var(--radius-full);
    transition: all 0.3s var(--ease-out-back);
    box-shadow: var(--shadow-lg);
  }

  .cta:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 20px 40px rgba(232, 93, 36, 0.4);
    background: var(--color-orange-light);
  }

  .cta svg {
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(5px); }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .hero-content {
      padding: var(--space-xl) var(--space-md);
      padding-top: calc(var(--space-xl) + 60px);
    }

    .floating-ingredient {
      transform: scale(0.7);
    }

    .quote-container {
      padding: var(--space-sm) 0;
    }
  }
</style>
