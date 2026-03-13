<script lang="ts">
  const links = [
    { title: 'Contact Me', url: '/contact', icon: '', featured: true, external: false },
    { title: 'TikTok', url: 'https://www.tiktok.com/@colescooks', icon: '/images/icon-tiktok.png' },
    { title: 'YouTube', url: 'https://www.youtube.com/@Colescooks', icon: '/images/icon-youtube.png' },
    { title: 'Facebook', url: 'https://www.facebook.com/Colescooks', icon: '/images/icon-facebook.png' },
    { title: 'Instagram', url: 'https://www.instagram.com/colescooks/', icon: '/images/icon-instagram.png' },
  ];
</script>

<svelte:head>
  <title>Links | colescooks</title>
  <meta name="description" content="All of Cole's links in one place" />
</svelte:head>

<section class="links-page">
  <div class="bg-image">
    <img src="/images/scene-cozy.png" alt="" aria-hidden="true" />
    <div class="bg-overlay"></div>
  </div>

  <div class="links-container">
    <div class="profile-section">
      <div class="avatar">
        <img src="/images/cole-about.jpeg" alt="Cole" />
      </div>
      <h1 class="profile-name">colescooks</h1>
      <p class="profile-tagline">Creator. Chef. Culinary Experimenter.</p>
    </div>

    <div class="links-list">
      {#each links as link, i}
        <a
          href={link.url}
          class="link-card{link.featured ? ' featured' : ''}"
          target={link.external !== false ? '_blank' : undefined}
          rel={link.external !== false ? 'noopener noreferrer' : undefined}
        >
          {#if link.icon}
            <img src={link.icon} alt="" class="link-icon" />
          {:else}
            <svg class="link-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
          {/if}
          <span class="link-title">{link.title}</span>
          <span class="link-arrow">→</span>
        </a>
      {/each}
    </div>

    <a href="/" class="full-site-link">Visit Full Website</a>

    <footer class="links-footer">
      <p>Everything you can imagine is real.</p>
    </footer>
  </div>
</section>

<style>
  .links-page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: var(--space-xl) var(--space-md);
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }

  .bg-image {
    position: fixed;
    inset: 0;
    z-index: 0;
  }

  .bg-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      160deg,
      rgba(255, 248, 240, 0.93) 0%,
      rgba(245, 235, 224, 0.9) 50%,
      rgba(255, 248, 240, 0.88) 100%
    );
  }

  .links-container {
    width: 100%;
    max-width: 440px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 10;
  }

  /* Profile */
  .profile-section {
    text-align: center;
    margin-bottom: var(--space-lg);
  }

  .avatar {
    width: 220px;
    height: 220px;
    margin: 0 auto var(--space-md);
    border-radius: 50%;
    overflow: hidden;
    box-shadow:
      0 8px 30px rgba(232, 93, 36, 0.2),
      0 0 0 4px var(--color-cream),
      0 0 0 7px var(--color-orange);
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 15%;
  }

  .profile-name {
    font-family: var(--font-display);
    font-size: 2rem;
    color: var(--color-charcoal);
    margin-bottom: var(--space-xs);
  }

  .profile-tagline {
    font-family: var(--font-accent);
    font-size: 1.15rem;
    color: var(--color-orange);
  }

  /* Links */
  .links-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .link-card {
    display: flex;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    background: var(--color-cream);
    border-radius: var(--radius-full);
    box-shadow:
      var(--shadow-sm),
      inset 0 0 0 2px rgba(0, 0, 0, 0.04);
    transition: all 0.3s var(--ease-out-back);
    text-decoration: none;
    position: relative;
    overflow: hidden;
  }

  .link-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  /* Featured contact button */
  .link-card.featured {
    background: var(--color-orange);
    box-shadow:
      0 4px 20px rgba(232, 93, 36, 0.3),
      0 0 0 3px rgba(232, 93, 36, 0.15);
  }

  .link-card.featured .link-title {
    color: var(--color-cream);
  }

  .link-card.featured .link-arrow {
    color: var(--color-cream);
  }

  .link-card.featured:hover {
    box-shadow:
      0 8px 30px rgba(232, 93, 36, 0.4),
      0 0 0 3px rgba(232, 93, 36, 0.2);
  }

  .link-icon {
    width: 28px;
    height: 28px;
    object-fit: contain;
    margin-right: var(--space-md);
    position: relative;
    z-index: 1;
    border-radius: 6px;
  }

  .link-icon-svg {
    width: 24px;
    height: 24px;
    margin-right: var(--space-md);
    position: relative;
    z-index: 1;
    color: var(--color-cream);
    flex-shrink: 0;
  }


  .link-title {
    flex: 1;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 1.05rem;
    color: var(--color-charcoal);
    position: relative;
    z-index: 1;
    transition: color 0.3s ease;
  }

  .link-arrow {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-orange);
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateX(-8px);
    transition: all 0.3s var(--ease-out-back);
  }

  .link-card:hover .link-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* Full site link */
  .full-site-link {
    display: inline-flex;
    align-items: center;
    margin-top: var(--space-xl);
    padding: var(--space-sm) var(--space-lg);
    color: var(--color-charcoal-light);
    font-weight: 500;
    font-size: 0.9rem;
    text-decoration: none;
    border-radius: var(--radius-full);
    border: 1.5px solid var(--color-cream-dark);
    transition: all 0.3s ease;
  }

  .full-site-link:hover {
    background: var(--color-orange);
    border-color: var(--color-orange);
    color: var(--color-cream);
    transform: translateY(-2px);
  }

  /* Footer */
  .links-footer {
    margin-top: var(--space-lg);
    text-align: center;
  }

  .links-footer p {
    font-family: var(--font-accent);
    font-size: 1rem;
    color: var(--color-charcoal-light);
    opacity: 0.5;
  }
</style>
