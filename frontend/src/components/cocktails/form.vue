<template>
  <v-card class="mx-auto" max-width="640" title="New Cocktail" width="100%">
    <v-form ref="form">
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
          v-model="cocktail.title"
          :rules="[requiredRule]"
          color="primary"
          label="Name"
          variant="underlined"
        ></v-text-field>

        <v-number-input
          v-model="cocktail.price"
          :rules="[requiredRule]"
          :precision="2"
          hide-details="auto"
          variant="underlined"
          prefix="€"
          color="primary"
          label="Price"
        ></v-number-input>
      </v-container>

      <v-container fluid>
        <v-textarea
          v-model="cocktail.description"
          :rules="[requiredRule]"
          label="Description"
        ></v-textarea>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn v-if="cancel" variant="outlined" @click="onCancel">Cancel</v-btn>

        <v-btn
          color="primary"
          variant="flat"
          :loading="submitting"
          :disabled="submitting"
          @click="submitForm"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { reactive, ref } from 'vue';
import { createCocktail } from '@/api/resources/cocktails';

const requiredRule = (value) =>
  (value !== null && value !== undefined && value !== '') ||
  'This field is required.';

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
    const cocktail = reactive({
      title: '',
      price: null,
      description: '',
    });
    const error = ref(null);
    const form = ref(null);
    const submitting = ref(false);

    const submitForm = async () => {
      if (submitting.value) {
        return;
      }
      submitting.value = true;

      if (!(await form.value.validate())) {
        return;
      }
      error.value = null;

      createCocktail(cocktail)
        .then(() => {
          emit('submit', { ...cocktail });
        })
        .catch((err) => {
          error.value = err.message;

          form.value.resetValidation();
        })
        .finally(() => {
          if (!error.value) {
            cocktail.title = '';
            cocktail.price = null;
            cocktail.description = '';
          }
          submitting.value = false;
        });
    };
    const onCancel = () => emit('cancel');

    return {
      form,
      error,
      cocktail,
      requiredRule,
      submitting,
      submitForm,
      onCancel,
    };
  },
};
</script>
