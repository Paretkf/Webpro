<template>
  <div>
    <section class="hero is-light is-fullheight">
        <div class="hero-body">
          <div class="container has-text-centered">

             <div class="columns">
               <div class="column is-6 is-offset-3">

              <div class="card box" v-for="u in list">
                <div class="columns">
                  <div class="column is-8">

                  </div>
                  <div class="column is-2">
                    <span class="tag is-primary is-large">view :  {{ u.view }}</span>
                  </div>
                  <div class="column is-2">
                    <span class="tag is-danger is-small" v-show="admin === true">
                      ลบ
                      <button class="delete" @click="remove(u)" v-show="admin === true"></button>
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
                      <p class="subtitle is-4" style="color: #000;">{{ u.priceName }} ราคา : {{ u.priceCost }}
                      <span class="tag is-danger is-large" v-if="u.status === 'sold out'">  {{ u.status }} </span>
                      <span class="tag is-success is-large" v-if="u.status === 'selling'">  {{ u.status }} </span>
                    </p>

                    </div>
                  </div>

                <div class="content">
                  {{ u.priceDetail }}<br>
                  <a @click="addtag(u.priceTag)">#{{u.priceTag}}</a>
                  <small> {{ timezone(u.date) }} </small>
                  </div>

                  <br>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* global swal */
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      text: ''
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'displayName',
      'uid',
      'photoURL',
      'admin',
      'tag'
    ]),
    list () {
      var vm = this
      return this.user.filter(i => {
        return i.priceTag.indexOf(vm.tag) > -1
      })
    }
  },
  methods: {
    post (photoURL, uid, displayName, text, id, firebaseID) {
      let data = {
        photoURL: photoURL,
        uid: uid,
        displayName: displayName,
        text: text,
        id: id,
        firebaseID: firebaseID
      }
      this.$store.dispatch('comments', data)
    },
    ...mapActions(['comments', 'getUser', 'showPrice', 'updateview', 'tag']),
    showPrice (u) {
      this.$store.dispatch('showPrice', u)
      this.$router.push({path: '/showPrice'})
      this.$store.dispatch('updateview', u)
    },
    remove (u) {
      var vm = this
      swal({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
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
        vm.tag = ''
      })
    },
    addtag (u) {
      this.$store.dispatch('tag', u)
    },
    timezone (time) {
      return moment(time).format('LLLL')
    }
  },
  mounted () {
    this.$store.dispatch('getUser')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
