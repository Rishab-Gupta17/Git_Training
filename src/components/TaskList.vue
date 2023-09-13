<template>
  <div>

    <label>

      <div>
    <h1>Task List</h1>
    <ul>
      <div v-for="task in tasks" :key="task.id">
        {{ task.title }} - {{ task.completed ? 'Completed' : 'Pending' }}
        <input type="checkbox" style="background-color: green;margin-top: 4px; border-radius: 15px; border-color: black; color: aliceblue;" @click="markTaskAsCompleted(task.id)">
      </div>
  
    </ul>

    </div>
      <!-- <div class="div" style="margin-top: 18px;">
        <h3>Total Tasks: <span class="badge bg-secondary" style="color: lightgreen;">{{ totalTasks }}</span></h3>
        <h3>Completed Tasks: <span class="badge bg-secondary" style="color: lightgreen;">{{ completedTasks }}</span></h3>
        <h3>Pending Tasks: <span class="badge bg-secondary" style="color: rgb(243 37 37 / 90%);">{{ pendingTasks }}</span></h3>
      </div> -->
        <!-- <br>
       <h4 style="margin-left: 10px; color: black;"><strong> Tasks List </strong></h4>
            <ul >
            <input type="checkbox" v-model="tasks.completed" @change="updateTaskCompletion(tasks)" />
       Title: {{ tasks.title}} with ID: {{ tasks.id }} 
           </ul> -->

      <br>  
    </label>    
    
    <h4>  Priority</h4>
      <select  style="background-color: rgba(134, 183, 254, 0.51);border-color: black; padding-bottom: 12px;border-width: 2px;margin: auto;"
        v-model="selectedPriority" @change="filterTasksByPriority">
        <option value="All">All</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>   
    

      <br><br>
    <div v-if="filteredTasks.length === 0"> 
    
      No tasks available.
    </div>
    
    <div v-else>
      <div v-for="task in filteredTasks" :key="task.id" class="card " style="border-radius: 20px;border-color:  black;border-width: 2px; background-color: rgba(0, 0, 0, 0);background-color: #86b7fe82;width:22%;margin: auto;margin-top: 12px;">
       
        <div  class="card-header" style="background-color: rgba(164, 50, 170, 0);">
          <strong>Title:</strong> <b>{{ task.title }} </b> 
        </div>
        
        
          <ul class="list-group list-group-flush">
            <li class="list-group-item" style="background-color: rgba(240, 248, 255, 0);"><b>Description : </b>{{ task.description }} </li>
            <li class="list-group-item" style="background-color: rgba(240, 248, 255, 0);"><b>Due Date : </b>({{ task.dueDate }})</li>
            <li class="list-group-item" style="background-color: rgba(240, 248, 255, 0);"><b>Priority : </b>{{ task.priority }}</li>
            <li class="list-group-item" style="background-color: rgba(240, 248, 255, 0);">
            <i class="fa fa-eye" style="font-size:30px;color:green;margin-right: 18px;" @click="editTask(task)"></i>
            <i class="fa fa-trash" style="font-size:30px;color:red;margin-right: 18px;" @click="deleteTask(task.id)"></i>
            
          </li>
      </ul>
      </div>
    </div>

    

  </div>

 
</template>

<script>
import Swal from 'sweetalert2';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';


export default {
  name: 'TaskList',
  components: {

  },
  data() {
    return {

      
      selectedPriority: 'All',
      isUpdateFormVisible: false,

    };
  },
  created() {
    this.$store.dispatch('fetchTasks');
  },

  computed: {
    ...mapGetters(['Tasks']),
    tasks() {
      return this.$store.getters.tasks;
    },

  //     computed: {
  //   ...mapGetters(['getTasks']),
  //   tasks() {
  //     return this.getTasks;
  //   },
  // },        You can also go through the same things 
  // getters: {
  //   getTasks(state) {
  //     return state.tasks;
  //   },
  //   // Add other getters if needed
  // },

  // This comment line for getters in store.js fore reference and to use this getters in computed property.

  
    // ...mapGetters(['totalTasks', 'pendingTasks', 'completedTasks' ]),
    
  //'completedTasks'

    // logTotalTasks() {
    //   console.log(this.totalTasks);
    //   return this.totalTasks;
    // },
    // logPendingTasks() {
    //   console.log(this.pendingTasks);
    //   return this.pendingTasks;
    // },
    // logCompletedTasks() {
    //   console.log(this.completedTasks);
    //   return this.completedTasks;
    // },


    // totalTasks() {
    //   return this.tasks.length;
    // },
    // completedTasks() {
    //   return this.tasks.filter(task => task.completed).length;
    // },
    // pendingTasks() {
    //   return this.tasks.filter(task => !task.completed).length;
    // },


    filteredTasks() {
      if (this.selectedPriority === 'All') {
        console.log(this.tasks,"this.tasks ()");
        return this.tasks;
      } else {
        console.log(this.tasks,"this.tasks ()");
        return this.tasks.filter(task => task.priority === this.selectedPriority);
      }
    }
  },
  methods: {
    ...mapActions(['editTask', 'deleteTask']),

    

    deleteTask(taskId) {
      this.$store.dispatch('deleteTask', taskId);

      Swal.fire({
        title: 'Delete!',
        text: 'Task Deleted successfully!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      this.$router.push({ name: 'HomeComp' });
    },
    goToUpdatePage() {
      this.$router.push({ name: 'UpdateComp' });
    },

    editTask(tasks) {
      console.log('Edit task:', tasks);
      this.$router.push({ name: 'UpdateComp', params: { id: tasks.id, taskData: tasks } });
    },

    filterTasksByPriority() {

    },
    openUpdateForm(tasks) {
      console.log('Button clicked!');
      console.log('Selected Task:', tasks);
      this.updatedTask = tasks;
      console.log('Selected Task:', this.updatedTask);
      this.isUpdateFormVisible = true;

      this.$router.push({ name: 'UpdateComp', params: { id: tasks.id } });

    },
    closeUpdateForm() {
      this.isUpdateFormVisible = false;
      this.updatedTask = null;
    },

    markTaskAsCompleted(taskId) {
      this.$store.commit('markTaskAsCompleted', taskId);
  
      this.$store.commit('updateTaskStatistics');
    },
    // updateTaskCompletion(tasks) {
     
    //   const updatedTasks = this.tasks.map(t => (t.id === tasks.id ? tasks : t));
    //   localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    // },


    
    // updateTaskCompletion(task) {
      // Assuming you have a mutation to update the task completion status
      // this.$store.commit('updateTaskCompletion', task);

      // this.$store.dispatch('updateTaskCompletion', task);

      // this.$nextTick(() => {
      //   this.$forceUpdate(); // Force component to re-render
      // });
      
        
      // this.$store.dispatch('updateTaskCompletion', task);
    // },

  }
};
</script>

<!-- console.log(this.task)
      if(task){
        console.log(this.task)
        this.pendingTasks-1;
        this.completedTasks+1;
      } -->
  
<style>
.card {
  margin: auto;
  margin-top: 15px;
  width: 30%;
  padding: 10px;
  height: 300px;
  border-color: black;

}
</style>
  