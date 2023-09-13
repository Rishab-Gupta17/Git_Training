import HomeComp from './components/HomeComp.vue';
import SignUp from './components/SignUp.vue';
import LoginComp from './components/LoginComp.vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import UpdateComp from './components/UpdateComp.vue';
import ProfileComp from './components/ProfileComp.vue';
import TaskStat from './components/TaskStat.vue';
import ShareTasks from './components/ShareTasks.vue';



import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'HomeComp',
        component: HomeComp,
        path: '/'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up'
    },
    {
        name: 'LoginComp',
        component: LoginComp,
        path: '/login'
    },
    {
        name: 'TaskForm',
        component: TaskForm,
        path: '/taskForm'
    },
    {
        name: 'TaskList',
        component: TaskList,
        path: '/taskList'
    },


    {
        name: 'UpdateComp',
        component: UpdateComp,
        path: '/update/:id',
        props: true
    },
    {
        name: 'ProfileComp',
        component: ProfileComp,
        path: '/profile'
    },
    {
        name: 'TaskStat',
        component: TaskStat,
        path: '/taskStat'
    },

    {
        name: 'ShareTasks',
        component: ShareTasks,
        path: '/shareTasks'
    },
   
   



]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router