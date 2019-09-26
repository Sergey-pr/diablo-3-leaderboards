<template>
  <div>
    <b-table
    id="table-component"
    striped
    hover
    :items="items.row"
    :fields="items.column"
    ></b-table>
    <b-pagination
      v-model="currentPage"
      aria-controls="table-component"
      size="sm"
      :total-rows="rows"
      :per-page="perPage"
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
      perPage: 20
    }
  },
  created() {
    console.log(this.items)
  },
  computed: {
    rows() {
      this.items.row.length
    }
  }
}
</script>
