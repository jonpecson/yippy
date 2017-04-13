<template>
<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default message
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="form-button-small" @click="$emit('close')">
                Got it!
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
</transition>
</template>

<script>
export default {
    props: ['name', 'message'],
    showModal: false
};
</script>
