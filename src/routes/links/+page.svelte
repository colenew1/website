<script lang="ts">
  import { Play, Youtube, Video, Folder, ExternalLink, ChefHat } from 'lucide-svelte';

  // Placeholder links - update these with real URLs
  const links = [
    {
      title: 'Latest Video',
      description: 'Watch my newest cooking creation',
      url: '#',
      icon: Play,
      color: 'var(--color-coral)'
    },
    {
      title: 'YouTube Channel',
      description: 'Subscribe for more recipes',
      url: '#',
      icon: Youtube,
      color: 'var(--color-orange)'
    },
    {
      title: 'TikTok',
      description: 'Quick cooking clips',
      url: '#',
      icon: Video,
      color: 'var(--color-charcoal)'
    },
    {
      title: 'Cooking Channel',
      description: 'Full recipe tutorials',
      url: '#',
      icon: ChefHat,
      color: 'var(--color-sage)'
    },
    {
      title: 'Media Kit',
      description: 'For press and collaborations',
      url: '#',
      icon: Folder,
      color: 'var(--color-charcoal-light)'
    }
  ];

  const socials = [
    { name: 'TikTok', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'YouTube', url: '#' },
    { name: 'Facebook', url: '#' },
  ];
</script>

<svelte:head>
  <title>Links | colescooks</title>
  <meta name="description" content="All of Cole's links in one place - YouTube, TikTok, and more!" />
</svelte:head>

<section class="links-page">
  <!-- Background image -->
  <div class="bg-image">
    <img src="/images/scene-cozy.png" alt="" aria-hidden="true" />
    <div class="bg-overlay"></div>
  </div>

  <div class="links-container">
    <!-- Profile Section -->
    <div class="profile-section">
      <div class="avatar">
        <img src="/images/cavery.png" alt="Cole and his wife" />
      </div>
      <h1 class="profile-name">colescooks</h1>
      <p class="profile-tagline">Creator. Chef. Culinary Experimenter.</p>

      <!-- Social Icons Row -->
      <div class="social-row">
        {#each socials as social}
          <a
            href={social.url}
            class="social-icon"
            aria-label={social.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="social-letter">{social.name[0]}</span>
          </a>
        {/each}
      </div>
    </div>

    <!-- Links List -->
    <div class="links-list">
      {#each links as link}
        <a
          href={link.url}
          class="link-card"
          style="--card-color: {link.color}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="link-icon">
            <svelte:component this={link.icon} size={22} strokeWidth={2} />
          </div>
          <div class="link-content">
            <span class="link-title">{link.title}</span>
            <span class="link-description">{link.description}</span>
          </div>
          <div class="link-arrow">
            <ExternalLink size={18} strokeWidth={2} />
          </div>
        </a>
      {/each}
    </div>

    <!-- Visit Full Site Link -->
    <a href="/" class="full-site-link">
      Visit Full Website
      <ExternalLink size={16} strokeWidth={2} />
    </a>

    <!-- Footer -->
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
    isolation: isolate; /* Creates new stacking context */
  }

  /* Background */
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
      135deg,
      rgba(255, 248, 240, 0.92) 0%,
      rgba(255, 248, 240, 0.88) 50%,
      rgba(255, 248, 240, 0.85) 100%
    );
  }

  .links-container {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 10;
  }

  /* Profile Section */
  .profile-section {
    text-align: center;
    margin-bottom: var(--space-xl);
  }

  .avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto var(--space-md);
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(232, 93, 36, 0.25);
    border: 3px solid var(--color-orange);
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  .profile-name {
    font-family: var(--font-display);
    font-size: 1.75rem;
    color: var(--color-charcoal);
    margin-bottom: var(--space-xs);
  }

  .profile-tagline {
    font-size: 0.95rem;
    color: var(--color-charcoal-light);
    margin-bottom: var(--space-md);
  }

  .social-row {
    display: flex;
    justify-content: center;
    gap: var(--space-sm);
  }

  .social-icon {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-cream-dark);
    border-radius: 50%;
    color: var(--color-charcoal);
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.2s ease;
  }

  .social-icon:hover {
    background: var(--color-orange);
    color: var(--color-cream);
    transform: translateY(-2px);
  }

  /* Links List */
  .links-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .link-card {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    background: var(--color-cream);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    border-left: 3px solid var(--card-color);
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .link-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateX(5px) scale(1.02);
  }

  .link-icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--card-color);
    border-radius: var(--radius-md);
    color: var(--color-cream);
    flex-shrink: 0;
  }

  .link-content {
    flex: 1;
    min-width: 0;
  }

  .link-title {
    display: block;
    font-weight: 600;
    color: var(--color-charcoal);
    font-size: 0.95rem;
  }

  .link-description {
    display: block;
    font-size: 0.8rem;
    color: var(--color-charcoal-light);
    margin-top: 2px;
  }

  .link-arrow {
    color: var(--color-charcoal-light);
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.2s ease;
  }

  .link-card:hover .link-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* Full Site Link */
  .full-site-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    margin-top: var(--space-xl);
    padding: var(--space-sm) var(--space-md);
    color: var(--color-orange);
    font-weight: 500;
    font-size: 0.9rem;
    text-decoration: none;
    border-radius: var(--radius-full);
    transition: all 0.2s ease;
  }

  .full-site-link:hover {
    background: var(--color-orange);
    color: var(--color-cream);
  }

  /* Footer */
  .links-footer {
    margin-top: var(--space-xl);
    text-align: center;
  }

  .links-footer p {
    font-family: var(--font-accent);
    font-size: 0.85rem;
    color: var(--color-charcoal-light);
    opacity: 0.6;
  }
</style>
