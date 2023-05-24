// Utilities
import { computed } from 'vue';
import { getPropertyFromItem, propsFactory } from "../../../util/index.mjs"; // Types
// Composables
export const makeDataTableItemProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: [String, Array, Function],
    default: 'value'
  },
  returnObject: Boolean
}, 'v-data-table-item');
export function transformItem(props, item, columns) {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue);
  const itemColumns = columns.reduce((obj, column) => {
    obj[column.key] = getPropertyFromItem(item, column.value ?? column.key);
    return obj;
  }, {});
  return {
    type: 'item',
    value,
    columns: itemColumns,
    raw: item
  };
}
export function transformItems(props, items, columns) {
  const array = [];
  for (const item of items) {
    array.push(transformItem(props, item, columns));
  }
  return array;
}
export function useDataTableItems(props, columns) {
  const items = computed(() => transformItems(props, props.items, columns.value));
  return {
    items
  };
}
//# sourceMappingURL=items.mjs.map