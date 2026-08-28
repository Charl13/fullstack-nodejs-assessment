<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="form.title" id="title" required />
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="number" v-model="form.price" id="price" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          v-model="form.description"
          id="description"
          required
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { createCocktail } from '@/api/resources/cocktails';

export default {
  name: 'CocktailNew',
  setup() {
    const form = reactive({
      title: '',
      price: '',
      description: '',
    });
    const error = ref(null);

    const submitForm = async () => {
      error.value = null;
      try {
        await createCocktail(form);
        form.title = '';
        form.price = '';
        form.description = '';
      } catch (err) {
        error.value = err.message;
      }
    };

    return {
      form,
      error,
      submitForm,
    };
  },
};
</script>

<style scoped>
/* Optional: Add some basic styling */
form {
  max-width: 400px;
  margin: 0 auto;
}
div {
  margin-bottom: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
