<template>
  <section class="learning-path">
    <h2>Your Learning Path</h2>
    <p>Track your progress through the AI Developer path</p>
    <ul class="timeline">
      <li>
        <div class="step-icon completed">
          <span>✓</span>
        </div>
        <div class="details">
          <div class="title-row">
            <strong>AI Fundamentals</strong>
            <span class="badge completed">Completed</span>
          </div>
          <p>Learn the basics of artificial intelligence and machine learning.</p>
        </div>
      </li>
      <li>
        <div class="step-icon completed">
          <span>✓</span>
        </div>
        <div class="details">
          <div class="title-row">
            <strong>Python for Data Science</strong>
            <span class="badge completed">Completed</span>
          </div>
          <p>Master Python programming for data analysis and visualization.</p>
        </div>
      </li>
      <li>
        <div class="step-icon completed">
          <span>✓</span>
        </div>
        <div class="details">
          <div class="title-row">
            <strong>Machine Learning Algorithms</strong>
            <span class="badge completed">Completed</span>
          </div>
          <p>Understand and implement common machine learning algorithms.</p>
        </div>
      </li>
      <li>
        <div class="step-icon in-progress">
          <span>4</span>
        </div>
        <div class="details">
          <div class="title-row">
            <strong>Deep Learning Fundamentals</strong>
            <span class="badge in-progress">In Progress</span>
          </div>
          <p>Learn about neural networks and deep learning architectures.</p>
          <a href="#">Continue &rarr;</a>
        </div>
      </li>
      <li>
        <div class="step-icon upcoming">
          <span>5</span>
        </div>
        <div class="details">
          <div class="title-row">
            <strong>Natural Language Processing</strong>
          </div>
          <p>Build systems that can understand and generate human language.</p>
          <a href="#">Start &rarr;</a>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'LearningPath' })
</script>

<style scoped>
.learning-path {
  margin: 30px 0;
}

.learning-path h2 {
  margin-bottom: 5px;
}

.learning-path p {
  margin-bottom: 20px;
  color: #555;
}

.learning-path ul.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  margin-left: 20px;
}

.learning-path ul.timeline::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  width: 2px;
  background: #ddd;
}

.learning-path ul.timeline li {
  display: flex;
  gap: 15px;
  position: relative;
}

.learning-path ul.timeline li::before {
  content: "";
  position: absolute;
  left: 2px;
  top: 0;
  bottom: 0;
}

.step-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ccc;
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 10px;
  position: relative;
  z-index: 1;
}

.step-icon.completed {
  background: #34d399;
}

.step-icon.in-progress {
  background: #3b82f6;
}

.step-icon.upcoming {
  background: #ccc;
}

.learning-path li {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.learning-path li .details {
  flex: 1;
}

.learning-path li .title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.learning-path li .badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
}

.learning-path li .badge.completed {
  background: #d1fae5;
  color: #059669;
}

.learning-path li .badge.in-progress {
  background: #bfdbfe;
  color: #1d4ed8;
}

.learning-path li p {
  margin: 4px 0;
  color: #555;
}

.learning-path li a {
  font-size: 14px;
  color: #059669;
  text-decoration: none;
  margin-top: 5px;
  display: inline-block;
}

.learning-path li {
  display: flex;
  gap: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.icon {
  font-size: 24px;
}

.details {
  flex: 1;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
}

.badge.completed {
  background: #d1fae5;
  color: #059669;
}

.badge.in-progress {
  background: #fef08a;
  color: #92400e;
}
</style>
