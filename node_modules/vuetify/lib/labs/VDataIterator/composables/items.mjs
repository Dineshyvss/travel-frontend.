// Utilities
import { computed } from 'vue';
import { getPropertyFromItem, propsFactory } from "../../../util/index.mjs"; // Types
// Composables
export const makeDataIteratorItemProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: [String, Array, Function],
    default: 'value'
  },
  returnObject: Boolean
}, 'v-data-iterator-item');
export function transformItem(props, item) {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue);
  return {
    type: 'item',
    value,
    raw: item
  };
}
export function transformItems(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem(props, item));
  }
  return array;
}
export function useDataIteratorItems(props) {
  const items = computed(() => transformItems(props, props.items));
  return {
    items
  };
}
//# sourceMappingURL=items.mjs.map