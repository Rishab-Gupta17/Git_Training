<template>
    <div class="divclass">
        <h1 style="margin-top: 50px; margin-bottom: 20px;">Add Task</h1>
       

        <form class="addclass" @submit.prevent="submitForm">

            <!-- Title: -->
            <input v-model="title" required name="name" placeholder="Title" />

            <br>
            <!-- Description: -->
            <textarea class="text" v-model="description" required placeholder="Description"></textarea><br>

            <!-- Due Date: -->
            <input type="date" v-model="dueDate"  required placeholder="Select Date"  min="2023-09-13" max="2030-12-31"><br>

            <!-- Priority: -->
            <select class="text" v-model="priority" required placeholder="Select Priority">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <br>
            <button class="button2" type="submit">Add</button>
        </form>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';

export default {
    name: 'TaskForm',
    data() {
        return {
            title: '',
            description: '',
            dueDate: '',
            priority: 'Low',
            taskId: null,
        };

    },
   
    computed: {
       
       
            },
    
    methods: {
        ...mapActions(['addTask']),
        submitForm() {

            const task = {
                title: this.title,
                description: this.description,
                dueDate: this.dueDate,
                priority: this.priority,
                
            };
            // this.addTask(task);
            this.$store.dispatch('addTask', task);
            Swal.fire({
                title: 'Success!',
                text: 'Task added successfully!',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            this.resetForm();
            

            this.$router.push({ name: 'HomeComp' });
        },
        resetForm() {
            this.title = '';
            this.description = '';
            this.dueDate = '';
            this.priority = 'Low';
        },

    
    },
    created() {
    this.$store.dispatch('fetchTasks'); 
  },
};
</script>   
  
<style>
.addclass input,
textarea,
select {

    height: 40px;
    padding-left: 10px;
    display: block;
    margin-left: auto;
    border: 1px solid green;
    border-radius: 10px;
    margin: 0 auto;
    width: 250px;
    text-align: center;
    padding-top: 10px;
    padding-right: 5px;
}



.button2 {
    width: 100px;
    height: 40px;
    border: 1px solid green;
    background: green;
    color: #fff;
    cursor: pointer;
    border-radius: 35px;
}


.text {
    display: block;
    margin-left: auto;
    margin-right: auto;

}
</style>
  