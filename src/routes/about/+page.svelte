<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { Brush, Heart, Flame, ChefHat, Award, Tv } from 'lucide-svelte';

  let heroSection: HTMLElement;
  let coupleImage: HTMLElement;
  let timelineItems: HTMLElement[] = [];
  let factCards: HTMLElement[] = [];

  const timeline = [
    {
      year: 'The Beginning',
      title: 'Art Meets Engineering',
      description: 'Started exploring the intersection of art and physics with pendulum paintings, pushing boundaries of what\'s possible on canvas.',
      icon: Brush
    },
    {
      year: 'Going Viral',
      title: '5 Million Strong',
      description: 'Built an incredible community of creative minds who believed that everything you can imagine is real.',
      icon: Heart
    },
    {
      year: 'New Chapter',
      title: 'From Canvas to Kitchen',
      description: 'Discovered that cooking is just another form of creative expression. Same passion, different medium.',
      icon: Flame
    },
    {
      year: 'Today',
      title: 'Cooking Up Content',
      description: 'Now bringing that same experimental energy to the kitchen, one recipe at a time.',
      icon: ChefHat
    }
  ];

  const facts = [
    { icon: Brush, text: 'Started with pendulum painting, physics meets art' },
    { icon: Award, text: 'Set a world record with art projects' },
    { icon: Tv, text: 'Featured on NBC, Buzzfeed, and more' },
  ];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero content entrance
    gsap.from(heroSection.querySelector('.hero-content'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    // Couple image entrance
    if (coupleImage) {
      gsap.from(coupleImage, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
      });
    }

    // Timeline items stagger in
    timelineItems.forEach((item, i) => {
      if (item) {
        gsap.from(item, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    // Fact cards pop in
    factCards.forEach((card, i) => {
      if (card) {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.facts-section',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });
  });
</script>

<svelte:head>
  <title>About | colescooks</title>
</svelte:head>

<section bind:this={heroSection} class="about-hero">
  <div class="container">
    <div class="hero-grid">
      <div class="hero-content">
        <span class="label">About</span>
        <h1 class="page-title">Hey, I'm Cole</h1>
        <p class="hero-description">
          Creator, artist turned chef, and firm believer that cooking is just another canvas.
          I've spent years pushing the boundaries of art with physics and engineering. Now I'm
          bringing that same experimental spirit to the kitchen.
        </p>
        <p class="hero-description secondary">
          Together with my wife, we're cooking up something special. Join us on this delicious adventure.
        </p>
      </div>

      <!-- Couple Image -->
      <div bind:this={coupleImage} class="couple-image">
        <img src="/images/cavery.png" alt="Cole and his wife cooking together" />
      </div>
    </div>
  </div>

  <!-- Background decoration -->
  <div class="hero-bg">
    <div class="gradient-orb orb-1"></div>
    <div class="gradient-orb orb-2"></div>
  </div>
</section>

<!-- Timeline Section -->
<section class="timeline-section">
  <div class="container">
    <h2 class="section-title">The Journey</h2>

    <div class="timeline">
      {#each timeline as item, i}
        <div
          bind:this={timelineItems[i]}
          class="timeline-item"
        >
          <div class="timeline-icon">
            <svelte:component this={item.icon} size={24} strokeWidth={2} />
          </div>
          <div class="timeline-content">
            <span class="timeline-year">{item.year}</span>
            <h3 class="timeline-title">{item.title}</h3>
            <p class="timeline-description">{item.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Fun Facts Section -->
<section class="facts-section">
  <div class="container">
    <h2 class="section-title">Quick Facts</h2>

    <div class="facts-grid">
      {#each facts as fact, i}
        <div bind:this={factCards[i]} class="fact-card">
          <div class="fact-icon">
            <svelte:component this={fact.icon} size={24} strokeWidth={2} />
          </div>
          <p>{fact.text}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .about-hero {
    min-height: 90vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: calc(var(--space-2xl) + 80px) var(--space-lg) var(--space-2xl);
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2xl);
    align-items: center;
  }

  .hero-content {
    position: relative;
    z-index: 1;
  }

  .label {
    font-family: var(--font-accent);
    font-size: 1.25rem;
    color: var(--color-orange);
    display: block;
    margin-bottom: var(--space-sm);
  }

  .page-title {
    font-size: clamp(3rem, 8vw, 5rem);
    color: var(--color-charcoal);
    margin-bottom: var(--space-lg);
    line-height: 1.1;
  }

  .hero-description {
    font-size: 1.25rem;
    line-height: 1.8;
    color: var(--color-charcoal-light);
    margin-bottom: var(--space-md);
  }

  .hero-description.secondary {
    font-style: italic;
    color: var(--color-orange);
  }

  /* Couple Image */
  .couple-image {
    position: relative;
    z-index: 1;
  }

  .couple-image img {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
  }

  .orb-1 {
    width: 500px;
    height: 500px;
    background: var(--color-orange);
    opacity: 0.06;
    top: -150px;
    right: -150px;
  }

  .orb-2 {
    width: 300px;
    height: 300px;
    background: var(--color-sage);
    opacity: 0.08;
    bottom: 0;
    left: 30%;
  }

  /* Timeline Section */
  .timeline-section {
    position: relative;
    padding: var(--space-2xl) var(--space-lg);
    background: var(--color-cream-dark);
  }

  .section-title {
    text-align: center;
    font-size: clamp(2rem, 5vw, 3rem);
    color: var(--color-charcoal);
    margin-bottom: var(--space-xl);
  }

  .timeline {
    position: relative;
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .timeline-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-lg);
  }

  .timeline-icon {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    background: var(--color-orange);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-cream);
    box-shadow: var(--shadow-md);
  }

  .timeline-content {
    flex: 1;
    background: var(--color-cream);
    padding: var(--space-lg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
  }

  .timeline-year {
    font-family: var(--font-accent);
    font-size: 0.9rem;
    color: var(--color-orange);
  }

  .timeline-title {
    font-family: var(--font-display);
    font-size: 1.25rem;
    color: var(--color-charcoal);
    margin: var(--space-xs) 0 var(--space-sm);
  }

  .timeline-description {
    color: var(--color-charcoal-light);
    line-height: 1.6;
  }

  /* Facts Section */
  .facts-section {
    padding: var(--space-2xl) var(--space-lg);
  }

  .facts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-md);
    max-width: 900px;
    margin: 0 auto;
  }

  .fact-card {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    background: var(--color-cream-dark);
    padding: var(--space-lg);
    border-radius: var(--radius-lg);
    transition: transform 0.2s ease;
  }

  .fact-card:hover {
    transform: translateY(-3px);
  }

  .fact-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    background: var(--color-orange);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-cream);
  }

  .fact-card p {
    color: var(--color-charcoal);
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .hero-grid {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .couple-image {
      order: -1;
    }

    .couple-image img {
      max-width: 300px;
      margin: 0 auto;
    }

    .timeline-item {
      flex-direction: column;
      gap: var(--space-md);
    }

    .facts-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
