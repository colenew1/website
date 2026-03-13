<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import Hero from '$lib/components/Hero.svelte';
  import { Flame } from 'lucide-svelte';

  let counterSection: HTMLElement;
  let scrollSection: HTMLElement;
  let ingredientCards: HTMLElement[] = [];
  let counterNumbers: HTMLElement[] = [];
  let ctaSection: HTMLElement;
  let floatingDecor: HTMLElement[] = [];
  let panImage: HTMLElement;
  let utensilsImage: HTMLElement;

  const stats = [
    { number: '5M+', label: 'Followers' },
    { number: '10B+', label: 'Views' },
    { number: 'Countless', label: 'Recipes to Try' },
  ];

  const ingredients = [
    {
      title: 'Creativity',
      description: 'From pendulum art to plating, creativity flows through everything I make.',
      color: 'var(--color-coral)',
      image: '/images/ingredient-tomato.svg'
    },
    {
      title: 'Experimentation',
      description: 'Breaking rules is how I learn. Some recipes fail, but every experiment teaches.',
      color: 'var(--color-sage)',
      image: '/images/ingredient-herb.svg'
    },
    {
      title: 'Community',
      description: 'Cooking is better shared. Join me on this delicious journey.',
      color: 'var(--color-orange)',
      image: '/images/ingredient-egg.svg'
    }
  ];

  // Scattered decorative ingredients for parallax
  const scatteredIngredients = [
    { src: '/images/ingredient-carrot.svg', top: '10%', left: '5%', size: 60 },
    { src: '/images/ingredient-onion.svg', top: '30%', right: '8%', size: 50 },
    { src: '/images/ingredient-cheese.png', bottom: '20%', left: '3%', size: 70 },
    { src: '/images/ingredient-bread.png', top: '60%', right: '5%', size: 80 },
  ];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Stats counter section - dramatic entrance
    gsap.from(counterNumbers, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: counterSection,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Pan image floats in from left
    if (panImage) {
      gsap.from(panImage, {
        x: -100,
        rotation: -20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: counterSection,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Continuous wobble
      gsap.to(panImage, {
        rotation: 5,
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Ingredient cards - dramatic stagger with rotation
    ingredientCards.forEach((card, i) => {
      gsap.from(card, {
        y: 150,
        opacity: 0,
        rotation: i % 2 === 0 ? -10 : 10,
        scale: 0.8,
        duration: 0.8,
        delay: i * 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: scrollSection,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Utensils float in from right
    if (utensilsImage) {
      gsap.from(utensilsImage, {
        x: 100,
        rotation: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scrollSection,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Scattered ingredients parallax
    floatingDecor.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          y: -100 - (i * 30),
          scrollTrigger: {
            trigger: counterSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });

        // Gentle rotation
        gsap.to(el, {
          rotation: 15 - (i * 10),
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });

    // CTA section entrance
    gsap.from(ctaSection, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ctaSection,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  function handleCardHover(index: number) {
    gsap.to(ingredientCards[index], {
      y: -15,
      scale: 1.05,
      rotation: 0,
      boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out"
    });
  }

  function handleCardLeave(index: number) {
    gsap.to(ingredientCards[index], {
      y: 0,
      scale: 1,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  }
</script>

<Hero />

<!-- Stats Counter Section -->
<section bind:this={counterSection} class="counter-section">
  <!-- Decorative pan -->
  <div bind:this={panImage} class="decor-pan">
    <img src="/images/equipment-pan.png" alt="" aria-hidden="true" />
  </div>

  <!-- Background with overlay -->
  <div class="counter-bg">
    <img src="/images/scene-topdown.png" alt="" aria-hidden="true" />
    <div class="counter-overlay"></div>
  </div>

  <!-- Scattered floating ingredients -->
  <div class="scattered-ingredients">
    {#each scatteredIngredients as item, i}
      <div
        bind:this={floatingDecor[i]}
        class="scattered-item"
        style="
          {item.top ? `top: ${item.top};` : ''}
          {item.bottom ? `bottom: ${item.bottom};` : ''}
          {item.left ? `left: ${item.left};` : ''}
          {item.right ? `right: ${item.right};` : ''}
          width: {item.size}px;
          height: {item.size}px;
        "
      >
        <img src={item.src} alt="" aria-hidden="true" />
      </div>
    {/each}
  </div>

  <div class="container">
    <div class="stats-grid">
      {#each stats as stat, i}
        <div class="stat-card">
          <span bind:this={counterNumbers[i]} class="stat-number">{stat.number}</span>
          <span class="stat-label">{stat.label}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Ingredients/Values Section -->
<section bind:this={scrollSection} class="ingredients-section">
  <!-- Decorative utensils -->
  <div bind:this={utensilsImage} class="decor-utensils">
    <img src="/images/equipment-utensils.png" alt="" aria-hidden="true" />
  </div>

  <div class="container">
    <h2 class="section-title">
      <span class="title-accent">The Secret</span>
      Ingredients
    </h2>

    <div class="ingredients-grid">
      {#each ingredients as ingredient, i}
        <article
          bind:this={ingredientCards[i]}
          class="ingredient-card"
          style="--accent-color: {ingredient.color}"
          on:mouseenter={() => handleCardHover(i)}
          on:mouseleave={() => handleCardLeave(i)}
          role="article"
        >
          <div class="card-image">
            <img src={ingredient.image} alt="" aria-hidden="true" />
          </div>
          <div class="card-accent"></div>
          <h3 class="card-title">{ingredient.title}</h3>
          <p class="card-description">{ingredient.description}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section bind:this={ctaSection} class="cta-section">
  <!-- Background image -->
  <div class="cta-bg">
    <img src="/images/scene-cozy.png" alt="" aria-hidden="true" />
    <div class="cta-overlay"></div>
  </div>

  <div class="container">
    <div class="cta-content">
      <div class="cta-icon">
        <Flame size={40} strokeWidth={1.5} />
      </div>
      <h2 class="cta-title">Let's Cook Something Up</h2>
      <p class="cta-text">Follow along on social media or get in touch for collaborations.</p>
      <div class="cta-buttons">
        <a href="/links" class="btn btn-primary">My Links</a>
        <a href="/contact" class="btn btn-secondary">Contact Me</a>
      </div>
    </div>
  </div>

  <!-- Floating steam decoration -->
  <div class="steam-decor">
    <img src="/images/decor-steam.png" alt="" aria-hidden="true" />
  </div>
</section>

<style>
  /* Counter Section */
  .counter-section {
    position: relative;
    padding: var(--space-2xl) var(--space-lg);
    overflow: hidden;
    min-height: 400px;
    display: flex;
    align-items: center;
  }

  .counter-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .counter-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .counter-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 248, 240, 0.92) 0%,
      rgba(255, 248, 240, 0.85) 100%
    );
  }

  .decor-pan {
    position: absolute;
    left: -50px;
    top: 50%;
    transform: translateY(-50%);
    width: 200px;
    z-index: 1;
    opacity: 0.5;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
  }

  .decor-pan img {
    width: 100%;
    height: auto;
  }

  .scattered-ingredients {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }

  .scattered-item {
    position: absolute;
    opacity: 0.4;
    filter: drop-shadow(0 5px 10px rgba(0,0,0,0.1));
  }

  .scattered-item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .stats-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-xl);
    text-align: center;
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-xl);
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }

  .stat-number {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 700;
    color: var(--color-orange);
    line-height: 1;
  }

  .stat-label {
    font-family: var(--font-accent);
    font-size: 1.25rem;
    color: var(--color-charcoal-light);
  }

  /* Ingredients Section */
  .ingredients-section {
    position: relative;
    padding: var(--space-2xl) var(--space-lg);
    background: linear-gradient(180deg, var(--color-cream) 0%, var(--color-cream-dark) 50%, var(--color-cream) 100%);
    overflow: hidden;
  }

  .decor-utensils {
    position: absolute;
    right: -30px;
    top: 20%;
    width: 180px;
    z-index: 0;
    opacity: 0.5;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
  }

  .decor-utensils img {
    width: 100%;
    height: auto;
  }

  .section-title {
    position: relative;
    z-index: 1;
    text-align: center;
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: var(--space-xl);
    color: var(--color-charcoal);
  }

  .title-accent {
    display: block;
    font-family: var(--font-accent);
    font-size: 0.5em;
    color: var(--color-orange);
    font-weight: 400;
  }

  .ingredients-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-xl);
    max-width: 1000px;
    margin: 0 auto;
  }

  .ingredient-card {
    position: relative;
    background: var(--color-cream);
    padding: var(--space-xl);
    padding-top: calc(var(--space-xl) + 40px);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: visible;
    cursor: pointer;
  }

  .card-image {
    position: absolute;
    top: -30px;
    right: 20px;
    width: 70px;
    height: 70px;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
    transition: transform 0.3s ease;
    z-index: 2;
  }

  .ingredient-card:hover .card-image {
    transform: scale(1.2) rotate(10deg);
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .card-accent {
    height: 4px;
    background: var(--accent-color);
    border-radius: 2px;
    margin-bottom: var(--space-md);
  }

  .card-title {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--color-charcoal);
    margin-bottom: var(--space-md);
  }

  .card-description {
    color: var(--color-charcoal-light);
    line-height: 1.7;
  }

  /* CTA Section */
  .cta-section {
    position: relative;
    padding: var(--space-2xl) var(--space-lg);
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .cta-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .cta-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .cta-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(61, 44, 41, 0.85) 0%,
      rgba(61, 44, 41, 0.75) 100%
    );
  }

  .cta-content {
    position: relative;
    z-index: 1;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    color: var(--color-cream);
  }

  .cta-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: var(--color-orange);
    border-radius: 50%;
    margin-bottom: var(--space-lg);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(232, 93, 36, 0.4); }
    50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(232, 93, 36, 0); }
  }

  .cta-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: var(--space-md);
  }

  .cta-text {
    font-size: 1.125rem;
    opacity: 0.9;
    margin-bottom: var(--space-xl);
  }

  .cta-buttons {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: var(--space-md) var(--space-xl);
    border-radius: var(--radius-full);
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s var(--ease-out-back);
  }

  .btn-primary {
    background: var(--color-orange);
    color: var(--color-cream);
    box-shadow: 0 10px 30px rgba(232, 93, 36, 0.4);
  }

  .btn-primary:hover {
    background: var(--color-orange-light);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 40px rgba(232, 93, 36, 0.5);
  }

  .btn-secondary {
    background: transparent;
    color: var(--color-cream);
    border: 2px solid var(--color-cream);
  }

  .btn-secondary:hover {
    background: var(--color-cream);
    color: var(--color-charcoal);
    transform: translateY(-3px);
  }

  .steam-decor {
    position: absolute;
    bottom: 10%;
    right: 10%;
    width: 150px;
    opacity: 0.3;
    animation: float 4s ease-in-out infinite;
    z-index: 1;
    pointer-events: none;
  }

  .steam-decor img {
    width: 100%;
    height: auto;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .counter-section {
      padding-left: var(--space-md);
      padding-right: var(--space-md);
    }

    .ingredients-section {
      padding-left: var(--space-md);
      padding-right: var(--space-md);
    }

    .stats-grid {
      grid-template-columns: 1fr;
      gap: var(--space-lg);
    }

    .ingredients-grid {
      grid-template-columns: 1fr;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }

    .btn {
      width: 100%;
      max-width: 250px;
    }

    .decor-pan,
    .decor-utensils {
      display: none;
    }

    .scattered-item {
      opacity: 0.3;
    }

    .steam-decor {
      display: none;
    }
  }
</style>
