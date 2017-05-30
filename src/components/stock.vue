<template lang="html">
<section class="hero is-light is-fullheight">
  <div class="container">
  <br>
  <div class="columns" v-for="u in stock">
  <div class="column is-5">
    <div class="card box" >
      <div class="columns">
        <div class="column is-8">

        </div>
        <div class="column is-2">
          <span class="tag is-primary is-medium">view :  {{ u.view }}</span>
        </div>
        <div class="column is-2">
          <span class="tag is-danger is-small" >
            ลบ
            <button class="delete" @click="removePrice(u)"></button>
          </span>
        </div>
      </div>
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="u.priceImg" alt="Image" @click="showPrice(u)">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="u.photoURL" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-6" style="color: #000;">{{ u.displayName }}</p>
            <p class="subtitle is-4" style="color: #000;">{{ u.priceName }}</p>
          </div>
        </div>

      <div class="content">
        {{ u.priceDetail }}<br>
        <a>#{{ u.priceTag}}</a> สถานะ : {{ u.status }}
        <br>
        <small>11:09 PM - 1 Jan 2016</small>
        <span class="select is-small">
          <select v-model="newstatus">
          <option value="selling">กำลังขาย</option>
          <option value="sold out">ขายเเล้ว</option>
        </select>
      </span>
      <button @click="update(u, newstatus)" class="button is-small is-success is-outlined"> update </button>

      </div>
    </div>
  </div>

  </div>
</div>
  </div>
</section>
</template>

<script>
/* global swal */
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'stock',
      'mode'
    ])
  },
  data () {
    return {
      newstatus: ''
    }
  },
  methods: {
    ...mapActions([
      'updateStatus',
      'remove',
      'getUser',
      'getStock',
      'showPrice'
    ]),
    update (u, newstatus) {
      u.status = newstatus
      this.$store.dispatch('updateStatus', u)
    },
    showPrice (u) {
      this.$store.dispatch('showPrice', u)
      this.$router.push({path: '/showPrice'})
      this.$store.dispatch('updateview', u)
    },
    removePrice (u) {
      var vm = this
      swal({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        vm.$store.dispatch('remove', u)
        vm.$store.dispatch('getUser')
      })
      // this.$store.dispatch('remove', u)
      // this.$store.dispatch('getUser')
      // this.$store.dispatch('getStock')
    }
  },
  mounted () {
    if (this.mode === true) {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style lang="css">
</style>
