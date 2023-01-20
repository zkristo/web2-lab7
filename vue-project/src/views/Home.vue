<script setup>
import { ref } from "vue";

import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";
import { useAddTaskStore } from "../stores/showTask";

const storeAddTask = useAddTaskStore();

//data

//methods
const toggleReminder = async (id) => {
  tasks.value = tasks.value.map((task) =>
    task.id === id ? { ...task, reminder: !task.reminder } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const deleteTask = async (id) => {
  if (confirm("Are you sure?")) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  }
};

const addTask = async (task) => {
  const id = Math.floor(Math.random() * 10000) + 1;
  const newTask = { id, ...task };
  tasks.value = [...tasks.value, newTask];
  localStorage.setItem("tasks", JSON.stringify(tasks.value));

  storeAddTask.toggleTask();
};


const getTasks = () => {
  if (localStorage.getItem("tasks") === null) {
    fetch("./db.json")
      .then((res) => res.json())
      .then((json) => localStorage.setItem("tasks", JSON.stringify(json.tasks)));
  }
  return JSON.parse(localStorage.getItem("tasks"));
};
const tasks = ref(getTasks());
setTimeout(() => {
  console.log(tasks.value);
}, 1000);
</script>

<template>
  <AddTask v-show="storeAddTask.isShown" @add-task="addTask" />
  <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</template>