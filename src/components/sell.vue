<template lang="html">
<body>
<section class="hero is-light is-fullheight">
  <div class="container" >
    <br>

      <div class="column is-6 is-offset-3 box">
        <div class="columns">
          <div class="column is-5 is-offset-4">
            <label class="title">ลงขายสินค้า</label>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
              <label>ชื่อสินค้า</label>
          </div>
          <div class="column is-9">
            <input type="text" v-model="priceName"  class="input" placeholder="ชื่อสินค้า">
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
              <label>รายละเอียด</label>
          </div>
          <div class="column is-9">
            <p class="control">
              <textarea class="textarea" placeholder="รายละเอียด" v-model="priceDetail"></textarea>
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
              <label>รูปภาพ</label>
          </div>
          <div class="column is-9">
           <input type="text" v-model="priceImg" placeholder="ลิ้งที่อยู่ของรูปภาพ" class="input">
          </div>
        </div>
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <img :src="priceImg" >
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
            <label>ราคา</label>
          </div>
          <div class="column is-9">
           <input type="number" v-model="priceCost" placeholder="ราคาของสินค้าที่ขาย" class="input" min="0">
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
            <label>หมวดหมู่</label>
          </div>
          <div class="column is-9">
            <span class="select">
              <select v-model="priceTag" style="width : 100%">
              <option value="CPU">CPU</option>
              <option value="Graphic Gard">Graphic Gard</option>
              <option value="RAM">RAM</option>
              <option value="CASE">CASE</option>
              <option value="HDD">HDD</option>
              <option value="SSD">SSD</option>
              <option value="Main Board">Main Board</option>
              <option value="PSU">PSU</option>
            </select>
          </span>
        </div>
      </div>
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <button type="button" @click="addPrice()" class="button is-primary is-outlined" style="width : 100%">ยืนยัน</button>
        </div>
      </div>
    </div>

  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
</section>
</body>


</template>

<script>
/* global swal */
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'sell',
  data () {
    return {
      priceName: '',
      priceImg: '',
      priceCost: 0,
      priceDetail: '',
      priceTag: ''
    }
  },
  methods: {
    addPrice () {
      if (this.priceName === '') {
        console.log('เข้า if นะ')
        swal('Oops...', 'กรุณาใส่ข้อมูลให้ครบ', 'error')
      } else if (this.priceImg === '') {
        console.log('เข้า else if 2 นะ')
        swal('Oops...', 'กรุณาใส่ข้อมูลให้ครบ', 'error')
      } else if (this.priceCost === 0) {
        console.log('เข้า else if 3 นะ')
        swal('Oops...', 'กรุณาใส่ข้อมูลให้ครบ', 'error')
      } else if (this.priceTag === '') {
        console.log('เข้า else if 3 นะ')
        swal('Oops...', 'กรุณาใส่ข้อมูลให้ครบ', 'error')
      } else if (typeof (this.priceCost) === 'number') {
        console.log('เข้า else if 4 นะ')
        swal('Oops...', 'กรุณาใส่ข้อมูลให้ถูกต้อง', 'error')
      } else {
        let data = {
          priceName: this.priceName,
          priceDetail: this.priceDetail,
          priceTag: this.priceTag,
          priceCost: this.priceCost,
          priceImg: this.priceImg,
          id: '_' + Math.random().toString(36).substr(2, 9),
          uid: this.uid,
          displayName: this.displayName,
          photoURL: this.photoURL,
          view: 0,
          status: 'selling',
          date: Date.now(),
          comments: [
            {
              uid: this.uid,
              displayName: this.displayName,
              photoURL: this.photoURL,
              message: 'chat on ' + this.displayName
            }
          ]
        }
        this.$store.dispatch('upload', data)
        swal('Success', 'เพิ่มข้อมูลสำเร็จ', 'success')
        this.$router.push({path: '/'})
      }
    },
    ...mapActions([
      'upload'
    ])
  },
  computed: {
    ...mapGetters([
      'uid',
      'displayName',
      'photoURL',
      'mode'
    ])
  },
  mounted () {
    if (this.mode === true) {
      this.$router.push({path: '/'})
    }
  }
}
</script>
