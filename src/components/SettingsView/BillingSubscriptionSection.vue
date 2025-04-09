<script setup lang="ts">
defineOptions({ name: 'BillingSubscriptionSection' });

</script>

<template>
  <section class="settings-section billing-subscription-section">
    <div class="section-header">
      <h2>Billing & Subscription</h2>
      <p>Manage your subscription and payment methods</p>
    </div>

    <!-- Current Plan -->
    <div class="setting-group">
      <h3>Current Plan</h3>
      <div class="current-plan-card">
        <div class="plan-details">
          <strong>Free Plan</strong> <span class="badge active-badge">Active</span>
          <p>Access to basic courses and features</p>
        </div>
        <button class="btn btn-primary">Upgrade Plan</button>
      </div>
    </div>

    <!-- Plan Comparison -->
    <div class="plan-comparison-grid">
      <!-- Free Plan Card -->
      <div class="plan-card">
        <h4>Free</h4>
        <div class="price"><strong>$0</strong>/month</div>
        <ul class="features-list">
          <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> Access to free courses</li>
          <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> Basic learning tools</li>
          <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> Community access</li>
        </ul>
        <button class="btn btn-secondary current-plan-btn" disabled>Current Plan</button>
      </div>

      <!-- Pro Plan Card -->
      <div class="plan-card popular">
        <span class="popular-badge">Popular</span>
        <h4>Pro</h4>
        <div class="price"><strong>$0</strong>/month</div>
        <ul class="features-list">
          <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> All free features</li>
          <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> Access to all courses</li>
          <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> Project feedback</li>
          <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> Certificates</li>
        </ul>
        <button class="btn btn-primary">Upgrade to Pro</button>
      </div>

      <!-- Enterprise Plan Card -->
      <div class="plan-card">
        <h4>Enterprise</h4>
        <div class="price"><strong>$0</strong>/month</div>
        <ul class="features-list">
          <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> All Pro features</li>
          <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> Dedicated support</li>
          <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> Team management</li>
          <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> Custom learning paths</li>
        </ul>
        <button class="btn btn-primary">Upgrade to Enterprise</button>
      </div>
    </div>

    <!-- Payment Methods -->
    <div class="setting-group">
      <h3>Payment Methods</h3>
      <div class="payment-method-item">
        <div class="payment-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
        </div>
        <div class="payment-details">
          <strong>Add Payment Method</strong>
          <p>Add a credit card or other payment method</p>
        </div>
        <button class="btn btn-secondary">Add Method</button>
      </div>
    </div>

    <!-- Billing History -->
    <div class="setting-group">
      <h3>Billing History</h3>
      <div class="billing-history-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" class="no-history">No billing history available</td>
            </tr>
            <!-- Add history rows here when available -->
          </tbody>
        </table>
      </div>
    </div>

  </section>
</template>

<style scoped>
.settings-section {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-dark);
}

.section-header p {
  font-size: 0.9375rem;
  color: var(--text-light);
  line-height: 1.5;
}

.setting-group {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}
.setting-group:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
}

.setting-group h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

/* Current Plan Card */
.current-plan-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-light);
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  flex-wrap: wrap;
  gap: 1rem;
}

.plan-details strong {
  font-weight: 600;
  color: var(--text-dark);
  margin-right: 0.5rem;
}

.plan-details p {
  font-size: 0.875rem;
  color: var(--text-light);
  margin: 0.25rem 0 0 0;
}

.badge.active-badge {
  background-color: var(--primary-color);
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  vertical-align: middle;
}

/* Plan Comparison Grid */
.plan-comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.plan-card {
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.plan-card.popular {
    border-color: var(--primary-color);
    border-width: 2px;
}

.popular-badge {
    position: absolute;
    top: -1px;
    right: 1rem;
    background-color: var(--primary-color);
    color: white;
    padding: 4px 10px;
    font-size: 0.75rem;
    font-weight: 500;
    border-radius: 0 0 0.5rem 0.5rem;
}

.plan-card h4 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.price {
  font-size: 1.75rem;
  font-weight: 300;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
}
.price strong {
    font-weight: 700;
}
.price span {
    font-size: 1rem;
    color: var(--text-light);
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: var(--text-dark);
}

.features-list svg {
  color: var(--primary-color);
  flex-shrink: 0;
}

.plan-card .btn {
  width: 100%;
  justify-content: center;
  margin-top: auto;
}

.current-plan-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background-color: var(--bg-light);
    border-color: var(--border-color);
    color: var(--text-light);
}

/* Payment Methods */
.payment-method-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
}

.payment-icon {
  color: var(--text-light);
  flex-shrink: 0;
}
.payment-icon svg {
    width: 24px;
    height: 24px;
}

.payment-details {
  flex-grow: 1;
  line-height: 1.3;
}
.payment-details strong {
  color: var(--text-dark);
  display: block;
  margin-bottom: 0.2rem;
}
.payment-details p {
  color: var(--text-light);
  font-size: 0.8rem;
  margin: 0;
}

.payment-method-item .btn {
    margin-left: auto;
}

/* Billing History */
.billing-history-table {
    overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.875rem;
  white-space: nowrap;
}

th {
  color: var(--text-light);
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

td {
  color: var(--text-dark);
}

.no-history {
    text-align: center;
    color: var(--text-light);
    padding: 2rem;
}

/* Buttons */
.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-dark);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--bg-light);
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: var(--primary-color-dark);
}

@media (max-width: 768px) {
  .settings-section {
    padding: 1.5rem;
  }
  .section-header h2 {
    font-size: 1.25rem;
  }
  .current-plan-card {
      flex-direction: column;
      align-items: flex-start;
  }
  .current-plan-card .btn {
      width: 100%;
      justify-content: center;
  }
   .payment-method-item {
       flex-direction: column;
       align-items: flex-start;
   }
   .payment-method-item .btn {
       width: 100%;
       justify-content: center;
       margin-left: 0;
       margin-top: 0.5rem;
   }
}
</style>
