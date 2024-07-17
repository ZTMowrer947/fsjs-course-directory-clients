import { defineComponent } from 'vue';

/**
 * A wrapper component serving wrapping its contents in a stylable div.
 */
export default defineComponent({
  setup(_, { slots }) {
    return () => <div>{slots.default()}</div>;
  },
});
