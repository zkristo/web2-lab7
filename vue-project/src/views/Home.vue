<script setup>
import { ref } from "vue";

import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";
import { useAddTaskStore } from "../stores/showTask";

const storeAddTask = useAddTaskStore();

//data
const tasks = ref([]);

//methods
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id);
  const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(updTask),
  });

  const data = await res.json();

  tasks.value = tasks.value.map((task) =>
    task.id === id ? { ...task, reminder: data.reminder } : task
  );
};

const deleteTask = async (id) => {
  if (confirm("Are you sure?")) {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    res.status === 200
      ? (tasks.value = tasks.value.filter((task) => task.id !== id))
      : alert("Error deleting task");
  }
};

const addTask = async (task) => {
  const res = await fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const data = await res.json();

  tasks.value = [...tasks.value, data];

  storeAddTask.hideTask();
};

const fetchTasks = async () => {
  const res = await fetch("http://localhost:5000/tasks");
  const data = await res.json();
  return data;
};

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = await res.json();
  return data;
};

//lifecycle hooks
tasks.value = await fetchTasks();
</script>

<template>
  <AddTask v-show="storeAddTask.isShown" @add-task="addTask" />
  <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</template>