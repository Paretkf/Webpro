<template lang="html">
  <div class="">
    <section class="hero is-info is-fullheight">
        <div class="hero-body">
          <div class="container has-text-centered">
             <div class="columns">
               <div class="column is-6 is-offset-3">

              <div class="card box" v-for="u in user">
                <button @click="remove(u)" v-show="admin === true">x</button>
                <div class="card-image">
                view :  {{ u.view }}
                  <figure class="image is-4by3">
                    <!-- <router-link to="/showPrice"><img :src="u.priceImg" alt="Image"></router-link> -->
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
                      <p class="title is-4" style="color: #000;">{{ u.displayName }}</p>
                      <p class="subtitle is-6" style="color: #000;">{{ u.priceName }}</p>
                    </div>
                  </div>

                <div class="content">
                  {{ u.priceDetail }}<br>
                  <a>#{{u.priceTag}}</a>

                  <small>11:09 PM - 1 Jan 2016</small>
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
export default {
}
</script>

<style lang="css">
</style>
