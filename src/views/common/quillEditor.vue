<template>
  <div class="quillWrapper">
    <div class="toolbar" :class="quillref">
      <!-- <form  enctype="multipart/form-data" method="post" name="fileinfo"> -->
        <input type="file" @change='previewFile' style='display: none !important;'>
      <!-- </form> -->
      <!-- Add a bold button -->
      <!-- Add subscript and superscript buttons -->
      <i class="el-icon-picture" @click="upclick" ></i>
     <!--  <button @click="upclick"><i class="fa fa-file-image-o"></i></button> -->
    </div>
    <div ref="quillref" class="quill-container"></div>
  </div>
</template>

<script>
  import Quill from 'quill'
  require('quill/dist/quill.snow.css')
  require('quill/dist/quill.bubble.css')
  require('quill/dist/quill.core.css')
  // import { ImgUpload, ImgUrl } from '../configure'
  export default {
    props: ['content', 'value', 'quillref', 'placeholder'],
    data: function () {
      return {
        quill: null,
        editor: null,
        _content: '',
        img: '',
        imgUpload: ''
      }
    },
    mounted: function () {
      const vm = this
      vm.quill = new Quill(vm.$refs.quillref, {
        modules: {
          toolbar: `.${this.quillref}`
        },
        placeholder: this.placeholder ? this.placeholder : '请输入内容',
        theme: 'snow'
      })
      if (vm.value || vm.content) {
        vm.quill.pasteHTML(vm.value || vm.content)
      }
      vm.editor = vm.$refs.quillref.querySelector('.ql-editor')
      vm.quill.on('text-change', function () {
        // console.log(vm.editor.innerHTML)
        var html = vm.editor.innerHTML
        if (html === '<p class="html-text"><br class="html-text"></p>') html = ''
        vm._content = html
        vm.$emit('input', vm._content)
        vm.$emit('content', [html, vm.quillref])
      })
      vm.quill.on('selection-change', (range) => {
        if (!range) {
          vm.$emit('blur', vm.quill)
        } else {
          vm.$emit('focus', vm.quill)
        }
      })
    },
    methods: {
      previewFile (event) {
        var file = event.target.files[0]
        var vm = this;
        var filePath = file.name;
        var fileSize = file.size;
        var filetypes =[".jpg",".png",".jpeg"];
        var filemaxsize = 1024*2;
        console.log(filePath)
        var reader = new FileReader();
        if(filePath) {
          var isnext = false;   
          var fileend = filePath.substring(filePath.indexOf("."));
          for(var i =0; i<filetypes.length;i++){   
            if(filetypes[i] == fileend){   
            isnext = true;   
            break;   
            }   
          }   
        }
        if(!isnext){   
          alert("不接受此文件类型！");
          return false;   
        } 
        var size = fileSize/1024;
        if(size > filemaxsize) {
          alert('文件不能大于2M')
          return false;
        }
        reader.onload = function (e) {
            var src= e.target.result;
            var index = vm.quill.getLength();
            vm.quill.insertEmbed(index - 1, 'image', src)
        };
        reader.readAsDataURL(file);
      },
      upclick (event) {
        console.log('upclick')
        this.$el.querySelector('input[type=file]').click()
      }
    },
    watch: {
      'content' (newVal, oldVal) {
        if (this.quill) {
          if (!!newVal && newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if (!newVal) {
            this.quill.setText('')
          }
        }
      },
      'value' (newVal, oldVal) {
        if (this.quill) {
          if (newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if (!newVal) {
            this.quill.setText('')
          }
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .quillWrapper{
    width:310px;
  }
  .quill-container {
    min-height: 200px;
  }
  .ql-editor p.text{
    font-size:50px;
  }
</style>