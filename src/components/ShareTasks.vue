<template>
    <div class="share-tasks" style="margin-top: 5%;">
        <h2>Share Tasks</h2>

        <!-- Task selection -->
        <div>
            <br><br>
            <label for="task">
                <h4>Select a task:</h4>
            </label>
            <select style="margin: auto;" v-model="selectedTask" @change="loadTasks()">
                <option v-for="task in tasks" :key="task.id" :value="task.id">{{ task.title }}</option>
            </select>
        </div>

        <br><br>

        <!-- User selection -->
        <div>
            <label for="users">
                <h4>Select users to share with:</h4>
            </label>
            <select style="margin: auto;" v-model="selectedUsers"  @change="loadUsers">
                <option v-for="user in urs" :key="user.id" :value="user.id">{{ urs.name }}</option>
            </select>
        </div>

        <br><br>
        <!-- Share button -->
        <button class="shareT" @click="shareTask">Share Task</button>
    </div>
</template>
  
<script>
import axios from 'axios'
import Swal from 'sweetalert2';
import { mapState } from 'vuex';
// import { mapActions } from 'vuex'

export default {
    data() {
        return {
            tasks: [],           
            urs: [],           
            selectedTask: null,  
            selectedUsers: []    
        };
    },
    methods: {
        loadTasks() {
            axios.get('http://localhost:5000/tasks')
                .then(response => {
                   
                    this.tasks = response.data;
                })
                .catch(error => {
                    console.error('Error fetching tasks:', error);
                });
        },


        loadUsers() {
            axios.get('http://localhost:5000/urs')
                .then(response => {
                   
                    this.users = response.data;
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        },


        shareTask() {
            if (!this.selectedTask || this.selectedUsers.length === 0) {

                Swal.fire({
                    title: 'Warning',
                    text: 'Please select a task and at least one user to share with.!',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                });
                return;
            }

       
            this.selectedTask = null;
            this.selectedUsers = [];
            Swal.fire({
                title: 'Success',
                text: 'Tasks shared Successfully!',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        }
    },

    computed: {
    ...mapState(['tasks', 'urs'])
        },


    created() {
        
        this.loadTasks();
        this.loadUsers();
    }
};
</script>
  
<style>
.shareT {
    width: 100px;
    height: 40px;
    border: 1px solid green;
    background: green;
    color: #fff;
    cursor: pointer;
    border-radius: 35px;
}
</style>
  