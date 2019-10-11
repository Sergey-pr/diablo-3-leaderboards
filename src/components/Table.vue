<template>
  <div class="overflow-auto">
    <h1>{{ items.title.ru_RU }}</h1>
    <h2 v-if="items.season">Сезон: {{ items.season }} </h2>
    <h2 v-if="items.era">Эра: {{ items.era }}</h2>
    <b-table
      id="table-component"
      striped
      hover
      :items="items.row"
      :fields="items.column"
      :per-page="perPage"
      :current-page="currentPage"
    ></b-table>
    <b-pagination
      v-model="currentPage"
      size="sm"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="table-component"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    items: Object
  },
  data() {
    return {
      currentPage: 1,
      perPage: 20,
      rows: 0
    }
  },
  created() {
    this.rows = this.items.row.length
    console.log(this.items)
  },
  computed: {
  }
}
</script>
