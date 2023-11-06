<script setup>
import { ref } from 'vue'
import rooms from '../map/1-TheMynock.yml'
import GameState from '../lib/GameState'

console.log('GameView.vue Script Setup')

const room = ref(rooms.cockpit)
const moment = ref(undefined)
const gameState = ref(
  new GameState({
    Tamlin: { is: 'unsafe' },
    Tryst: { is: 'lost' },
    Leenik: { is: 'frantic' },
    Bacta: { has: [] },
  })
)

const showGameState = ref(false)
function toggleGameState() {
  showGameState.value = !showGameState.value
}

function goTo(roomName) {
  console.log('going to room:', roomName)
  if (rooms[roomName]) {
    room.value = rooms[roomName]
  } else {
    console.error('Room not found:', roomName)
  }
}

function startMoment(momentName) {
  console.log('triggering moment:', momentName)
  moment.value = room.value.moments[momentName]
}

function resolveEffect(effect) {
  console.log('resolving effect:', effect)
  gameState.value.set(...effect)
  moment.value = undefined
}

/**
 * Filter an array of objects that have a `condition` property. Checking the
 * conditions in the game state.
 * @param {} items
 */
function conditional(items) {
  return items?.filter((item) => {
    console.log('checking condition:', item.condition)
    if (!item.condition) return true
    console.log('got value', gameState.value.check(...item.condition))
    return gameState.value.check(...item.condition)
  })
}
</script>

<template>
  <div class="datapad-wrapper">
    <div class="datapad">
      <div class="display panel">
        <template v-if="showGameState">
          <section class="display-description">Game State</section>
          <section class="display-detail">
            <pre>{{ gameState }}</pre>
          </section>
        </template>

        <template v-else-if="moment">
          <section class="display-description">{{ moment.description }}</section>
          <section class="display-detail" v-html="moment.detail"></section>
        </template>

        <template v-else>
          <section class="display-description">
            {{ room.description }}
          </section>
          <section class="display-detail">{{ room.detail }}</section>
        </template>
      </div>
      <div class="button-row">
        <button>&lt;&gt;</button>
        <button
          :class="{ active: showGameState }"
          @click="toggleGameState"
        >
          {&nbsp;}
        </button>
        <button>inv</button>
      </div>
      <div class="commands panel">
        <ul v-if="showGameState">
          <li @click="toggleGameState">Back</li>
        </ul>

        <ul v-else-if="moment">
          <li
            v-for="command in conditional(moment.commands)"
            :key="command.text"
            @click="resolveEffect(command.effect)"
          >
            {{ command.text }}
          </li>
        </ul>

        <ul v-else>
          <li
            v-for="command in conditional(room.commands)"
            :key="command.text"
            @click="startMoment(command.moment)"
          >
            {{ command.text }}
          </li>
          <li v-for="exit in room.exits" :key="exit.room" @click="goTo(exit.room)">
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

.display-panel {
  overflow: scroll;
}

.display-description {
  padding-bottom: 0.5em;
}

/* Commands */

.commands {
  height: 25%;
  padding: 0.5em;
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
  cursor: pointer;
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
button:active, button.active {
  background: #222;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
