<script setup>
// export default {
//   name: "Task",
//   props: {
//     task: Object,
//   },
// }

// const name = "Task";

const props = defineProps({
  task: Object,
});

const emits = defineEmits(["delete-task", "toggle-reminder"]);

const onDblClick = () => {
  emits("toggle-reminder", props.task.id);
};

const onClick = () => {
  emits("delete-task", props.task.id);
};

</script>

<template>
  <div @dblclick="onDblClick" :class="[task.reminder ? 'reminder' : '', 'task']">
    <h3> {{ props.task.text }}
      <i @click="onClick" class="fas fa-times"></i>
    </h3>
    <p> {{ props.task.day }} </p>
  </div>
</template>

<style scope>
.fas {
  color: red;
}

.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.task.reminder {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>