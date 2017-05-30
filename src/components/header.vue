<template lang="html">

    <header class="nav">
      <div class="container">
        <div class="nav-left nav-menu">
          <a @click="tag('')" class="nav-item"><router-link to="/" >  หน้าเเรก </router-link></a>
          <br>
          <span class="select">
            <select v-model="tagPrice" style="width : 100%"  @click="tag(tagPrice)">
            <option value="" >ทั้งหมด</option>
            <option value="CPU" >CPU</option>
            <option value="Graphic Gard" >Graphic Gard</option>
            <option value="RAM">RAM</option>
            <option value="CASE">CASE</option>
            <option value="HDD" >HDD</option>
            <option value="SSD" >SSD</option>
            <option value="Main Board">Main Board</option>
            <option value="PSU" >PSU</option>
          </select>
        </span>

          </select>
        </div>
        <div class="nav-right nav-menu">
          <a class="nav-item" v-show="mode === true" @click="login()">login</a>
          <router-link to="/" class="nav-item" v-show="mode === false">
            <a class="nav-item" v-show="mode === false" @click="logout()">
          <img :src="photoURL"> &nbsp; {{ displayName }}
          </a>
          </router-link>
          <router-link to="/sell" class="nav-item" v-show="mode === false"> ลงขายสินค้า </router-link>
          <router-link to="/stock" class="nav-item" v-show="mode === false"> <a  @click="getUser()">สินค้าที่ลงขาย </a></router-link>
        </div>
      </div>
    </header>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      tagPrice: ''
    }
  },
  methods: {// mapActions
    ...mapActions([
      'login',
      'logout',
      'getStock',
      'tag',
      'getUser'
    ])
  },
  computed: {
    ...mapGetters([
      'mode',
      'photoURL',
      'displayName',
      'uid'
    ])
  }
}
</script>

<style lang="css">
</style>
