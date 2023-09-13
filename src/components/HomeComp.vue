<template>
    <div>
        <HeaderComp />
        <h2 style="font-weight: bold;color: #ffdb71;margin-top:7%;font-family: 'bootstrap-icons';">Welcome to the Task Manager Application</h2>
        <TaskFilter />
        <br><br>
        <!-- <TaskStat/> -->
        <br><br>
        <TaskList />
        <br><br>
       
 
    </div>
</template>

<script>
import HeaderComp from './HeaderComp.vue';
import TaskFilter from './TaskFilter.vue';
import TaskList from './TaskList.vue';
// import TaskStat from './TaskStat.vue';




export default {
    name: 'HomeComp',
    components: {
        HeaderComp,
        TaskFilter,
        TaskList,
        // TaskStat,
      


    },
    data() {
        return {
            filterDate: null
        }
    },

    mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({ name: 'SignUp' })
        }
    },

    methods: {
       
    }
}
</script>

<style></style>