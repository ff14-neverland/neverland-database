<template>
  <div class="container">
    <div class="wrapper">
      <h1>字數統計器</h1>
      <div class="form-group">
        <label class="col-form-label">輸入角色名：</label>
        <div>
          <input v-model="name" class="form-control" type="text" value="">
        </div>
      </div>
      <div class="form-group">
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
      </div>
      <div class="action-buttons">
        <button class="btn btn-primary" v-on:click="startCount">
          開始統計
        </button>
      </div>
      <div class="result">
        統計字數：
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
export default {
  name: 'Count',
  components: {
    vueDropzone: vue2Dropzone
  },
  data(){
    return {
      name: '',
      count: 0,
      dropzoneOptions: {
        url: 'http://127.0.0.1:8000',
        uploadMultiple: true,
        autoProcessQueue: false,
        acceptedFiles:'.doc, .docx',
        headers: {'Access-Control-Allow-Origin': '*'}
      }
    };
  },
  methods: {
    startCount(){
      this.$refs.myVueDropzone.processQueue();
    }
  },
}
</script>

<style lang="scss" scoped>
h1{
  margin-bottom: 1em;
}
.dropzone{
  display: block;
  font-family: Arial,sans-serif;
  letter-spacing: .2px;
  color: #777;
  transition: background-color .2s linear;
  background: #fff;
  margin-top: 50px;
  margin-bottom: 50px;
}

.uploaded-files{
  margin-top: 1em;
}

.files-list{
  margin-top: 1em;
}

.result{
  margin-top: 50px;
}
</style>
