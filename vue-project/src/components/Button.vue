<script setup>
import { useAddTaskStore } from "@/stores/showTask";
const storeAddTask = useAddTaskStore();

const props = defineProps({
	text: String,
	color: String,
});

const toggleTask = () => {
	storeAddTask.toggleTask();
};
</script>


<template>
	<button @:click="toggleTask" :style="{ background: props.color }" class="btn"> {{ props.text }} </button>
</template>