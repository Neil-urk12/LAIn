<template>
  <footer class="app-footer">
    <div class="container footer-container">
      <div class="footer-about">
        <a href="#" class="footer-logo">LAIn</a>
        <p>
          The leading platform for AI education and skill development.
        </p>
      </div>
      <div class="footer-links">
        <h4>Platform</h4>
        <ul>
          <li><a href="#">Courses</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">For Teams</a></li>
          <li><a href="#">Enterprise</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h4>Resources</h4>
        <ul>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Community</a></li>
          <li><a href="#">Events</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container bottom-container">
        <p class="copyright">© 2025 LAIn. All rights reserved.</p>
        <div class="social-links">
          <a href="#" aria-label="Facebook"><Facebook :size="20" /></a>
          <a href="#" aria-label="Twitter"><Twitter :size="20" /></a>
          <a href="#" aria-label="Instagram"><Instagram :size="20" /></a>
          <a href="#" aria-label="LinkedIn"><Linkedin :size="20" /></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-vue-next';
</script>

<style scoped>
.app-footer {
  background: var(--footer-dark-gradient);
  color: var(--text-dark);
  padding-top: calc(var(--spacing-unit) * 8);
}

.footer-container {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr); /* Adjust column ratios */
  gap: calc(var(--spacing-unit) * 5);
  padding-bottom: calc(var(--spacing-unit) * 6);
}

.footer-about .footer-logo {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  text-decoration: none;
  margin-bottom: calc(var(--spacing-unit) * 2);
}

.footer-about p {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-light);
  margin-bottom: 0;
}

.footer-links h4 {
  color: var(--text-dark);
  font-size: 1rem; /* 16px */
  font-weight: 600;
  margin-bottom: calc(var(--spacing-unit) * 2.5);
}

.footer-links ul {
  list-style: none;
}

.footer-links li {
  margin-bottom: calc(var(--spacing-unit) * 1.5);
}

.footer-links a {
  color: var(--text-light);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--bg-white);
}

.footer-bottom {
  border-top: 1px solid #374151; /* Darker border */
  padding: calc(var(--spacing-unit) * 3) 0;
}

.bottom-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; /* Allow wrapping on small screens */
    gap: var(--spacing-unit) * 2;
}

.copyright {
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 0;
}

.social-links {
  display: flex;
  gap: calc(var(--spacing-unit) * 3);
}

.social-links a {
  color: var(--text-light);
  transition: color 0.2s ease;
}

.social-links a:hover {
  color: var(--bg-white);
}

/* Responsive adjustments for footer */
@media (max-width: 992px) {
  .footer-container {
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
  }
  .footer-about {
    grid-column: span 2; /* Make about span full width */
    margin-bottom: calc(var(--spacing-unit) * 4);
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr; /* 1 column */
    text-align: center;
  }
   .footer-about {
    grid-column: span 1;
  }
  .footer-links {
    margin-bottom: calc(var(--spacing-unit) * 3);
  }
  .bottom-container {
    flex-direction: column;
    text-align: center;
  }
  .social-links {
    justify-content: center;
  }
}
</style>
