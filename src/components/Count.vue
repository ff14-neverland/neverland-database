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
        <Uploader ref="upload" v-model="files" :multiple="true" :drop="true" accept=".doc,.docx" :custom-action="startCount" @input-file="inputFile">
          將要檔案拖到此處或點擊此處上傳：
          <div class="uploaded-files" v-if="files.length !== 0">
            已上傳檔案：
            <ul class="files-list">
              <li v-for="(file, index) in files" :key="file.id">
                <span>{{file.name}}</span>
              </li>
            </ul>
          </div>
        </Uploader>
      </div>
      <div class="action-buttons">
        <button class="btn btn-primary" @click.prevent="$refs.upload.active = true">
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
      files:[],
    };
  },
  methods: {
    async startCount(file, component){
      const response = await fetch('http://127.0.0.1:8000', {method: "POST", body: 'Hello'});
      let data = await response.json();
      return data;
    },
    inputFile(newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // 获得相应数据
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  获得响应状态码
          console.log('status', newFile.xhr.status)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h1{
  margin-bottom: 1em;
}
.file-uploads{
  display: block;
  border: 2px solid #e5e5e5;
  font-family: Arial,sans-serif;
  letter-spacing: .2px;
  color: #777;
  transition: background-color .2s linear;
  min-height: 150px;
  background: #fff;
  padding: 20px;

  &:hover{
    cursor: pointer;
  }
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
