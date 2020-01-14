!function(n){var e={};function t(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return n[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,i){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:i})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(i,o,function(e){return n[e]}.bind(null,o));return i},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=0)}([function(n,e,t){"use strict";t.r(e);var i=Vue.extend({template:"#haveBinding",props:["question","index","ScoreEnable","editMode"],data:function(){return{display:!0}},methods:{binding:function(n){var e=prompt();null!==e&&n.Binding.push(e)},edit:function(n){var e=this;this.$root.$children[0].form.Questions.forEach((function(t,i,o){if(n.Guid===t.Guid){if(t.index=i,e.editMode){if(e.$root.$children[0].forReadOnly.Guid)return void alert("當前題目尚未編輯完成");e.$root.$children[0].forReadOnly=t}else e.$root.$children[0].current=t;o.splice(i,1)}}))}},mounted:function(){var n=this;eventBus.$on("connect",(function(e){e.Guid===n.question.Guid&&(n.display=e.status)}))}}),o=(Vue.component("radio",{watch:{display:function(){this.display||(this.question.Answer="",this.question.Options.forEach((function(n){n.Binding.length>0&&n.Binding.forEach((function(n){eventBus.$emit("connect",{Guid:n,status:!1})}))})))}},methods:{checkBinding:function(n,e){e.Binding.length>0&&e.Binding.forEach((function(n){eventBus.$emit("connect",{Guid:n,status:!0})})),n.Options.forEach((function(n){n.Binding.length>0&&n.Guid!==e.Guid&&n.Binding.forEach((function(n){eventBus.$emit("connect",{Guid:n,status:!1})}))}))}},extends:i}),Vue.component("checkbox",{watch:{display:function(){this.display||(this.question.Answer=[],this.question.Options.forEach((function(n){n.Binding.length>0&&n.Binding.forEach((function(n){eventBus.$emit("connect",{Guid:n,status:!1})}))})))}},methods:{checkBinding:function(n,e){e.Binding.length>0&&e.Binding.forEach((function(t){0===n.Answer.length?eventBus.$emit("connect",{Guid:t,status:!1}):n.Answer.forEach((function(n){n===e.Guid?eventBus.$emit("connect",{Guid:t,status:!0}):eventBus.$emit("connect",{Guid:t,status:!1})}))}))}},extends:i}),Vue.extend({props:["question","index","ScoreEnable","editMode"],data:function(){return{display:!0}},watch:{display:function(){this.display||(this.question.Answer="")}},methods:{edit:function(n){var e=this;this.$root.$children[0].form.Questions.forEach((function(t,i,o){if(n.Guid===t.Guid){if(t.index=i,e.editMode){if(e.$root.$children[0].forReadOnly.Guid)return void alert("當前題目尚未編輯完成");e.$root.$children[0].forReadOnly=t}else e.$root.$children[0].current=t;o.splice(i,1)}}))}},mounted:function(){var n=this;eventBus.$on("connect",(function(e){e.Guid===n.question.Guid&&(n.display=e.status)}))}}));Vue.component("dropdown",{template:'\n    <div class="form-question" v-if="display">\n      <div class="question-title">\n        <button type="button" class="btn btn-sm btn-outline-success mr-3" @click="edit(question)">編輯</button>\n        <span v-if="question.Required" class="badge badge-danger mr-1">必填</span>\n        <span v-if="ScoreEnable" class="badge badge-info mr-2">計分</span>\n        <h4>{{ index + 1}}.  {{ question.Title }}</h4>\n      </div>\n\n      <select v-model="question.Answer">\n        <option value="">請選擇</option>\n        <option\n          v-for="(item, index) in question.Options"\n          :key="index"\n          :value="item.Guid"\n          >{{ item.Value }}</option\n        >\n      </select>\n    </div>\n  ',extends:o}),Vue.component("literal",{template:'\n    <div class="form-question" v-if="display">\n      <div class="question-title">\n        <button type="button" class="btn btn-sm btn-outline-success mr-3" @click="edit(question)">編輯</button>\n        <span v-if="question.Required" class="badge badge-danger mr-2">必填</span>\n        <h4>{{ index + 1}}.  {{ question.Title }}</h4>\n        <p class="edit" :data-key="question.Guid" @click="edit(question)">Edit</p>\n      </div>\n      \n      <div class="input literal">\n        <input type="text" v-model="question.Answer" placeholder="您的回答" />\n        <div class="line"></div>\n      </div>\n    </div>\n  ',extends:o}),Vue.component("date",{template:'\n    <div class="form-question" v-if="display">\n      <div class="question-title">\n        <button type="button" class="btn btn-sm btn-outline-success mr-3" @click="edit(question)">編輯</button>\n        <span v-if="question.Required" class="badge badge-danger mr-2">必填</span>\n        <h4>{{ index + 1}}.  {{ question.Title }}</h4>\n      </div>\n      \n      <div class="input literal">\n        <input type="date" class="date form-control" v-model="question.Answer" />\n      </div>\n    </div>\n  ',extends:o}),Vue.component("number",{template:'\n    <div class="form-question" v-if="display">\n      <div class="question-title">\n        <button type="button" class="btn btn-sm btn-outline-success mr-3" @click="edit(question)">編輯</button>\n        <span v-if="question.Required" class="badge badge-danger mr-2">必填</span>\n        <h4>{{ index + 1}}.  {{ question.Title }}</h4>\n      </div>\n      \n      <div class="input literal">\n        <input type="number" class="date form-control" v-model="question.Answer" />\n      </div>\n    </div>\n  ',extends:o}),Vue.component("email",{template:'\n    <div class="form-question" v-if="display">\n      <div class="question-title">\n        <button type="button" class="btn btn-sm btn-outline-success mr-3" @click="edit(question)">編輯</button>\n        <span v-if="question.Required" class="badge badge-danger mr-2">必填</span>\n        <h4>{{ index + 1}}.  {{ question.Title }}</h4>\n      </div>\n\n      <div class="input literal">\n        <input type="email" v-model="question.Answer" placeholder="請輸入您的 E-mail" />\n        <div class="line"></div>\n      </div>\n    </div>\n  ',extends:o}),Vue.component("english",{template:'\n    <div class="form-question" v-if="display">\n      <div class="question-title">\n        <button type="button" class="btn btn-sm btn-outline-success mr-3" @click="edit(question)">編輯</button>\n        <span v-if="question.Required" class="badge badge-danger mr-2">必填</span>\n        <h4>{{ index + 1}}.  {{ question.Title }}</h4>\n      </div>\n\n      <div class="input literal">\n        <input type="english" v-model="question.Answer" placeholder="請輸入英文字母" @change="checkNum" />\n        <div class="line"></div>\n      </div>\n    </div>\n  ',methods:{checkNum:function(){this.question.Answer=this.question.Answer.replace(/[^\a-\z\A-\Z]/g,"")}},extends:o});function s(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,i)}return t}function c(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}Vue.component("create-form",{data:function(){return{current:{Guid:null,Title:"",Type:"radio",Options:[],Required:!1},form:{Guid:null,Title:"無標題表單",Description:"",Questions:[],ScoreEnable:!1},menuType:[{type:"radio",typeTW:"單選題",iconPath:"./icons/outline_radio_button_checked.png"},{type:"checkbox",typeTW:"複選題",iconPath:"./icons/outline_check_box.png"},{type:"dropdown",typeTW:"下拉式選單",iconPath:"./icons/outline_arrow_drop_down_circle.png"},{type:"literal",typeTW:"簡答",iconPath:"./icons/outline_format_align_left.png"},{type:"date",typeTW:"日期",iconPath:"./icons/outline_calendar_today.png"},{type:"number",typeTW:"數字",iconPath:"./icons/number.png"},{type:"email",typeTW:"信箱",iconPath:"./icons/email.png"},{type:"english",typeTW:"英文",iconPath:"./icons/english.png"}],clickMenu:!1,editMode:!1,forReadOnly:{}}},template:'\n    <div>\n      <div id="current-guid">\n        {{ this.current.Guid }}\n      </div>\n\n      <div class="guid-message">\n        <p>複製成功</p>\n      </div>\n\n      <div class="main">\n        <div class="form">\n          <div class="input form-title">\n            <input\n              type="text"\n              v-model="form.Title"\n              placeholder="表單標題"\n              @click="selectTarget"\n            />\n            <div class="line"></div>\n          </div>\n\n          <div class="input form-description">\n            <input\n              type="text"\n              v-model="form.Description"\n              placeholder="表單說明"\n            />\n            <div class="line"></div>\n          </div>\n\n          <component\n            v-for="(item, index) in form.Questions"\n            :key="index"\n            :question="item"\n            :index="index"\n            :is="item.Type"\n            :ScoreEnable="form.ScoreEnable"\n            :editMode="editMode"\n          ></component>\n        </div>\n\n        <div class="editor" v-if="!editMode">\n          <div class="sidebar">\n            <div class="sidebar-item">\n              <img\n                class="size-22"\n                src="./icons/outline_add_circle_outline.png"\n                @click="addQuestion"\n                @mousemove="showTooltip(\'.tooltip-times-circle\')"\n                @mouseout="hideTooltip(\'.tooltip-times-circle\')"\n              />\n              <div class="tooltip-times-circle">\n                <p>新增問題</p>\n              </div>\n            </div>\n\n            <div class="sidebar-item">\n              <img\n                class="icon-copy size-22"\n                src="./icons/outline_file_copy.png"\n                @click="showCurrentGuid"\n                @mousemove="showTooltip(\'.tooltip-fa-copy\')"\n                @mouseout="hideTooltip(\'.tooltip-fa-copy\')"\n              />\n              <div class="tooltip-fa-copy">\n                <p>複製當前題目的 Guid</p>\n              </div>\n            </div>\n          </div>\n\n          <div class="title-and-menu">\n            <div class="input title">\n              <input type="text" v-model="current.Title" placeholder="問題" />\n              <div class="line"></div>\n            </div>\n\n            <div class="menu">\n              <div class="current-menu" v-if="!clickMenu" @click="showMenu">\n                <img class="size-22" :src="currentType.iconPath" />\n                <p>{{ currentType.typeTW }}</p>\n                <img class="size-22 ml-auto" src="./icons/outline_arrow_drop_down.png" />\n              </div>\n\n              <div class="menu-list" v-else>\n                <div\n                  class="current-menu"\n                  v-for="(item, index) in menuType"\n                  :key="index"\n                  @click="switchMenu(item, index)"\n                >\n                  <img class="size-22" :src="item.iconPath" />\n                  <p>{{ item.typeTW }}</p>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class="options">\n            <div\n              class="option"\n              v-for="(item, index) in current.Options"\n              :key="index"\n              @mousemove="showRemoveIcon(item)"\n              @mouseout="hideRemoveIcon(item)"\n            >\n              <div class="option-icon">\n                <span v-if="current.Required" class="badge badge-danger">必填</span>\n                <span v-if="form.ScoreEnable" class="badge badge-info">計分</span>\n                <img\n                  class="size-22"\n                  src="./icons/outline_radio_button_checked.png"\n                  v-if="current.Type === \'radio\'"\n                />\n                <img\n                  class="size-22"\n                  src="./icons/outline_check_box.png"\n                  v-else-if="current.Type === \'checkbox\'"\n                />\n                <p v-else-if="current.Type === \'dropdown\'">{{ index + 1 }}.</p>\n              </div>\n\n              <div class="input option-input" v-if="!status">\n                <input type="text" :data-key="item.Guid" v-model="item.Value" />\n                <div class="line"></div>\n              </div>\n\n              <div\n                class="icon-cross"\n                :data-key="item.Guid"\n                @click="removeOption(index)"\n              ></div>\n\n              <input type="number" min="0" v-if="form.ScoreEnable" class="form-control ml-auto w-80" v-model="item.Score"></input>\n            </div>\n\n            <div class="option">\n              <div class="ques-icon">\n                <img\n                  class="size-22"\n                  src="./icons/outline_radio_button_checked.png"\n                  v-if="current.Type === \'radio\'"\n                />\n                <img\n                  class="size-22"\n                  src="./icons/outline_check_box.png"\n                  v-else-if="current.Type === \'checkbox\'"\n                />\n                <p v-else-if="current.Type === \'dropdown\'">\n                  {{ current.Options.length + 1 }}.\n                </p>\n                <label v-else-if="current.Type === \'literal\'">簡答文字</label>\n                <label v-else-if="current.Type === \'date\'">日期</label>\n                <label v-else-if="current.Type === \'number\'">數字</label>\n                <label v-else-if="current.Type === \'email\'">信箱</label>\n                <label v-else-if="current.Type === \'english\'">英文</label>\n              </div>\n\n              <div class="input option-input" v-if="!status">\n                <input\n                  type="text"\n                  @click="addNewOption"\n                  @keydown="addNewOption"\n                  placeholder="新增選項"\n                />\n              </div>\n            </div>\n          </div>\n\n          <div class="functions">\n            <div class="delete ml-auto">\n              <img\n                class="size-22"\n                src="./icons/outline_delete.png"\n                @click="removeQuestion"\n                @mousemove="showTooltip(\'.tooltip-delete\')"\n                @mouseout="hideTooltip(\'.tooltip-delete\')"\n              />\n              <div class="tooltip-delete">\n                <p>刪除當前編輯之題目</p>\n              </div>\n            </div>\n\n            <div class="separationLine"></div>\n            <div class="switch-area">\n              <p>必填</p>\n              <input\n                type="checkbox"\n                id="toggle"\n                class="offscreen"\n                v-model="current.Required"\n              />\n              <label for="toggle" class="switch"></label>\n            </div>\n\n            <div class="separationLine"></div>\n            <div class="switch-area">\n              <p>計分模式</p>\n              <input\n                type="checkbox"\n                id="toggle2"\n                class="offscreen"\n                v-model="form.ScoreEnable"\n              />\n              <label for="toggle2" class="switch"></label>\n            </div>\n          </div>\n        </div>\n\n        <div class="editor" v-else>\n          <div class="title-and-menu" v-if="forReadOnly">\n            <div class="input title">\n              <input type="text" v-model="forReadOnly.Title" placeholder="問題" />\n              <div class="line"></div>\n            </div>\n            <button type="button" class="btn btn-sm btn-outline-success" @click="addQuestion">編輯完成</button>\n          </div>\n\n          <div class="options" v-if="forReadOnly">\n            <div\n              class="option"\n              v-for="(item, index) in forReadOnly.Options"\n              :key="index"\n            >\n              <div class="option-icon">\n                <span v-if="current.Required" class="badge badge-danger">必填</span>\n                <span v-if="form.ScoreEnable" class="badge badge-info">計分</span>\n                <img\n                  class="size-22"\n                  src="./icons/outline_radio_button_checked.png"\n                  v-if="current.Type === \'radio\'"\n                />\n                <img\n                  class="size-22"\n                  src="./icons/outline_check_box.png"\n                  v-else-if="current.Type === \'checkbox\'"\n                />\n                <p v-else-if="current.Type === \'dropdown\'">{{ index + 1 }}.</p>\n              </div>\n\n              <div class="input option-input" v-if="!status">\n                <input type="text" :data-key="item.Guid" v-model="item.Value" />\n                <div class="line"></div>\n              </div>\n\n              <input type="number" min="0" v-if="form.ScoreEnable" class="form-control ml-auto w-80" v-model="item.Score"></input>\n            </div>\n\n            <div class="functions mt-4">\n              <div class="switch-area ml-auto">\n                <p>計分模式</p>\n                <input\n                  type="checkbox"\n                  id="toggle2"\n                  class="offscreen"\n                  v-model="form.ScoreEnable"\n                />\n                <label for="toggle2" class="switch"></label>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ',methods:{addNewOption:function(){var n=this.randomGuid();this.current.Options.push({Guid:n,Value:"選項 ".concat(this.current.Options.length+1),Binding:[],Score:0}),Vue.nextTick((function(){var e=document.querySelector('input[data-key="'.concat(n,'"]'));e.focus(),e.select()}))},removeOption:function(n){this.current.Options.splice(n,1)},addQuestion:function(){if("number"==typeof this.current.index){var n=this.current.index;delete this.current.index,this.form.Questions.splice(n,0,this.current)}else if("number"==typeof this.forReadOnly.index){var e=this.forReadOnly.index;delete this.forReadOnly.index,this.form.Questions.splice(e,0,this.forReadOnly),this.forReadOnly={}}else this.form.Questions.push(function(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?s(Object(t),!0).forEach((function(e){c(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}({},this.current,{Answer:"checkbox"===this.current.Type?[]:""}));this.current={Guid:this.randomGuid(),Type:"radio",Title:"",Options:[{Guid:this.randomGuid(),Value:"選項 1",Binding:[],Score:0}],Required:!1}},removeQuestion:function(){void 0!==this.current.index?this.current={Guid:this.randomGuid(),Type:"radio",Title:"",Options:[{Guid:this.randomGuid(),Value:"選項 1",Binding:[],Score:0}],Required:!1}:alert("此題目為當前編輯之題目，恕無法刪除")},showTooltip:function(n){document.querySelector(n).style.display="block"},hideTooltip:function(n){document.querySelector(n).style.display="none"},selectTarget:function(n){n.target.select()},randomGuid:function(){function n(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1).toUpperCase()}return"".concat(n()).concat(n(),"-").concat(n(),"-").concat(n(),"-").concat(n(),"-").concat(n()).concat(n()).concat(n())},showCurrentGuid:function(){var n=document.getElementById("current-guid"),e=document.createRange();e.selectNode(n);var t=window.getSelection();t.removeAllRanges(),t.addRange(e),document.execCommand("copy");var i=document.querySelector(".icon-copy");i.classList.add("apple"),setTimeout((function(){i.classList.remove("apple")}),300);var o=document.querySelector(".guid-message");o.style.top="2.5%",setTimeout((function(){o.style.top="-50px"}),1e3)},showRemoveIcon:function(n){document.querySelector('div[data-key="'.concat(n.Guid,'"]')).style.display="block"},hideRemoveIcon:function(n){document.querySelector('div[data-key="'.concat(n.Guid,'"]')).style.display="none"},showMenu:function(){this.clickMenu=!0},hideMenu:function(n){var e=document.querySelector(".menu-list");n.target!==e&&(this.clickMenu=!1)},switchMenu:function(n,e){this.clickMenu=!1,this.current.Type=n.type;var t=document.querySelector(".menu-list");"radio"===n.type?t.style.top="0px":"checkbox"===n.type?t.style.top="-42px":"dropdown"===n.type?t.style.top="-84px":"literal"===n.type?t.style.top="-126px":"date"===n.type?t.style.top="-168px":"number"===n.type?t.style.top="-210px":"email"===n.type?t.style.top="-252px":"english"===n.type&&(t.style.top="-294px"),"literal"!==this.current.Type&&"date"!==this.current.Type&&"number"!==this.current.Type&&"email"!==this.current.Type&&"english"!==this.current.Type||(this.current.Options=[])},getFormJSON:function(){return this.form.Questions.forEach((function(n){"string"==typeof n.Answer&&(n.Answer=[])})),JSON.stringify(this.form)},openEditMode:function(n){n.Questions.forEach((function(n){n.Answer="checkbox"!==n.Type?"":[]})),this.form=n,this.editMode=!0}},computed:{currentType:function(){return"radio"===this.current.Type?{typeTW:"單選題",iconPath:"./icons/outline_radio_button_checked.png"}:"checkbox"===this.current.Type?{typeTW:"複選題",iconPath:"./icons/outline_check_box.png"}:"dropdown"===this.current.Type?{typeTW:"下拉式選單",iconPath:"./icons/outline_arrow_drop_down_circle.png"}:"literal"===this.current.Type?{typeTW:"簡答",iconPath:"./icons/outline_format_align_left.png"}:"date"===this.current.Type?{typeTW:"日期",iconPath:"./icons/outline_calendar_today.png"}:"number"===this.current.Type?{typeTW:"數字",iconPath:"./icons/number.png"}:"email"===this.current.Type?{typeTW:"信箱",iconPath:"./icons/email.png"}:"english"===this.current.Type?{typeTW:"英文",iconPath:"./icons/english.png"}:void 0},status:function(){return"literal"===this.current.Type||"date"===this.current.Type||"number"===this.current.Type||"email"===this.current.Type||"english"===this.current.Type}},created:function(){this.current.Options.push({Guid:this.randomGuid(),Value:"選項 ".concat(this.current.Options.length+1),Binding:[],Score:0})},mounted:function(){var n=this;setTimeout((function(){n.form.Guid=n.randomGuid(),n.current.Guid=n.randomGuid()}),250)}});var r=new Vue({el:"#app"});window.jun={getCreateFormJS:r.$refs.jun.getFormJSON,openEditMode:r.$refs.jun.openEditMode}}]);