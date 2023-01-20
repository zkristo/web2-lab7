<script setup>
import Button from "./Button.vue";

import { computed } from "vue";
import { useRoute } from "vue-router";

import { useAddTaskStore } from "../stores/showTask";
const storeAddTask = useAddTaskStore();

const props = defineProps({
	title: String,
});

const route = useRoute();
const homePage = computed(() => {
	return route.path === "/" ? true : false;
});

const redOrGreen = computed(() => {
	return storeAddTask.isShown ? "red" : "green";
});

const closeOrAdd = computed(() => {
	return storeAddTask.isShown ? "Close" : "Add Task";
});
</script>


<template>
	<header>
		<h1>{{ props.title }}</h1>
		<Button v-show="homePage" :text="closeOrAdd" :color="redOrGreen" />
	</header>
</template>


<style scoped>
header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}
</style>