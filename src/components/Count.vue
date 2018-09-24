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
        <div class="dropzone">
          上傳檔案：
          <input type="file" name="file" id="file" accept=".doc,.docx" multiple="multiple">
        </div>
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
import Uploader from 'vue-upload-component';
export default {
  name: 'Count',
  components: {
    Uploader
  },
  data(){
    return {
      name: '',
      count: 0,
    };
  },
  methods: {
    startCount(){
      const formData = new FormData();
      const dropzone = document.getElementById('file');
      const files = dropzone.files;
      /*
      for(let i = 0; i < files.length; i++){
        const file = files[i];
        formData.append('file', file);
      }*/
      fetch('http://127.0.0.1:8000', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
        body: files[0],
      })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
    },
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
