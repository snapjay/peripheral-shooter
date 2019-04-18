<template>

    <div>
        <div>{{errors }}</div>
        <div>{{field }}</div>
        <div>{{ errors.first('range-from') }}</div>
        <b-form-invalid-feedback>

        </b-form-invalid-feedback>
    </div>
</template>

<script>
  export default {
    name: 'FormError',
    props: {
      field: String,
    },
  }

</script>
