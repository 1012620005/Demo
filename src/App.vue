<template>
    <div id="app" class="drap">
        <div id="canvas"></div>
        <div class="properties-panel-parent" id="js-properties-panel"></div>
    </div>
</template>
<script>
    export default{
      data () {
        return {

        }
      },
      mounted () {
          this.$nextTick(function(){
              var BpmnModeler = require('bpmn-js/lib/Modeler');
              var propertiesPanelModule = require('bpmn-js-properties-panel'),
                  propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda'),
                  camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda');
              var container = $('#app');
              var canvas = $('#canvas');
              var viewer = new BpmnModeler({
                container: canvas,
                propertiesPanel: {
                  parent: '#js-properties-panel'
                },
                additionalModules: [
                  propertiesPanelModule,
                  propertiesProviderModule
                ],
                moddleExtensions: {
                  camunda: camundaModdleDescriptor
                }
              });
              this.$ajax.get('http://localhost:8533/static/bpmn/newDiagram.bpmn')
                .then(response =>{
                   viewer.importXML(response.data, function(err) {
                      if (err) {
                          container
                            .removeClass('with-diagram')
                            .addClass('with-error');

                          container.find('.error pre').text(err.message);

                          console.error(err);
                        } else {
                          container
                            .removeClass('with-error')
                            .addClass('with-diagram');
                        }
                    })

                })
          })
          
            
          // viewer.importXML('./pizza-collaboration.bpmn', function(err) {

          // if (!err) {
          //   console.log('success!');
          //   viewer.get('canvas').zoom('fit-viewport');
          // } else {
          //   console.log('something went wrong:', err);
          // }
        // });
      }
    }
</script>
<style type="text/css">
   @import 'assets/app.css';
   @import 'assets/diagram-js.css';
   @import 'assets/bpmn-font/css/bpmn-embedded.css';
   .drap{
        position: relative;
        width: 100%;
        height: 100%;
   }
</style>

