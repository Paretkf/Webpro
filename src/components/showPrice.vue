<template lang="html">
  <section class="hero is-light is-fullheight">
  <div class="container">
        <div class="hero-body">
          <div class="container has-text-centered">

             <div class="columns">
               <div class="column is-6 is-offset-3">

              <div class="card box" >
                <div class="columns">
                  <div class="column is-8">

                  </div>
                  <div class="column is-2">
                    <span class="tag is-primary is-large">view :  {{ showPrice.view }}</span>
                  </div>
                  <div class="column is-2">
                    <span class="tag is-danger is-small" v-show="admin === true">
                      ลบ
                      <button class="delete" @click="remove(showPrice)" v-show="admin === true"></button>
                    </span>
                  </div>
                </div>
                <div class="card-image">
                  <figure class="image is-4by3">
                    <!-- <router-link to="/showPrice"><img :src="u.priceImg" alt="Image"></router-link> -->
                    <img :src="showPrice.priceImg" alt="Image">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                          <img :src="showPrice.photoURL" alt="Image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-6" style="color: #000;">{{ showPrice.displayName }}</p>
                      <p class="subtitle is-4" style="color: #000;">{{ showPrice.priceName }} ราคา : {{ showPrice.priceCost }}
                      <span class="tag is-danger is-large" v-if="showPrice.status === 'sold out'">  {{ showPrice.status }} </span>
                      <span class="tag is-success is-large" v-if="showPrice.status === 'selling'">  {{ showPrice.status }} </span>
                    </p>
                    </div>
                  </div>

                <div class="content">
                  {{ showPrice.priceDetail }}<br>
                  <a>#{{showPrice.priceTag}}</a>

                  <small>{{showPrice.date}}</small>
                  </div>

                  <br>
                  <div class="box"><div class="columns">
                    <div class="column is-9"><input type="text" v-model="text" class = "input is-small" v-show="mode === false"></div>
                    <div class="column is-3"><button type="button" name="button" @click="post(text)" class="button is-primary is-outlined is-small" style="width : 100%"v-show="mode === false">post</button></div>
                  </div>
                    <hr>
                    <br><div class="columns" v-for="u in showPrice.comments">
                        <div class="box"><img :src="u.photoURL" alt="" class="image  is-32x32">{{ u.displayName}}</div>
                        <span class="tag is-success is-medium">{{ u.message }} </span>
                    </div>
                  </div>
                </div>
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
      'showPrice',
      'uid',
      'photoURL',
      'displayName',
      'admin',
      'mode'
    ])
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    post (text) {
      if (this.text === '') {

      } else {
        this.showPrice.comments.push({
          displayName: this.displayName,
          message: text,
          uid: this.uid,
          photoURL: this.photoURL
        })
        this.$store.dispatch('updateComment', this.showPrice)
      }
    },
    ...mapActions([
      'updateComment',
      'getUser'
    ]),
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
        vm.$router.push({path: '/'})
      })
    },
    mounted () {
      console.log('refresh')
    }
  }
}
</script>

<style lang="css">
</style>
