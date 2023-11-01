<script setup>
import { ref } from 'vue'
import rooms from '../map/TheMynock.yml'

console.log("GameView.vue Script Setup");

const room = ref(rooms.cockpit);

function goTo(roomName) {
  console.log("going to room:", roomName);
  if (rooms[roomName]) {
    room.value = rooms[roomName];
  } else {
    console.error("Room not found:", roomName);
  }
}
</script>

<template>
  <div class="datapad-wrapper">
    <div class="datapad">
      <div class="display panel">
        <section class="room-description">{{ room.description }}</section>
        <section class="room-detail">{{ room.detail }}</section>
      </div>
      <div class="button-row">
        <button>&lt;&gt;</button>
        <button>{&nbsp;}</button>
        <button>inv</button>
      </div>
      <div class="commands panel">
        <ul>
          <li
            v-for="exit in room.exits"
            :key="exit.room"
            @click="goTo(exit.room)"
          >
            {{ exit.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.datapad-wrapper {
  background: var(--color-datapad);
  margin: 1em auto;
  padding: 0;

  height: 100%;
  /* 9:16 ratio */
  /* width: 24em;
  height: 48em; */
}

.datapad {
  height: 100%;
  padding: 0.5em;
  background: var(--color-datapad);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5em;
}
.panel {
  border: 2px solid var(--color-primary);
  background: var(--color-background);
  padding: 1em;
  width: 100%;
}

.panel--plain {
  padding: 1em;
  width: 100%;
}

/* Display */

.display {
  height: 50%;
}

.room-description {
  padding-bottom: 0.5em;
}

/* Commands */

.commands {
  height: 25%;
  padding: .5em;
  flex: 1;
}
.commands ul {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0.5em;
}
.commands ul li {
  display: block;
  border: 1px solid var(--color-primary);
  padding: 0.5em;
}

.button-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.5em;
}

button {
  border: 2px solid #111;
  background: #333;
  color: var(--color-primary);
  padding: 1em;
  font-size: var(--font-size);
  font-weight: bold;
}
button:hover {
  border-color: var(--color-emphasis);
  color: var(--color-emphasis);
}
button:active {
  background: var(--color-primary);
  color: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
