<template>
    <div>
    <h2>Task Statistics</h2>
    <p>Total tasks completed: {{ $store.state.completedTasks }}</p>
    <p>Total tasks pending: {{ $store.state.pendingTasks }}</p>
  </div>
</template>

<script>
    export default {
        name : 'TaskStat',
        props: {
    totalCompleted: {
      type: Number,
      required: true
    },
    totalPending: {
      type: Number,
      required: true
    }
  }
    }
</script>

<style scoped>

</style>