import { dropdown_literal_date } from '../extends/dropdown_literal_date.js';

export default Vue.component('literal', {
  template: `
    <div class="form-question" v-if="display">
      <div class="question-title" @mousemove="showEdit(question.Guid)" @mouseout="hideEdit(question.Guid)">
        <p class="required" v-if="question.Required">*</p>
        <h4>{{ index + 1}}. {{ question.Title }}</h4>
        <p class="edit" :data-key="question.Guid" @click="edit(question)">Edit</p>
      </div>
      
      <div class="input literal">
        <input type="text" v-model="question.Answer" placeholder="您的回答" />
        <div class="line"></div>
      </div>
    </div>
  `,
  extends: dropdown_literal_date,
});
