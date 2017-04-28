<template>
<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Modal header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              Modal body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="form-button-small" @click="$emit('close')">
                <slot name="action">Got it!</slot>
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
    props: ['title', 'message']
};
</script>
