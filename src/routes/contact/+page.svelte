<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { Send, Mail, MessageSquare, User, CheckCircle } from 'lucide-svelte';

  let pageContainer: HTMLElement;
  let headerSection: HTMLElement;
  let formContainer: HTMLElement;
  let formFields: HTMLElement[] = [];
  let floatingItems: HTMLElement[] = [];
  let decorPan: HTMLElement;

  let formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  let isSubmitting = false;
  let isSubmitted = false;

  const floatingIngredients = [
    { src: '/images/ingredient-onion.svg', top: '15%', left: '5%', size: 60 },
    { src: '/images/ingredient-herb.svg', top: '30%', right: '8%', size: 50 },
    { src: '/images/ingredient-garlic.svg', bottom: '25%', left: '3%', size: 45 },
    { src: '/images/ingredient-mushroom.svg', bottom: '15%', right: '5%', size: 55 },
    { src: '/images/ingredient-carrot.svg', top: '60%', left: '8%', size: 50 },
  ];

  onMount(() => {
    // Header entrance
    gsap.from(headerSection, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    // Form container entrance
    gsap.from(formContainer, {
      y: 60,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out"
    });

    // Form fields stagger in
    gsap.from(formFields, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.5,
      ease: "power2.out"
    });

    // Floating ingredients
    floatingItems.forEach((el, i) => {
      if (el) {
        gsap.from(el, {
          scale: 0,
          rotation: gsap.utils.random(-180, 180),
          opacity: 0,
          duration: 0.6,
          delay: 0.8 + (i * 0.1),
          ease: "back.out(2)"
        });

        // Continuous float
        gsap.to(el, {
          y: gsap.utils.random(-25, 25),
          rotation: gsap.utils.random(-20, 20),
          duration: 2.5 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3
        });
      }
    });

    // Decorative pan
    if (decorPan) {
      gsap.from(decorPan, {
        x: -100,
        rotation: -30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.5)"
      });

      gsap.to(decorPan, {
        y: -15,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  });

  function handleSubmit() {
    isSubmitting = true;

    // Button animation
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1
    });

    // Simulate form submission
    setTimeout(() => {
      isSubmitting = false;
      isSubmitted = true;

      gsap.from('.success-message', {
        scale: 0.8,
        opacity: 0,
        rotation: -5,
        duration: 0.6,
        ease: "back.out(2)"
      });

      // Confetti-like ingredient burst
      floatingItems.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            scale: 1.5,
            opacity: 0.8,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            delay: i * 0.05
          });
        }
      });
    }, 1500);
  }

  function resetForm() {
    isSubmitted = false;
    formData = { name: '', email: '', subject: '', message: '' };
  }

  function handleFieldFocus(index: number) {
    gsap.to(formFields[index], {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out"
    });
  }

  function handleFieldBlur(index: number) {
    gsap.to(formFields[index], {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  }
</script>

<svelte:head>
  <title>Contact | colescooks</title>
</svelte:head>

<section bind:this={pageContainer} class="contact-page">
  <!-- Floating ingredients -->
  <div class="floating-decor">
    {#each floatingIngredients as item, i}
      <div
        bind:this={floatingItems[i]}
        class="floating-item"
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

  <!-- Decorative pan -->
  <div bind:this={decorPan} class="decor-pan">
    <img src="/images/equipment-pan.png" alt="" aria-hidden="true" />
  </div>

  <div class="container">
    <div bind:this={headerSection} class="contact-header">
      <span class="label">Contact</span>
      <h1 class="page-title">Let's Connect</h1>
      <p class="page-subtitle">Got a question, collaboration idea, or just want to say hi? Drop me a line.</p>
    </div>

    <div bind:this={formContainer} class="contact-content">
      {#if !isSubmitted}
        <form class="contact-form" on:submit|preventDefault={handleSubmit}>
          <!-- Decorative element on form -->
          <div class="form-decor">
            <img src="/images/decor-sparkles.png" alt="" aria-hidden="true" />
          </div>

          <div
            bind:this={formFields[0]}
            class="form-group"
            on:focusin={() => handleFieldFocus(0)}
            on:focusout={() => handleFieldBlur(0)}
          >
            <label for="name" class="form-label">
              <User size={18} strokeWidth={2} />
              <span>Your Name</span>
            </label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
              class="form-input"
              placeholder="What should I call you?"
            />
          </div>

          <div
            bind:this={formFields[1]}
            class="form-group"
            on:focusin={() => handleFieldFocus(1)}
            on:focusout={() => handleFieldBlur(1)}
          >
            <label for="email" class="form-label">
              <Mail size={18} strokeWidth={2} />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              required
              class="form-input"
              placeholder="your@email.com"
            />
          </div>

          <div
            bind:this={formFields[2]}
            class="form-group"
            on:focusin={() => handleFieldFocus(2)}
            on:focusout={() => handleFieldBlur(2)}
          >
            <label for="subject" class="form-label">
              <MessageSquare size={18} strokeWidth={2} />
              <span>What's this about?</span>
            </label>
            <select id="subject" bind:value={formData.subject} required class="form-input form-select">
              <option value="">Select a topic...</option>
              <option value="collab">Collaboration</option>
              <option value="business">Business Inquiry</option>
              <option value="press">Press / Media</option>
              <option value="fan">Just Saying Hi!</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div
            bind:this={formFields[3]}
            class="form-group"
            on:focusin={() => handleFieldFocus(3)}
            on:focusout={() => handleFieldBlur(3)}
          >
            <label for="message" class="form-label">
              <span>Your Message</span>
            </label>
            <textarea
              id="message"
              bind:value={formData.message}
              required
              class="form-input form-textarea"
              placeholder="What's on your mind?"
              rows="5"
            ></textarea>
          </div>

          <button
            bind:this={formFields[4]}
            type="submit"
            class="submit-btn"
            disabled={isSubmitting}
          >
            {#if isSubmitting}
              <span class="loading">Sending...</span>
            {:else}
              <span>Send Message</span>
              <Send size={20} strokeWidth={2} />
            {/if}
          </button>
        </form>
      {:else}
        <!-- Success Message -->
        <div class="success-message">
          <div class="success-icon">
            <CheckCircle size={40} strokeWidth={2} />
          </div>
          <h2>Message Sent!</h2>
          <p>Thanks for reaching out. I'll get back to you as soon as I can.</p>
          <div class="success-decor">
            <img src="/images/ingredient-tomato.svg" alt="" class="success-ingredient ing-1" />
            <img src="/images/ingredient-egg.svg" alt="" class="success-ingredient ing-2" />
            <img src="/images/ingredient-herb.svg" alt="" class="success-ingredient ing-3" />
          </div>
          <button class="reset-btn" on:click={resetForm}>Send Another Message</button>
        </div>
      {/if}
    </div>
  </div>

  <!-- Background decoration -->
  <div class="bg-decoration">
    <div class="gradient-orb orb-1"></div>
    <div class="gradient-orb orb-2"></div>
    <div class="gradient-orb orb-3"></div>
  </div>
</section>

<style>
  .contact-page {
    min-height: 100vh;
    padding: calc(var(--space-2xl) + 80px) var(--space-lg) var(--space-2xl);
    position: relative;
    overflow: hidden;
  }

  /* Floating ingredients */
  .floating-decor {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .floating-item {
    position: absolute;
    opacity: 0.5;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15));
  }

  .floating-item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* Decorative pan */
  .decor-pan {
    position: absolute;
    bottom: 10%;
    right: -50px;
    width: 180px;
    opacity: 0.7;
    z-index: 0;
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.2));
  }

  .decor-pan img {
    width: 100%;
    height: auto;
  }

  .contact-header {
    text-align: center;
    margin-bottom: var(--space-xl);
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
    font-size: clamp(2.5rem, 6vw, 4rem);
    color: var(--color-charcoal);
    margin-bottom: var(--space-md);
  }

  .page-subtitle {
    font-size: 1.125rem;
    color: var(--color-charcoal-light);
    max-width: 500px;
    margin: 0 auto;
  }

  .contact-content {
    max-width: 550px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* Form Styles */
  .contact-form {
    position: relative;
    background: var(--color-cream);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
  }

  .form-decor {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 60px;
    height: 60px;
    opacity: 0.7;
    animation: sparkle-rotate 6s linear infinite;
  }

  .form-decor img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @keyframes sparkle-rotate {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
  }

  .form-group {
    margin-bottom: var(--space-lg);
    transition: transform 0.2s ease;
  }

  .form-label {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--color-charcoal);
    margin-bottom: var(--space-sm);
  }

  .form-input {
    width: 100%;
    padding: var(--space-md);
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-charcoal);
    background: var(--color-cream-dark);
    border: 2px solid transparent;
    border-radius: var(--radius-md);
    transition: all 0.3s ease;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--color-orange);
    background: white;
    box-shadow: 0 0 0 4px rgba(232, 93, 36, 0.1);
  }

  .form-input::placeholder {
    color: var(--color-charcoal-light);
    opacity: 0.6;
  }

  .form-select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%233D2C29' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right var(--space-md) center;
    background-size: 20px;
  }

  .form-textarea {
    resize: vertical;
    min-height: 120px;
  }

  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    width: 100%;
    padding: var(--space-md) var(--space-xl);
    background: var(--color-orange);
    color: var(--color-cream);
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 600;
    border-radius: var(--radius-full);
    transition: all 0.3s var(--ease-out-back);
    box-shadow: 0 10px 30px rgba(232, 93, 36, 0.3);
  }

  .submit-btn:hover:not(:disabled) {
    background: var(--color-orange-light);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 40px rgba(232, 93, 36, 0.4);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .loading {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .loading::after {
    content: '';
    width: 18px;
    height: 18px;
    border: 2px solid var(--color-cream);
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Success Message */
  .success-message {
    text-align: center;
    padding: var(--space-2xl);
    background: var(--color-cream);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: visible;
  }

  .success-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto var(--space-lg);
    background: var(--color-sage);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-cream);
    animation: success-bounce 0.6s ease-out;
  }

  @keyframes success-bounce {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  .success-message h2 {
    font-family: var(--font-display);
    font-size: 2rem;
    color: var(--color-charcoal);
    margin-bottom: var(--space-sm);
  }

  .success-message p {
    color: var(--color-charcoal-light);
    margin-bottom: var(--space-lg);
  }

  .success-decor {
    position: relative;
    height: 60px;
    margin-bottom: var(--space-lg);
  }

  .success-ingredient {
    position: absolute;
    width: 40px;
    height: 40px;
    object-fit: contain;
    animation: float-success 2s ease-in-out infinite;
  }

  .ing-1 {
    left: 25%;
    animation-delay: 0s;
  }

  .ing-2 {
    left: 50%;
    transform: translateX(-50%);
    animation-delay: 0.3s;
  }

  .ing-3 {
    right: 25%;
    animation-delay: 0.6s;
  }

  @keyframes float-success {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(10deg); }
  }

  .reset-btn {
    padding: var(--space-md) var(--space-xl);
    background: transparent;
    color: var(--color-orange);
    border: 2px solid var(--color-orange);
    border-radius: var(--radius-full);
    font-weight: 600;
    transition: all 0.3s var(--ease-out-back);
  }

  .reset-btn:hover {
    background: var(--color-orange);
    color: var(--color-cream);
    transform: translateY(-2px);
  }

  /* Background decoration */
  .bg-decoration {
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
    width: 400px;
    height: 400px;
    background: var(--color-orange);
    opacity: 0.06;
    top: 10%;
    right: -100px;
  }

  .orb-2 {
    width: 300px;
    height: 300px;
    background: var(--color-sage);
    opacity: 0.08;
    bottom: 10%;
    left: -100px;
  }

  .orb-3 {
    width: 200px;
    height: 200px;
    background: var(--color-coral);
    opacity: 0.05;
    top: 50%;
    left: 20%;
  }

  @media (max-width: 768px) {
    .contact-form {
      padding: var(--space-lg);
    }

    .floating-item {
      opacity: 0.3;
    }

    .decor-pan {
      display: none;
    }

    .form-decor {
      width: 40px;
      height: 40px;
      top: -10px;
      right: -10px;
    }
  }
</style>
