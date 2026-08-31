<template>
  <v-card class="mx-auto" max-width="640" title="New Cocktail" width="100%">
    <v-container>
      <v-alert
        v-if="error"
        border="top"
        type="warning"
        variant="outlined"
        prominent
      >
        {{ error }}
      </v-alert>

      <v-text-field
        v-model="form.title"
        color="primary"
        label="Name"
        variant="underlined"
      ></v-text-field>

      <v-number-input
        v-model="form.price"
        :precision="2"
        hide-details="auto"
        variant="underlined"
        prefix="€"
        color="primary"
        label="Price"
      ></v-number-input>
    </v-container>

    <v-container fluid>
      <v-textarea label="Description" v-model="form.description"></v-textarea>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn v-if="cancel" variant="outlined" @click="onCancel">Cancel</v-btn>

      <v-btn color="primary" variant="flat" @click="submitForm">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { reactive, ref } from 'vue';
import { createCocktail } from '@/api/resources/cocktails';

export default {
  name: 'CocktailForm',
  props: {
    cancel: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['cancel', 'submit'],
  setup(props, { emit }) {
    const form = reactive({
      title: '',
      price: null,
      description: '',
    });
    const error = ref(null);

    const submitForm = async () => {
      error.value = null;
      try {
        await createCocktail(form);
        emit('submit', { ...form });
        form.title = '';
        form.price = null;
        form.description = '';
      } catch (err) {
        error.value = err.message;
      }
    };

    const onCancel = () => emit('cancel');

    return {
      form,
      error,
      submitForm,
      onCancel,
    };
  },
};
</script>
