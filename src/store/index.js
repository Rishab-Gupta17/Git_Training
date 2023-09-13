import { createStore } from 'vuex';

export default createStore(
  {
    state:
    {
      tasks: [],
      completedTasks: 0, 
      pendingTasks: 0,  
    },

    mutations:
    {
      setTasks(state, tasks) {
        state.tasks = tasks;
      },

      addTask(state, task) {
        state.tasks.push(task);
        state.pendingTasks++;
        if (task.completed) {
          state.completedTasks++; // If the task is completed, update completedTasks count
        }
      },

      // updateTaskCompletion(state, updatedTask) {
      //   const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id);
      //   if (taskIndex !== -1) {
      //     state.tasks[taskIndex].completed = updatedTask.completed;
      //   }
      // },

      // updateTaskCompletion(state, updatedTask) {
      //   const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id);
      //   if (taskIndex !== -1) {
      //     state.tasks[taskIndex].completed = updatedTask.completed;
      //   }
      // },

      markTaskAsCompleted(state, taskId) {
        const task = state.tasks.find(t => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
         
        }
      },

      // state.completedTasks++;
      // state.pendingTasks--;

      updateTaskStatistics(state) {
        state.completedTasks = state.tasks.filter(task => task.completed).length;
        console.log(this.state.completedTasks);
        state.pendingTasks = state.tasks.filter(task => !task.completed).length;
       
      },
      


      // updateTaskCompletion(state, updatedTask) {
      //   state.tasks = state.tasks.map(task =>
      //     task.id === updatedTask.id ? { ...task, completed: updatedTask.completed } : task
      //   );
      //   localStorage.setItem('tasks', JSON.stringify(state.tasks));
      // },

      /*
      updateTasks(state, tasks) {
        state.tasks = tasks;
        localStorage.setItem('tasks', JSON.stringify(tasks));
      },*/

      updateTask(state, updatedTask) {
        state.tasks = state.tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
      },

      deleteTask(state, taskId) {
        state.tasks = state.tasks.filter(task => task.id !== taskId);
      },
    },


    actions: {

      fetchTasks({ commit }) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
          commit('setTasks', storedTasks);
        } else {
          fetch('http://localhost:5000/tasks')
            .then(response => response.json())
            .then(tasks => {
              commit('setTasks', tasks);
              localStorage.setItem('tasks', JSON.stringify(tasks));
            });
        }
      },

      addTask({ commit, state }, task) {
        console.log('addTask action called');
    
        // Convert tasks array to a Set for easier uniqueness checking
        const taskSet = new Set(state.tasks.map(t => JSON.stringify(t)));
    
        // Check if the task already exists
        if (taskSet.has(JSON.stringify(task))) {
            return; // Task already exists, do nothing
        }
    
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        })
        .then(response => response.json())
        .then(newTask => {
            commit('addTask', newTask);
    
            // Add the new task to the Set
            taskSet.add(JSON.stringify(newTask));
    
            // Convert it back to an array and update local storage
            const updatedTasks = Array.from(taskSet).map(t => JSON.parse(t));
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        });
    },

   
    

      // updateTaskCompletion({ commit }, updatedTask) {
      //   commit('updateTaskCompletion', updatedTask);
      // },

      editTask({ commit, state }, updatedTask) {
        // Make an API request to update the task in the JSON-server
        fetch(`http://localhost:5000/tasks/${updatedTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask),
        })
        .then(response => response.json())
        .then(updatedTask => {
          // Commit the mutation to update the state
          commit('updateTask', updatedTask);
      
          // Update local storage for persistence
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        });
      },



      deleteTask({ commit, state }, taskId) {
        // Make an API request to delete the task in the JSON-server
        fetch(`http://localhost:5000/tasks/${taskId}`, {
          method: 'DELETE',
        })
        .then(() => {
          // Commit the mutation to update the state
          commit('deleteTask', taskId);
      
          // Update local storage for persistence
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        });
      },


      // updateTaskCompletion({ commit }, task) {
      //   // Assuming you have an API endpoint to update tasks on the server
      //   fetch(`http://localhost:5000/tasks/${task.id}`, {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(task)
      //   })
      //   .then(response => response.json())
      //   .then(updatedTask => {
      //     commit('updateTaskCompletion', updatedTask);
      //   })
      //   .catch(error => {
      //     console.error('Error updating task on server:', error);
      //   });
      // }

      

      
    
     
      
    
    },

    getters: {
      tasks: state => state.tasks,
      CompletedTasks: state => state.completedTasks,
      PendingTasks: state => state.pendingTasks,

      // totalTasks(state) {
      //   return state.tasks.length;
      // },

      // pendingTasks(state) {
      //   console.log(state.tasks,"state.tasks")
      //   return state.tasks.filter(task => !task.completed).length;
      // },

      // completedTasks(state) {
      //   return state.tasks.filter(task => task.completed).length;
      // },


      
    },

  });

  // completedTasks(state){
  //   console.log(state.tasks,"state.tasks")
  //   return Object.values(state.tasks).filter(task => task.completed).length;
  // }