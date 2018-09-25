<template>
  <div class="container">
    <div class="wrapper">
      <h1>字數統計器</h1>
      <div class="form-group">
        <label class="col-form-label">輸入角色名：</label>
        <div>
          <input v-model="name" class="form-control" type="text" value="" required>
        </div>
      </div>
      <div class="form-group">
      </div>
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-success-multiple="onUploaded" @vdropzone-sending="onSend"></vue-dropzone>
      </div>
      <div class="action-buttons">
        <button class="btn btn-primary" v-on:click="startCount">
          開始統計
        </button>
      </div>
      <div class="result">
        統計字數： {{count}}
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
        addRemoveLinks: true,
        dictDefaultMessage: '將檔案拖至此或點擊上傳',
        acceptedFiles:'.doc, .docx',
        headers: {'Access-Control-Allow-Origin': '*'}
      }
    };
  },
  methods: {
    onUploaded(files, response){
      //Call word count api, get result and change the default text of dropzone
      this.count = response.totalCount;
      this.$refs.myVueDropzone.removeAllFiles();
      const dropzoneText = document.querySelector('.dz-message span');
      dropzoneText.textContent = '上載完成！如要繼續統計，請再次將檔案拖至此或點擊上傳';
    },
    onSend(file, xhr, formData){
      formData.append('name', this.name);
    },
    startCount(){
      //If name is empty, alert user and will not start upload
      if(this.name === ''){
        alert('請輸入角色姓名！');
      }else{
        this.$refs.myVueDropzone.processQueue();
      }
    }
  },
}
</script>

<style lang="scss" scoped>
h1{
  margin-bottom: 1em;
}

.dropzone{
  margin-bottom: 50px;
}
.uploaded-files{
  margin-top: 1em;
}

.files-list{
  margin-top: 1em;
}

.result{
  font-size: 1.5em;
  margin-top: 50px;
}
</style>
