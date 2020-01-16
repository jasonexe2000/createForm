import './components/radio.js';
import './components/checkbox.js';
import './components/dropdown.js';
import './components/literal.js';
import './components/date.js';
import './components/number.js';
import './components/email.js';
import './components/english.js';

Vue.component('create-form', {
  data() {
    return {
      current: {
        Guid: null,
        Title: '',
        Type: 'radio',
        Options: [],
        Required: false,
      },
      form: {
        Guid: null,
        Title: '無標題表單',
        Description: '',
        Questions: [],
        ScoreEnable: false,
      },
      menuType: [
        {
          type: 'radio',
          typeTW: '單選題',
          iconPath: './icons/outline_radio_button_checked.png',
        },
        {
          type: 'checkbox',
          typeTW: '複選題',
          iconPath: './icons/outline_check_box.png',
        },
        {
          type: 'dropdown',
          typeTW: '下拉式選單',
          iconPath: './icons/outline_arrow_drop_down_circle.png',
        },
        {
          type: 'literal',
          typeTW: '簡答',
          iconPath: './icons/outline_format_align_left.png',
        },
        {
          type: 'date',
          typeTW: '日期',
          iconPath: './icons/outline_calendar_today.png',
        },
        {
          type: 'number',
          typeTW: '數字',
          iconPath: './icons/number.png',
        },
        {
          type: 'email',
          typeTW: '信箱',
          iconPath: './icons/email.png',
        },
        {
          type: 'english',
          typeTW: '英文',
          iconPath: './icons/english.png',
        },
      ],
      clickMenu: false,
      editMode: false,
      forReadOnly: {},
    };
  },
  template: `
    <div>
      <div id="current-guid">
        {{ this.current.Guid }}
      </div>

      <div id="fuck-opacity" class="guid-message">
        <p>複製成功</p>
      </div>

      <div class="main">
        <div class="form">
          <div class="input form-title">
            <input
              type="text"
              v-model="form.Title"
              placeholder="表單標題"
              @click="selectTarget"
            />
            <div class="line"></div>
          </div>

          <div class="input form-description">
            <input
              type="text"
              v-model="form.Description"
              placeholder="表單說明"
            />
            <div class="line"></div>
          </div>

          <component
            v-for="(item, index) in form.Questions"
            :key="index"
            :question="item"
            :index="index"
            :is="item.Type"
            :ScoreEnable="form.ScoreEnable"
            :editMode="editMode"
          ></component>
        </div>

        <div class="editor" v-if="!editMode">
          <div class="sidebar">
            <div class="sidebar-item">
              <img
                class="size-22"
                src="./icons/outline_add_circle_outline.png"
                @click="addQuestion"
                @mousemove="showTooltip('.tooltip-times-circle')"
                @mouseout="hideTooltip('.tooltip-times-circle')"
              />
              <div class="tooltip-times-circle">
                <p>新增問題</p>
              </div>
            </div>

            <div class="sidebar-item">
              <img
                class="icon-copy size-22"
                src="./icons/outline_file_copy.png"
                @click="showCurrentGuid"
                @mousemove="showTooltip('.tooltip-fa-copy')"
                @mouseout="hideTooltip('.tooltip-fa-copy')"
              />
              <div class="tooltip-fa-copy">
                <p>複製當前題目的 Guid</p>
              </div>
            </div>
          </div>

          <div class="title-and-menu">
            <div class="input title">
              <input type="text" v-model="current.Title" placeholder="問題" />
              <div class="line"></div>
            </div>

            <div class="menu">
              <div class="current-menu" v-if="!clickMenu" @click="showMenu">
                <img class="size-22" :src="currentType.iconPath" />
                <p>{{ currentType.typeTW }}</p>
                <img class="size-22 ml-auto" src="./icons/outline_arrow_drop_down.png" />
              </div>

              <div class="menu-list" v-else>
                <div
                  class="current-menu"
                  v-for="(item, index) in menuType"
                  :key="index"
                  @click="switchMenu(item, index)"
                >
                  <img class="size-22" :src="item.iconPath" />
                  <p>{{ item.typeTW }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="options">
            <div
              class="option"
              v-for="(item, index) in current.Options"
              :key="index"
              @mousemove="showRemoveIcon(item)"
              @mouseout="hideRemoveIcon(item)"
            >
              <div class="option-icon">
                <span v-if="current.Required" class="badge badge-danger">必填</span>
                <span v-if="form.ScoreEnable" class="badge badge-info">計分</span>
                <img
                  class="size-22"
                  src="./icons/outline_radio_button_checked.png"
                  v-if="current.Type === 'radio'"
                />
                <img
                  class="size-22"
                  src="./icons/outline_check_box.png"
                  v-else-if="current.Type === 'checkbox'"
                />
                <p v-else-if="current.Type === 'dropdown'">{{ index + 1 }}.</p>
              </div>

              <div class="input option-input" v-if="!status">
                <input type="text" :data-key="item.Guid" v-model="item.Value" />
                <div class="line"></div>
              </div>

              <div
                class="icon-cross"
                :data-key="item.Guid"
                @click="removeOption(index)"
              ></div>

              <input type="number" min="0" v-if="form.ScoreEnable" class="form-control ml-auto w-80" v-model="item.Score"></input>
            </div>

            <div class="option">
              <div class="ques-icon">
                <img
                  class="size-22"
                  src="./icons/outline_radio_button_checked.png"
                  v-if="current.Type === 'radio'"
                />
                <img
                  class="size-22"
                  src="./icons/outline_check_box.png"
                  v-else-if="current.Type === 'checkbox'"
                />
                <p v-else-if="current.Type === 'dropdown'">
                  {{ current.Options.length + 1 }}.
                </p>
                <label v-else-if="current.Type === 'literal'">簡答文字</label>
                <label v-else-if="current.Type === 'date'">日期</label>
                <label v-else-if="current.Type === 'number'">數字</label>
                <label v-else-if="current.Type === 'email'">信箱</label>
                <label v-else-if="current.Type === 'english'">英文</label>
              </div>

              <div class="input option-input" v-if="!status">
                <input
                  type="text"
                  @click="addNewOption"
                  @keydown="addNewOption"
                  placeholder="新增選項"
                />
              </div>
            </div>
          </div>

          <div class="functions">
            <div class="delete ml-auto">
              <img
                class="size-22"
                src="./icons/outline_delete.png"
                @click="removeQuestion"
                @mousemove="showTooltip('.tooltip-delete')"
                @mouseout="hideTooltip('.tooltip-delete')"
              />
              <div class="tooltip-delete">
                <p>刪除當前編輯之題目</p>
              </div>
            </div>

            <div class="separationLine"></div>
            <div class="switch-area">
              <p>必填</p>
              <input
                type="checkbox"
                id="toggle"
                class="offscreen"
                v-model="current.Required"
              />
              <label for="toggle" class="switch"></label>
            </div>

            <div class="separationLine"></div>
            <div class="switch-area">
              <p>計分模式</p>
              <input
                type="checkbox"
                id="toggle2"
                class="offscreen"
                v-model="form.ScoreEnable"
              />
              <label for="toggle2" class="switch"></label>
            </div>
          </div>
        </div>

        <div class="editor" v-else>
          <div class="title-and-menu" v-if="forReadOnly">
            <div class="input title">
              <input type="text" v-model="forReadOnly.Title" placeholder="問題" />
              <div class="line"></div>
            </div>
            <button v-if="JSON.stringify(forReadOnly) !== '{}'" type="button" class="btn btn-sm btn-outline-success" @click="addQuestion">編輯完成</button>
          </div>

          <div class="options" v-if="forReadOnly">
            <div
              class="option"
              v-for="(item, index) in forReadOnly.Options"
              :key="index"
            >
              <div class="option-icon">
                <span v-if="current.Required" class="badge badge-danger">必填</span>
                <span v-if="form.ScoreEnable" class="badge badge-info">計分</span>
                <img
                  class="size-22"
                  src="./icons/outline_radio_button_checked.png"
                  v-if="current.Type === 'radio'"
                />
                <img
                  class="size-22"
                  src="./icons/outline_check_box.png"
                  v-else-if="current.Type === 'checkbox'"
                />
                <p v-else-if="current.Type === 'dropdown'">{{ index + 1 }}.</p>
              </div>

              <div class="input option-input" v-if="!status">
                <input type="text" :data-key="item.Guid" v-model="item.Value" />
                <div class="line"></div>
              </div>

              <input type="number" min="0" v-if="form.ScoreEnable" class="form-control ml-auto w-80" v-model="item.Score"></input>
            </div>

            <div class="functions mt-4">
              <div class="switch-area ml-auto">
                <p>計分模式</p>
                <input
                  type="checkbox"
                  id="toggle2"
                  class="offscreen"
                  v-model="form.ScoreEnable"
                />
                <label for="toggle2" class="switch"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    addNewOption() {
      const Guid = this.randomGuid();

      // 增加新選項
      this.current.Options.push({
        Guid,
        Value: `選項 ${this.current.Options.length + 1}`,
        Binding: [],
        Score: 0, // 選項分數
      });

      Vue.nextTick(() => {
        const target = document.querySelector(`input[data-key="${Guid}"]`);
        target.focus();
        target.select();
      });
    },
    removeOption(index) {
      this.current.Options.splice(index, 1);
    },
    addQuestion() {
      if (typeof this.current.index === 'number') {
        const index = this.current.index;
        delete this.current.index;
        this.form.Questions.splice(index, 0, this.current);
      } else if (typeof this.forReadOnly.index === 'number') {
        const index = this.forReadOnly.index;
        delete this.forReadOnly.index;
        this.form.Questions.splice(index, 0, this.forReadOnly);
        this.forReadOnly = {};
      } else {
        this.form.Questions.push({
          ...this.current,
          Answer: this.current.Type === 'checkbox' ? [] : '',
        });
      }

      this.current = {
        Guid: this.randomGuid(),
        Type: 'radio',
        Title: '',
        Options: [
          {
            Guid: this.randomGuid(),
            Value: '選項 1',
            Binding: [],
            Score: 0,
          },
        ],
        Required: false,
      };
    },
    removeQuestion() {
      if (this.current.index !== undefined) {
        this.current = {
          Guid: this.randomGuid(),
          Type: 'radio',
          Title: '',
          Options: [
            {
              Guid: this.randomGuid(),
              Value: '選項 1',
              Binding: [],
              Score: 0,
            },
          ],
          Required: false,
        };
      } else {
        alert('此題目為當前編輯之題目，恕無法刪除');
      }
    },
    // Tooltip
    showTooltip(className) {
      document.querySelector(className).style.display = 'block';
    },
    hideTooltip(className) {
      document.querySelector(className).style.display = 'none';
    },
    // Other
    selectTarget(e) {
      e.target.select();
    },
    // Guid
    randomGuid() {
      function apple() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
          .toUpperCase();
      }
      return `${apple()}${apple()}-${apple()}-${apple()}-${apple()}-${apple()}${apple()}${apple()}`;
    },
    showCurrentGuid() {
      const currentGuid = document.getElementById('current-guid');
      const TextRange = document.createRange();
      TextRange.selectNode(currentGuid);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(TextRange);
      document.execCommand('copy');

      const copyIcon = document.querySelector('.icon-copy');
      copyIcon.classList.add('apple');
      setTimeout(() => {
        copyIcon.classList.remove('apple');
      }, 300);

      let guidMessage = document.querySelector('.guid-message');
      guidMessage.style.opacity = 1;
      setTimeout(() => {
        guidMessage.style.opacity = 0;
      }, 1000);
    },
    // Icon
    showRemoveIcon(item) {
      document.querySelector(`div[data-key="${item.Guid}"]`).style.display =
        'block';
    },
    hideRemoveIcon(item) {
      document.querySelector(`div[data-key="${item.Guid}"]`).style.display =
        'none';
    },
    // Menu
    showMenu() {
      this.clickMenu = true;
      // document.addEventListener('click', this.hideMenu);
    },
    hideMenu(e) {
      const menuList = document.querySelector('.menu-list');
      if (e.target !== menuList) {
        this.clickMenu = false;
      }
    },
    switchMenu(item, index) {
      this.clickMenu = false;
      this.current.Type = item.type;

      const target = document.querySelector('.menu-list');
      if (item.type === 'radio') {
        target.style.top = '0px';
      } else if (item.type === 'checkbox') {
        target.style.top = '-42px';
      } else if (item.type === 'dropdown') {
        target.style.top = '-84px';
      } else if (item.type === 'literal') {
        target.style.top = '-126px';
      } else if (item.type === 'date') {
        target.style.top = '-168px';
      } else if (item.type === 'number') {
        target.style.top = '-210px';
      } else if (item.type === 'email') {
        target.style.top = '-252px';
      } else if (item.type === 'english') {
        target.style.top = '-294px';
      }

      if (
        this.current.Type === 'literal' ||
        this.current.Type === 'date' ||
        this.current.Type === 'number' ||
        this.current.Type === 'email' ||
        this.current.Type === 'english'
      ) {
        this.current.Options = [];
      }
    },
    getFormJSON() {
      this.form.Questions.forEach(item => {
        if (typeof item.Answer === 'string') {
          item.Answer = [];
        }
      });
      return JSON.stringify(this.form);
    },
    openEditMode(obj) {
      obj.Questions.forEach(item => {
        item.Answer = item.Type !== 'checkbox' ? '' : [];

        // 不需要 QuestionScore 了，這邊若有問題需重寫
        // if (
        //   item.Type === 'radio' ||
        //   item.Type === 'checkbox' ||
        //   item.Type === 'dropdown'
        // ) {
        //   item.QuestionScore = 0;
        // }
      });

      this.form = obj;
      this.editMode = true;
    },
  },
  // watch: {
  //   'form.Title'(value) {
  //     document.title = `${value} - Google 表單`;
  //   },
  // },
  computed: {
    currentType() {
      if (this.current.Type === 'radio') {
        return {
          typeTW: '單選題',
          iconPath: './icons/outline_radio_button_checked.png',
        };
      } else if (this.current.Type === 'checkbox') {
        return {
          typeTW: '複選題',
          iconPath: './icons/outline_check_box.png',
        };
      } else if (this.current.Type === 'dropdown') {
        return {
          typeTW: '下拉式選單',
          iconPath: './icons/outline_arrow_drop_down_circle.png',
        };
      } else if (this.current.Type === 'literal') {
        return {
          typeTW: '簡答',
          iconPath: './icons/outline_format_align_left.png',
        };
      } else if (this.current.Type === 'date') {
        return {
          typeTW: '日期',
          iconPath: './icons/outline_calendar_today.png',
        };
      } else if (this.current.Type === 'number') {
        return {
          typeTW: '數字',
          iconPath: './icons/number.png',
        };
      } else if (this.current.Type === 'email') {
        return {
          typeTW: '信箱',
          iconPath: './icons/email.png',
        };
      } else if (this.current.Type === 'english') {
        return {
          typeTW: '英文',
          iconPath: './icons/english.png',
        };
      }
    },
    status() {
      if (
        this.current.Type === 'literal' ||
        this.current.Type === 'date' ||
        this.current.Type === 'number' ||
        this.current.Type === 'email' ||
        this.current.Type === 'english'
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.current.Options.push({
      Guid: this.randomGuid(),
      Value: `選項 ${this.current.Options.length + 1}`,
      Binding: [],
      Score: 0,
    });
  },
  mounted() {
    // document.title = `${this.form.Title} - Google 表單`;
    // setTimeout(() => {
    this.form.Guid = this.randomGuid();
    this.current.Guid = this.randomGuid();
    // }, 250);
  },
});

const vm = new Vue({
  el: '#app',
});

window.jun = {
  getCreateFormJS: vm.$refs.jun.getFormJSON, // 取得當前表單的 JSON 結構
  openEditMode: vm.$refs.jun.openEditMode, // 開啟編輯模式：只可修改分數、題目的文字與是否啟用計分功能
};
