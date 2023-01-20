<script setup>
import Task from "./Task.vue";
// export default {
// 	name: "Tasks",
// 	props: {
// 		tasks: Array,
// 	},
// 	components: {
// 		Task,
// 	},
// 	emits: ["delete-task", "toggle-reminder"],
// }

const name = "Tasks";

const props = defineProps({
	tasks: Array,
});


const toggleReminder = (id) => {
	emits("toggle-reminder", id);
};

const deleteTask = (id) => {
	emits("delete-task", id);
};

const emits = defineEmits(["delete-task", "toggle-reminder"]);


</script>

<template>
	<div>
		<div :key="task.id" v-for="task in props.tasks">
			<h3>
				<Task @toggle-reminder="toggleReminder" @delete-task="deleteTask" :task="task" />
			</h3>
		</div>
	</div>
</template>