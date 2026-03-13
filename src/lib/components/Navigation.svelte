<script lang="ts">
  import { page } from '$app/stores';
  import { onMount, tick } from 'svelte';
  import gsap from 'gsap';
  import { Home, User, Mail, Link } from 'lucide-svelte';

  let nav: HTMLElement;
  let mobileMenuOpen = false;
  let menuButton: HTMLButtonElement;
  let mobileMenu: HTMLDivElement;

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: User },
    { href: '/contact', label: 'Contact', icon: Mail },
    { href: '/links', label: 'Links', icon: Link },
  ];

  onMount(() => {
    if (nav) {
      gsap.from(nav, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out"
      });
    }
  });

  async function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;

    if (mobileMenuOpen) {
      await tick();
      if (mobileMenu) {
        gsap.fromTo(mobileMenu,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<nav bind:this={nav} class="nav">
  <div class="nav-content">
    <a href="/" class="logo">
      <span class="logo-text">colescooks</span>
    </a>

    <!-- Desktop Navigation -->
    <ul class="nav-items desktop">
      {#each navItems as item}
        <li>
          <a
            href={item.href}
            class="nav-link"
            class:active={$page.url.pathname === item.href}
            aria-current={$page.url.pathname === item.href ? 'page' : undefined}
          >
            <span class="nav-icon">
              <svelte:component this={item.icon} size={24} strokeWidth={2} />
            </span>
            <span class="nav-label">{item.label}</span>
          </a>
        </li>
      {/each}
    </ul>

    <!-- Mobile Menu Button -->
    <button
      bind:this={menuButton}
      class="mobile-menu-btn"
      on:click={toggleMobileMenu}
      aria-expanded={mobileMenuOpen}
      aria-label="Toggle menu"
    >
      <div class="hamburger" class:open={mobileMenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div bind:this={mobileMenu} class="mobile-menu">
      <ul class="nav-items mobile">
        {#each navItems as item}
          <li>
            <a
              href={item.href}
              class="nav-link"
              class:active={$page.url.pathname === item.href}
              on:click={closeMobileMenu}
            >
              <span class="nav-icon">
                <svelte:component this={item.icon} size={24} strokeWidth={2} />
              </span>
              <span class="nav-label">{item.label}</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: var(--space-md) var(--space-lg);
    background: linear-gradient(to bottom, var(--color-cream) 0%, transparent 100%);
  }

  .nav-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    cursor: pointer;
  }

  .logo-text {
    font-family: var(--font-accent);
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-charcoal);
    transition: all 0.2s ease;
  }

  .logo:hover .logo-text {
    color: var(--color-orange);
    transform: scale(1.02);
  }

  .logo:active .logo-text {
    transform: scale(0.98);
  }

  .nav-items {
    list-style: none;
    display: flex;
    gap: var(--space-sm);
    align-items: center;
  }

  .nav-items.desktop {
    display: none;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-full);
    transition: all 0.2s ease;
    color: var(--color-charcoal);
  }

  .nav-link:hover {
    background-color: var(--color-cream-dark);
    color: var(--color-orange);
  }

  .nav-link.active {
    background-color: var(--color-orange);
    color: var(--color-cream);
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-label {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 500;
  }

  /* Mobile Menu Button */
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--color-orange);
    border-radius: var(--radius-md);
    transition: transform 0.2s var(--ease-out-back);
  }

  .mobile-menu-btn:hover {
    transform: scale(1.05);
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 24px;
  }

  .hamburger span {
    display: block;
    height: 3px;
    background: var(--color-cream);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .hamburger.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 6px);
  }

  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -7px);
  }

  /* Mobile Menu */
  .mobile-menu {
    position: absolute;
    top: 100%;
    left: var(--space-md);
    right: var(--space-md);
    background: var(--color-cream);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    box-shadow: var(--shadow-lg);
  }

  .nav-items.mobile {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .nav-items.mobile .nav-link {
    width: 100%;
    padding: var(--space-md);
    border-radius: var(--radius-md);
  }

  .nav-items.mobile .nav-label {
    font-size: 1.1rem;
  }

  /* Desktop breakpoint */
  @media (min-width: 768px) {
    .nav-items.desktop {
      display: flex;
    }

    .mobile-menu-btn {
      display: none;
    }

    .mobile-menu {
      display: none;
    }
  }
</style>
