<template>
    <div class="divclass">
        <h1 style="margin-top: 50px; margin-bottom: 30px;">Update Task</h1>
       
    
        <form v-if="isUpdateFormVisible" class="addclass" @submit.prevent="submitUpdateForm">

        
            <input v-model="updatedTask.title" required name="name" placeholder="Title" />

            <br>
           
            <textarea class="text" v-model="updatedTask.description" required placeholder="Description"></textarea><br>

      
            <input type="date" v-model="updatedTask.dueDate" required placeholder="Select Date" min="2023-09-13" max="2030-12-31"/><br>

        
            <select class="text" v-model="updatedTask.priority" required placeholder="Select Priority">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <br>
            <button class="button2" type="submit">Update</button>
        </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
    export default {
        name : 'UpdateComp',
        props: ['id'],
       
    
    data() {
        return {
            isUpdateFormVisible: true,

            updatedTask:{
                 title: '',
                description: '',
                dueDate: '',
                priority: '',
                taskId: null
            }
        };

    },
    created() {
    const taskData = this.$route.params.taskData;
    if (taskData) {
      this.updatedTask = { ...taskData }; // Copy the task data to updatedTask
    }
  },

   async mounted() {
        console.log('Received ID:', this.id);
        this.fetchTaskData(this.id);
  

       
        console.log('Received Task:', this.updatedTask);
  },

methods: {
    async fetchTaskData(id) {
        try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`);
      const taskData = await response.json();
      this.updatedTask = taskData;
    }catch (error) {
      console.error('Error fetching task data:', error);
    }
    },
   
  submitUpdateForm() {
    this.$store.dispatch('editTask', this.updatedTask);
    this.$router.push({ name: 'HomeComp' });
    Swal.fire({
                title: 'Update!',
                text: 'Task updated successfully!',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
    this.closeUpdateForm();
  },
  closeUpdateForm() {
    this.isUpdateFormVisible = false;
    this.updatedTask = null;
  },




  // submitUpdateForm() {
  //   this.$store.dispatch('updateTask', this.selectedTask);
  //   this.$router.push({ name: 'HomeComp' });
  //   Swal.fire({
  //               title: 'Update!',
  //               text: 'Task updated successfully!',
  //               icon: 'success',
  //               confirmButtonText: 'Ok'
  //           });
  //   this.closeUpdateForm();
  // },
  // closeUpdateForm() {
  //   this.isUpdateFormVisible = false;
  //   this.selectedTask = null;
  // } 





}
    
};
</script>

<style>

.divclass{
  margin-top: 7%
}

</style>