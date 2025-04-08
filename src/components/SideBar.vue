<script setup lang="ts">
import { BookOpen, LayoutGrid, Calendar, MessageSquare, FileText, CreditCard, Settings } from 'lucide-vue-next'

defineOptions({ name: 'AppSidebar' })
</script>

<template>
  <aside class="sidebar">
    <div class="logo">
      <BookOpen :size="20" color="#059669" style="margin-right: 6px;" />
      LAIn
    </div>
    <nav>
      <ul>
        <li class="active">
          <LayoutGrid :size="18" color="#059669" />
          Dashboard
        </li>
        <li>
          <BookOpen :size="18" color="#059669" />
          My Courses
        </li>
        <li>
          <Calendar :size="18" color="#059669" />
          Calendar
        </li>
        <li>
          <MessageSquare :size="18" color="#059669" />
          Messages
        </li>
        <li>
          <FileText :size="18" color="#059669" />
          Certificates
        </li>
        <li>
          <CreditCard :size="18" color="#059669" />
          Billing
        </li>
        <li>
          <Settings :size="18" color="#059669" />
          Settings
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background: #f8f9fa;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
  border-right: 1px solid #ddd;
  position: fixed;
  top: 0;
  left: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 30px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  margin-bottom: 5px;
  border-radius: 6px;
  cursor: pointer;
}

nav li:hover {
  background: #e2e6ea;
}

nav li.active {
  background: #d1fae5;
  color: #059669;
  font-weight: 600;
}

.icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
</style>
