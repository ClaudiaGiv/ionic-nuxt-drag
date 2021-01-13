<template>
  <ion-page>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-list v-dragula="tasks1" service="effects">
            <div v-for="text of tasks1" :key="text">
              <ion-item>
                <ion-label>
                  {{ text }}
                </ion-label>
              </ion-item>
            </div>
          </ion-list>
        </ion-col>
        <ion-col>
          <ion-list v-dragula="tasks2" service="effects">
            <ion-item v-for="text of tasks2" :key="text">
              <ion-label>
                {{ text }}
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-col>
        <!--<ion-col
          v-for="(column, $columnIndex) of board.columns"
          :key="$columnIndex"
        >
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ column.name }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-list
                :id="$columnIndex"
                v-dragula="column.tasks"
                class="container"
                drake="first-drake1"
              >
                <ion-item
                  v-for="(task, $taskIndex) of column.tasks"
                  :id="$taskIndex"
                  :key="$taskIndex"
                  class="drag-el"
                >
                  {{ task.name }}
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </ion-col>-->
      </ion-row>
    </ion-grid>

    <ion-card>
      <ion-button>Heii</ion-button>
      <ion-button @click="$router.push('/')"> Back to index</ion-button>
    </ion-card>
  </ion-page>
</template>

<script>
import defaultBoard from '../utils/default-board.js'

export default {
  data() {
    return {
      board: defaultBoard,
      tasks1: ['work', 'coffee', 'shop'],
      tasks2: ['read', 'watch', 'walk'],
    }
  },
  created() {
    if (process.browser) {
      console.log('GLOBAL SERVICE: created')
      console.log(this.$dragula)
      // console.log(this.$Vue2Dragula)
      const service = this.$dragula.createService({
        name: 'effects',
        drake: {
          copy: false,
          direction: 'horizontal',
        },
      })

      const log = console.log

      // TODO: Use classlist: https://developer.mozilla.org/en/docs/Web/API/Element/classList
      // See all events here: https://github.com/bevacqua/dragula#drakeon-events
      //
      service.on({
        'effects:removeModel': ({ name, el, source, dragIndex, model }) => {
          log(
            'HANDLE effects:removeModel: ',
            name,
            el,
            source,
            dragIndex,
            model
          )
          el.classList.remove('ex-moved')
        },
        'effects:dropModel': ({
          name,
          el,
          source,
          target,
          dropIndex,
          model,
        }) => {
          log(
            'HANDLE effects:dropModel: ',
            el,
            source,
            target,
            dropIndex,
            model
          )
          el.classList.add('ex-moved')
        },
        accepts: ({ el, target }) => {
          log('accepts: ', el, target)
          return true // target !== document.getElementById(left)
        },
        drag: ({ el, source, target, container }) => {
          log('HANDLE drag: ', 'el:', el, 'c:', container)
          log('classList', el.classList)
          el.classList.remove('ex-moved')
        },
        drop: (opts) => {
          const { el, container, model } = opts
          log('HANDLE drop: ', el, container, model, opts)
          log('classList', el.classList)
          el.classList.add('ex-moved')
          log('new classList', el.classList)
        },
        over: ({ el, container }) => {
          log('over: ', el, container)
          log('classList', el.classList)
          el.classList.add('ex-over')
        },
        out: ({ el, container }) => {
          log('out: ', el, container)
          log('classList', el.classList)
          el.classList.remove('ex-over')
        },
      })
      console.log('DRAG EFFECTS: ready')
    }
  },
  methods: {
    doReorder(event) {
      // The `from` and `to` properties contain the index of the item
      // when the drag started and ended, respectively
      console.log(
        'Dragged from index',
        event.detail.from,
        'to',
        event.detail.to
      )

      // Finish the reorder and position the item in the DOM based on
      // where the gesture ended. This method can also be called directly
      // by the reorder group
      event.detail.complete()
    },
    pickupTask(e, taskIndex, fromColumnIndex) {
      console.log('pick up task')
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
    },
    moveTask(e, toTasks) {
      console.log('pick up task')

      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const taskIndex = e.dataTransfer.getData('task-index')
      const taskToMove = fromTasks.splice(taskIndex, 1)[0]
      toTasks.push(taskToMove)
    },
  },
}
</script>

<style scoped>
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.ex-moved {
  animation: fadeIn 2s ease-in 1 forwards;
  border: 2px solid yellow;
  padding: 2px;
}

.ex-over {
  animation: fadeIn 0.5s ease-in 1 forwards;
  border: 4px solid green;
  padding: 2px;
}
</style>
