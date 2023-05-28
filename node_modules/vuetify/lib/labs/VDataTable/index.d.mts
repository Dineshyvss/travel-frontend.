import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, JSXComponent, PropType, Ref, UnwrapRef, CSSProperties } from 'vue';

interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps<T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T): [yes: Partial<Pick<T, U>>, no: Omit<T, U>];
}

type SelectItemKey = boolean | string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any);

interface LoaderSlotProps {
    color: string | undefined;
    isActive: boolean;
}

type IconValue = string | (string | [path: string, opacity: number])[] | JSXComponent;
declare const IconValue: PropType<IconValue>;

type SortItem = {
    key: string;
    order?: boolean | 'asc' | 'desc';
};
declare function provideSort(options: {
    sortBy: Ref<readonly SortItem[]>;
    mustSort: Ref<boolean>;
    multiSort: Ref<boolean>;
    page?: Ref<number>;
}): {
    sortBy: Ref<readonly SortItem[]>;
    toggleSort: (column: InternalDataTableHeader) => void;
    isSorted: (column: InternalDataTableHeader) => boolean;
};

interface GroupableItem<T = any> {
    type: 'item';
    raw: T;
}
interface Group<T = any> {
    type: 'group';
    depth: number;
    id: string;
    key: string;
    value: any;
    items: readonly (T | Group<T>)[];
}
declare function provideGroupBy(options: {
    groupBy: Ref<readonly SortItem[]>;
    sortBy: Ref<readonly SortItem[]>;
}): {
    sortByWithGroups: vue.ComputedRef<SortItem[]>;
    toggleGroup: (group: Group) => void;
    opened: Ref<Set<string>>;
    groupBy: Ref<readonly SortItem[]>;
    extractRows: <T extends GroupableItem<any>>(items: readonly (T | Group<T>)[]) => T[];
    isGroupOpen: (group: Group) => boolean;
};

type DataTableCompareFunction<T = any> = (a: T, b: T) => number;
type DataTableHeader = {
    key: string;
    value?: SelectItemKey;
    title: string;
    colspan?: number;
    rowspan?: number;
    fixed?: boolean;
    align?: 'start' | 'end';
    width?: number;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean;
    sort?: DataTableCompareFunction;
};
type InternalDataTableHeader = DataTableHeader & {
    sortable: boolean;
    fixedOffset?: number;
    lastFixed?: boolean;
};
interface DataTableItem<T = any> extends GroupableItem<T> {
    value: any;
    columns: {
        [key: string]: any;
    };
}

interface DataTableItemProps {
    items: any[];
    itemValue: SelectItemKey;
    returnObject: boolean;
}

type SelectionProps = Pick<DataTableItemProps, 'itemValue'> & {
    modelValue: readonly any[];
    'onUpdate:modelValue': ((value: any[]) => void) | undefined;
};
declare function provideSelection<T extends DataTableItem>(props: SelectionProps, allItems: Ref<T[]>): {
    toggleSelect: (item: T) => void;
    select: (items: T[], value: boolean) => void;
    selectAll: (value: boolean) => void;
    isSelected: (items: T | T[]) => boolean;
    isSomeSelected: (items: T | T[]) => boolean;
    someSelected: vue.ComputedRef<boolean>;
    allSelected: vue.ComputedRef<boolean>;
};

type HeadersSlotProps = {
    headers: InternalDataTableHeader[][];
    columns: InternalDataTableHeader[];
    sortBy: UnwrapRef<ReturnType<typeof provideSort>['sortBy']>;
    someSelected: UnwrapRef<ReturnType<typeof provideSelection>['someSelected']>;
    allSelected: UnwrapRef<ReturnType<typeof provideSelection>['allSelected']>;
    toggleSort: ReturnType<typeof provideSort>['toggleSort'];
    selectAll: ReturnType<typeof provideSelection>['selectAll'];
    getSortIcon: (column: InternalDataTableHeader) => IconValue;
    getFixedStyles: (column: InternalDataTableHeader, y: number) => CSSProperties | undefined;
    isSorted: ReturnType<typeof provideSort>['isSorted'];
};

/**
 * - match without highlight
 * - single match (index), length already known
 * - single match (start, end)
 * - multiple matches (start, end), probably shouldn't overlap
 */
type FilterMatch = boolean | number | [number, number] | [number, number][];
type FilterFunction = (value: string, query: string, item?: any) => FilterMatch;
type FilterKeyFunctions = Record<string, FilterFunction>;
type FilterKeys = string | string[];
type FilterMode = 'some' | 'every' | 'union' | 'intersection';

type Density = null | 'default' | 'comfortable' | 'compact';

declare function providePagination(options: {
    page: Ref<number>;
    itemsPerPage: Ref<number>;
    itemsLength: Ref<number>;
}): {
    page: Ref<number>;
    itemsPerPage: Ref<number>;
    startIndex: vue.ComputedRef<number>;
    stopIndex: vue.ComputedRef<number>;
    pageCount: vue.ComputedRef<number>;
    itemsLength: Ref<number>;
    nextPage: () => void;
    prevPage: () => void;
    setPage: (value: number) => void;
    setItemsPerPage: (value: number) => void;
};

type ExpandProps = {
    expandOnClick: boolean;
    expanded: readonly string[];
    'onUpdate:expanded': ((value: any[]) => void) | undefined;
};
declare function provideExpanded(props: ExpandProps): {
    expand: (item: DataTableItem, value: boolean) => void;
    expanded: Ref<Set<string>> & {
        readonly externalValue: readonly string[];
    };
    expandOnClick: Ref<boolean>;
    isExpanded: (item: DataTableItem) => boolean;
    toggleExpand: (item: DataTableItem) => void;
};

type GroupHeaderSlot = {
    index: number;
    item: Group;
    columns: InternalDataTableHeader[];
    isExpanded: ReturnType<typeof provideExpanded>['isExpanded'];
    toggleExpand: ReturnType<typeof provideExpanded>['toggleExpand'];
    isSelected: ReturnType<typeof provideSelection>['isSelected'];
    toggleSelect: ReturnType<typeof provideSelection>['toggleSelect'];
    toggleGroup: ReturnType<typeof provideGroupBy>['toggleGroup'];
    isGroupOpen: ReturnType<typeof provideGroupBy>['toggleGroup'];
};
type ItemSlot = {
    index: number;
    item: DataTableItem;
    columns: InternalDataTableHeader[];
    isExpanded: ReturnType<typeof provideExpanded>['isExpanded'];
    toggleExpand: ReturnType<typeof provideExpanded>['toggleExpand'];
    isSelected: ReturnType<typeof provideSelection>['isSelected'];
    toggleSelect: ReturnType<typeof provideSelection>['toggleSelect'];
};
declare const VDataTableRows: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: {
            [x: `v-slot:item.${string}`]: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            noDataText?: string | undefined;
            loadingText?: string | undefined;
            items?: readonly (Group<any> | DataTableItem<any>)[] | undefined;
            hideNoData?: boolean | undefined;
            key?: string | number | symbol | undefined;
            loading?: string | boolean | undefined;
            style?: unknown;
            class?: unknown;
            $children?: {} | vue.VNodeChild | {
                [x: `item.${string}`]: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            };
            ref?: vue.VNodeRef | undefined;
            ref_for?: boolean | undefined;
            ref_key?: string | undefined;
            'v-slots'?: {
                [x: `item.${string}`]: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'data-table-group'?: false | ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: false | ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                loading?: false | (() => vue.VNodeChild) | undefined;
                'group-header'?: false | ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
                'no-data'?: false | (() => vue.VNodeChild) | undefined;
                'expanded-row'?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            $slots?: {
                [x: `item.${string}`]: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            onVnodeBeforeMount?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeMounted?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUpdate?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUpdated?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUnmount?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUnmounted?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            "v-slot:item"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:data-table-group"?: false | ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:data-table-select"?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            rowHeight?: number | undefined;
            'onClick:row'?: ((e: Event, value: {
                item: DataTableItem;
            }) => void) | undefined;
            "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:group-header"?: false | ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
            "v-slot:expanded-row"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        };
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [x: `item.${string}`]: ((args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'data-table-group'?: ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'data-table-select'?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            item?: ((args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            loading?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'group-header'?: ((args_0: GroupHeaderSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'no-data'?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'expanded-row'?: ((args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'item.data-table-select'?: ((args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'item.data-table-expand'?: ((args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<{
            noDataText: string;
            loadingText: string;
            items: readonly (Group<any> | DataTableItem<any>)[];
            hideNoData: boolean;
        } & {
            loading?: string | boolean | undefined;
            rowHeight?: number | undefined;
            'onClick:row'?: ((e: Event, value: {
                item: DataTableItem;
            }) => void) | undefined;
        } & {
            $children?: {} | vue.VNodeChild | {
                [x: `item.${string}`]: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                [x: `item.${string}`]: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'data-table-group'?: false | ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: false | ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                loading?: false | (() => vue.VNodeChild) | undefined;
                'group-header'?: false | ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
                'no-data'?: false | (() => vue.VNodeChild) | undefined;
                'expanded-row'?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            [x: `v-slot:item.${string}`]: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            "v-slot:data-table-group"?: false | ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:data-table-select"?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:item"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:group-header"?: false | ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
            "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:expanded-row"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            "v-slot:item.data-table-select"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            "v-slot:item.data-table-expand"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        } & {
            $slots?: {
                [x: `item.${string}`]: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            } | undefined;
        }, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
            noDataText: string;
            loadingText: string;
            items: readonly (Group<any> | DataTableItem<any>)[];
            hideNoData: boolean;
        }, {}, string, vue.SlotsType<Partial<{
            [x: `item.${string}`]: (args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'data-table-group': (args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'data-table-select': (args_0: {
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            item: (args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            loading: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'group-header': (args_0: GroupHeaderSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'no-data': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'expanded-row': (args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'item.data-table-select': (args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'item.data-table-expand': (args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
        }>>> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & {
        noDataText: string;
        loadingText: string;
        items: readonly (Group<any> | DataTableItem<any>)[];
        hideNoData: boolean;
    } & {
        loading?: string | boolean | undefined;
        rowHeight?: number | undefined;
        'onClick:row'?: ((e: Event, value: {
            item: DataTableItem;
        }) => void) | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            [x: `item.${string}`]: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            'data-table-group'?: ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            'data-table-select'?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            loading?: (() => vue.VNodeChild) | undefined;
            'group-header'?: ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
            'expanded-row'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            'item.data-table-select'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            'item.data-table-expand'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            [x: `item.${string}`]: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            'data-table-group'?: false | ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            'data-table-select'?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            loading?: false | (() => vue.VNodeChild) | undefined;
            'group-header'?: false | ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
            'no-data'?: false | (() => vue.VNodeChild) | undefined;
            'expanded-row'?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            'item.data-table-select'?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            'item.data-table-expand'?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        [x: `v-slot:item.${string}`]: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        "v-slot:data-table-group"?: false | ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:data-table-select"?: false | ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:item"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:group-header"?: false | ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
        "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:expanded-row"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        "v-slot:item.data-table-select"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        "v-slot:item.data-table-expand"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
    } & {
        $slots?: {
            [x: `item.${string}`]: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            'data-table-group'?: ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            'data-table-select'?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            loading?: (() => vue.VNodeChild) | undefined;
            'group-header'?: ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
            'expanded-row'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            'item.data-table-select'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
            'item.data-table-expand'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & vue.ShallowUnwrapRef<{}> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    noDataText: string;
    loadingText: string;
    items: readonly (Group<any> | DataTableItem<any>)[];
    hideNoData: boolean;
} & {
    loading?: string | boolean | undefined;
    rowHeight?: number | undefined;
    'onClick:row'?: ((e: Event, value: {
        item: DataTableItem;
    }) => void) | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        [x: `item.${string}`]: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        'data-table-group'?: ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        'data-table-select'?: ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        item?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        loading?: (() => vue.VNodeChild) | undefined;
        'group-header'?: ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
        'no-data'?: (() => vue.VNodeChild) | undefined;
        'expanded-row'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        'item.data-table-select'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        'item.data-table-expand'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        [x: `item.${string}`]: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        'data-table-group'?: false | ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        'data-table-select'?: false | ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        item?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        loading?: false | (() => vue.VNodeChild) | undefined;
        'group-header'?: false | ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
        'no-data'?: false | (() => vue.VNodeChild) | undefined;
        'expanded-row'?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        'item.data-table-select'?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        'item.data-table-expand'?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    [x: `v-slot:item.${string}`]: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
    "v-slot:data-table-group"?: false | ((args_0: {
        item: Group<any>;
        count: number;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:data-table-select"?: false | ((args_0: {
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:item"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
    "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:group-header"?: false | ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
    "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:expanded-row"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
    "v-slot:item.data-table-select"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
    "v-slot:item.data-table-expand"?: false | ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
} & {
    $slots?: {
        [x: `item.${string}`]: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        'data-table-group'?: ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        'data-table-select'?: ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        item?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        loading?: (() => vue.VNodeChild) | undefined;
        'group-header'?: ((args_0: GroupHeaderSlot) => vue.VNodeChild) | undefined;
        'no-data'?: (() => vue.VNodeChild) | undefined;
        'expanded-row'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        'item.data-table-select'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
        'item.data-table-expand'?: ((args_0: ItemSlot) => vue.VNodeChild) | undefined;
    } | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
    noDataText: string;
    loadingText: string;
    items: readonly (Group<any> | DataTableItem<any>)[];
    hideNoData: boolean;
}, {}, string, vue.SlotsType<Partial<{
    [x: `item.${string}`]: (args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'data-table-group': (args_0: {
        item: Group<any>;
        count: number;
        props: Record<string, unknown>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'data-table-select': (args_0: {
        props: Record<string, unknown>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    item: (args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    loading: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'group-header': (args_0: GroupHeaderSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'no-data': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'expanded-row': (args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'item.data-table-select': (args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'item.data-table-expand': (args_0: ItemSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    loading: (StringConstructor | BooleanConstructor)[];
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    hideNoData: BooleanConstructor;
    items: {
        type: PropType<readonly (Group<any> | DataTableItem<any>)[]>;
        default: () => never[];
    };
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    rowHeight: NumberConstructor;
    'onClick:row': PropType<(e: Event, value: {
        item: DataTableItem;
    }) => void>;
}, vue.ExtractPropTypes<{
    loading: (StringConstructor | BooleanConstructor)[];
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    hideNoData: BooleanConstructor;
    items: {
        type: PropType<readonly (Group<any> | DataTableItem<any>)[]>;
        default: () => never[];
    };
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    rowHeight: NumberConstructor;
    'onClick:row': PropType<(e: Event, value: {
        item: DataTableItem;
    }) => void>;
}>>;
type VDataTableRows = InstanceType<typeof VDataTableRows>;

type VDataTableSlotProps = {
    page: number;
    itemsPerPage: number;
    sortBy: UnwrapRef<ReturnType<typeof provideSort>['sortBy']>;
    pageCount: number;
    toggleSort: ReturnType<typeof provideSort>['toggleSort'];
    setItemsPerPage: ReturnType<typeof providePagination>['setItemsPerPage'];
    someSelected: boolean;
    allSelected: boolean;
    isSelected: ReturnType<typeof provideSelection>['isSelected'];
    select: ReturnType<typeof provideSelection>['select'];
    selectAll: ReturnType<typeof provideSelection>['selectAll'];
    toggleSelect: ReturnType<typeof provideSelection>['toggleSelect'];
    isExpanded: ReturnType<typeof provideExpanded>['isExpanded'];
    toggleExpand: ReturnType<typeof provideExpanded>['toggleExpand'];
    isGroupOpen: ReturnType<typeof provideGroupBy>['isGroupOpen'];
    toggleGroup: ReturnType<typeof provideGroupBy>['toggleGroup'];
    items: readonly DataTableItem[];
    groupedItems: readonly (DataTableItem | Group<DataTableItem>)[];
    columns: InternalDataTableHeader[];
    headers: InternalDataTableHeader[][];
};
declare const VDataTable: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: {
            [x: `v-slot:column.${string}`]: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            [x: `v-slot:item.${string}`]: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            style?: vue.StyleValue | undefined;
            expanded?: readonly string[] | undefined;
            tag?: string | undefined;
            page?: string | number | undefined;
            sticky?: boolean | undefined;
            headers?: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]> | undefined;
            noDataText?: string | undefined;
            loadingText?: string | undefined;
            itemsPerPageText?: string | undefined;
            sortBy?: readonly SortItem[] | undefined;
            pageText?: string | undefined;
            items?: any[] | undefined;
            density?: Density | undefined;
            modelValue?: readonly any[] | undefined;
            itemValue?: SelectItemKey | undefined;
            returnObject?: boolean | undefined;
            hideNoData?: boolean | undefined;
            filterMode?: FilterMode | undefined;
            noFilter?: boolean | undefined;
            hover?: boolean | undefined;
            nextIcon?: string | undefined;
            prevIcon?: string | undefined;
            firstIcon?: string | undefined;
            lastIcon?: string | undefined;
            fixedHeader?: boolean | undefined;
            fixedFooter?: boolean | undefined;
            multiSort?: boolean | undefined;
            mustSort?: boolean | undefined;
            groupBy?: readonly SortItem[] | undefined;
            itemsPerPage?: string | number | undefined;
            expandOnClick?: boolean | undefined;
            showExpand?: boolean | undefined;
            showSelect?: boolean | undefined;
            firstPageLabel?: string | undefined;
            prevPageLabel?: string | undefined;
            nextPageLabel?: string | undefined;
            lastPageLabel?: string | undefined;
            itemsPerPageOptions?: readonly {
                title: string;
                value: number;
            }[] | undefined;
            showCurrentPage?: boolean | undefined;
            sortAscIcon?: IconValue | undefined;
            sortDescIcon?: IconValue | undefined;
            search?: string | undefined;
            key?: string | number | symbol | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            color?: string | undefined;
            loading?: string | boolean | undefined;
            class?: any;
            $children?: vue.VNodeChild | {
                [x: `item.${string}`]: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                'footer.prepend'?: (() => vue.VNodeChild) | undefined;
            } | ((args_0: VDataTableSlotProps) => vue.VNodeChild);
            ref?: vue.VNodeRef | undefined;
            ref_for?: boolean | undefined;
            ref_key?: string | undefined;
            theme?: string | undefined;
            "v-slot:default"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            'v-slots'?: {
                [x: `item.${string}`]: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: false | ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: false | ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: false | (() => vue.VNodeChild) | undefined;
                'group-header'?: false | ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: false | (() => vue.VNodeChild) | undefined;
                'expanded-row'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                default?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                colgroup?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                top?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                body?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tbody?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                thead?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tfoot?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                bottom?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                'footer.prepend'?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
            $slots?: {
                [x: `item.${string}`]: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                'footer.prepend'?: (() => vue.VNodeChild) | undefined;
            } | undefined;
            onVnodeBeforeMount?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeMounted?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUpdate?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUpdated?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUnmount?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUnmounted?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
            "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:item"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
            customFilter?: FilterFunction | undefined;
            customKeyFilter?: FilterKeyFunctions | undefined;
            filterKeys?: FilterKeys | undefined;
            "v-slot:top"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:bottom"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            customKeySort?: Record<string, DataTableCompareFunction> | undefined;
            "onUpdate:sortBy"?: ((value: any) => any) | undefined;
            "onUpdate:groupBy"?: ((value: any) => any) | undefined;
            "onUpdate:page"?: ((value: number) => any) | undefined;
            "onUpdate:itemsPerPage"?: ((value: number) => any) | undefined;
            "onUpdate:expanded"?: ((value: any) => any) | undefined;
            "onUpdate:options"?: ((value: any) => any) | undefined;
            "v-slot:headers"?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:data-table-group"?: false | ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:data-table-select"?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            rowHeight?: number | undefined;
            'onClick:row'?: ((e: Event, value: {
                item: DataTableItem<any>;
            }) => void) | undefined;
            "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:group-header"?: false | ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:expanded-row"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:body"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:colgroup"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:tbody"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:tfoot"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:thead"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:footer.prepend"?: false | (() => vue.VNodeChild) | undefined;
        };
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [x: `item.${string}`]: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            [x: `column.${string}`]: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'data-table-group'?: ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'data-table-select'?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            item?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            loading?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'group-header'?: ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'no-data'?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'expanded-row'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'item.data-table-select'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'item.data-table-expand'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            headers?: ((args_0: HeadersSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'column.data-table-select'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'column.data-table-expand'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            default?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            colgroup?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            top?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            body?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            tbody?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            thead?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            tfoot?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            bottom?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'footer.prepend'?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: ((event: "update:modelValue", value: any[]) => void) & ((event: "update:options", value: any) => void) & ((event: "update:groupBy", value: any) => void) & ((event: "update:page", value: number) => void) & ((event: "update:itemsPerPage", value: number) => void) & ((event: "update:sortBy", value: any) => void) & ((event: "update:expanded", value: any) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<{
            style: vue.StyleValue;
            expanded: readonly string[];
            tag: string;
            page: string | number;
            sticky: boolean;
            headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
            noDataText: string;
            loadingText: string;
            itemsPerPageText: string;
            sortBy: readonly SortItem[];
            pageText: string;
            items: any[];
            density: Density;
            modelValue: readonly any[];
            itemValue: SelectItemKey;
            returnObject: boolean;
            hideNoData: boolean;
            filterMode: FilterMode;
            noFilter: boolean;
            hover: boolean;
            nextIcon: string;
            prevIcon: string;
            firstIcon: string;
            lastIcon: string;
            fixedHeader: boolean;
            fixedFooter: boolean;
            multiSort: boolean;
            mustSort: boolean;
            groupBy: readonly SortItem[];
            itemsPerPage: string | number;
            expandOnClick: boolean;
            showExpand: boolean;
            showSelect: boolean;
            firstPageLabel: string;
            prevPageLabel: string;
            nextPageLabel: string;
            lastPageLabel: string;
            itemsPerPageOptions: readonly {
                title: string;
                value: number;
            }[];
            showCurrentPage: boolean;
            sortAscIcon: IconValue;
            sortDescIcon: IconValue;
        } & {
            search?: string | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            color?: string | undefined;
            loading?: string | boolean | undefined;
            class?: any;
            theme?: string | undefined;
            customFilter?: FilterFunction | undefined;
            customKeyFilter?: FilterKeyFunctions | undefined;
            filterKeys?: FilterKeys | undefined;
            customKeySort?: Record<string, DataTableCompareFunction> | undefined;
            rowHeight?: number | undefined;
            'onClick:row'?: ((e: Event, value: {
                item: DataTableItem<any>;
            }) => void) | undefined;
        } & {
            $children?: vue.VNodeChild | {
                [x: `item.${string}`]: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                'footer.prepend'?: (() => vue.VNodeChild) | undefined;
            } | ((args_0: VDataTableSlotProps) => vue.VNodeChild);
            'v-slots'?: {
                [x: `item.${string}`]: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: false | ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: false | ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: false | (() => vue.VNodeChild) | undefined;
                'group-header'?: false | ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: false | (() => vue.VNodeChild) | undefined;
                'expanded-row'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                default?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                colgroup?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                top?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                body?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tbody?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                thead?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tfoot?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                bottom?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                'footer.prepend'?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            [x: `v-slot:item.${string}`]: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            [x: `v-slot:column.${string}`]: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            "v-slot:data-table-group"?: false | ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:data-table-select"?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:item"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:group-header"?: false | ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:expanded-row"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:item.data-table-select"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:item.data-table-expand"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:headers"?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:column.data-table-select"?: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            "v-slot:column.data-table-expand"?: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            "v-slot:default"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:colgroup"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:top"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:body"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:tbody"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:thead"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:tfoot"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:bottom"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:footer.prepend"?: false | (() => vue.VNodeChild) | undefined;
        } & {
            $slots?: {
                [x: `item.${string}`]: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                'footer.prepend'?: (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
            "onUpdate:sortBy"?: ((value: any) => any) | undefined;
            "onUpdate:groupBy"?: ((value: any) => any) | undefined;
            "onUpdate:page"?: ((value: number) => any) | undefined;
            "onUpdate:itemsPerPage"?: ((value: number) => any) | undefined;
            "onUpdate:expanded"?: ((value: any) => any) | undefined;
            "onUpdate:options"?: ((value: any) => any) | undefined;
        }, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'update:modelValue': (value: any[]) => true;
            'update:page': (value: number) => true;
            'update:itemsPerPage': (value: number) => true;
            'update:sortBy': (value: any) => true;
            'update:options': (value: any) => true;
            'update:groupBy': (value: any) => true;
            'update:expanded': (value: any) => true;
        }, string, {
            style: vue.StyleValue;
            expanded: readonly string[];
            tag: string;
            page: string | number;
            sticky: boolean;
            headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
            noDataText: string;
            loadingText: string;
            itemsPerPageText: string;
            sortBy: readonly SortItem[];
            pageText: string;
            items: any[];
            density: Density;
            modelValue: readonly any[];
            itemValue: SelectItemKey;
            returnObject: boolean;
            hideNoData: boolean;
            filterMode: FilterMode;
            noFilter: boolean;
            hover: boolean;
            nextIcon: string;
            prevIcon: string;
            firstIcon: string;
            lastIcon: string;
            fixedHeader: boolean;
            fixedFooter: boolean;
            multiSort: boolean;
            mustSort: boolean;
            groupBy: readonly SortItem[];
            itemsPerPage: string | number;
            expandOnClick: boolean;
            showExpand: boolean;
            showSelect: boolean;
            firstPageLabel: string;
            prevPageLabel: string;
            nextPageLabel: string;
            lastPageLabel: string;
            itemsPerPageOptions: readonly {
                title: string;
                value: number;
            }[];
            showCurrentPage: boolean;
            sortAscIcon: IconValue;
            sortDescIcon: IconValue;
        }, {}, string, vue.SlotsType<Partial<{
            [x: `item.${string}`]: (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            [x: `column.${string}`]: (args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'data-table-group': (args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'data-table-select': (args_0: {
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            item: (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            loading: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'group-header': (args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'no-data': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'expanded-row': (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'item.data-table-select': (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'item.data-table-expand': (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            headers: (args_0: HeadersSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            loader: (args_0: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'column.data-table-select': (args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'column.data-table-expand': (args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            default: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            colgroup: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            top: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            body: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            tbody: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            thead: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            tfoot: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            bottom: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'footer.prepend': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
        }>>> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & {
        style: vue.StyleValue;
        expanded: readonly string[];
        tag: string;
        page: string | number;
        sticky: boolean;
        headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
        noDataText: string;
        loadingText: string;
        itemsPerPageText: string;
        sortBy: readonly SortItem[];
        pageText: string;
        items: any[];
        density: Density;
        modelValue: readonly any[];
        itemValue: SelectItemKey;
        returnObject: boolean;
        hideNoData: boolean;
        filterMode: FilterMode;
        noFilter: boolean;
        hover: boolean;
        nextIcon: string;
        prevIcon: string;
        firstIcon: string;
        lastIcon: string;
        fixedHeader: boolean;
        fixedFooter: boolean;
        multiSort: boolean;
        mustSort: boolean;
        groupBy: readonly SortItem[];
        itemsPerPage: string | number;
        expandOnClick: boolean;
        showExpand: boolean;
        showSelect: boolean;
        firstPageLabel: string;
        prevPageLabel: string;
        nextPageLabel: string;
        lastPageLabel: string;
        itemsPerPageOptions: readonly {
            title: string;
            value: number;
        }[];
        showCurrentPage: boolean;
        sortAscIcon: IconValue;
        sortDescIcon: IconValue;
    } & {
        search?: string | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        color?: string | undefined;
        loading?: string | boolean | undefined;
        class?: any;
        theme?: string | undefined;
        customFilter?: FilterFunction | undefined;
        customKeyFilter?: FilterKeyFunctions | undefined;
        filterKeys?: FilterKeys | undefined;
        customKeySort?: Record<string, DataTableCompareFunction> | undefined;
        rowHeight?: number | undefined;
        'onClick:row'?: ((e: Event, value: {
            item: DataTableItem<any>;
        }) => void) | undefined;
    } & {
        $children?: vue.VNodeChild | {
            [x: `item.${string}`]: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            [x: `column.${string}`]: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'data-table-group'?: ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            'data-table-select'?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            loading?: (() => vue.VNodeChild) | undefined;
            'group-header'?: ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
            'expanded-row'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-select'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-expand'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'column.data-table-select'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'column.data-table-expand'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            'footer.prepend'?: (() => vue.VNodeChild) | undefined;
        } | ((args_0: VDataTableSlotProps) => vue.VNodeChild);
        'v-slots'?: {
            [x: `item.${string}`]: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            [x: `column.${string}`]: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'data-table-group'?: false | ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            'data-table-select'?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            loading?: false | (() => vue.VNodeChild) | undefined;
            'group-header'?: false | ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'no-data'?: false | (() => vue.VNodeChild) | undefined;
            'expanded-row'?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-select'?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-expand'?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            headers?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'column.data-table-select'?: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'column.data-table-expand'?: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            default?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            colgroup?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            top?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            body?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            tbody?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            thead?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            tfoot?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            bottom?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            'footer.prepend'?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        [x: `v-slot:item.${string}`]: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        [x: `v-slot:column.${string}`]: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        "v-slot:data-table-group"?: false | ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:data-table-select"?: false | ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:item"?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:group-header"?: false | ((args_0: {
            index: number;
            item: Group<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
            toggleGroup: (group: Group<any>) => void;
            isGroupOpen: (group: Group<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:expanded-row"?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:item.data-table-select"?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:item.data-table-expand"?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:headers"?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:column.data-table-select"?: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        "v-slot:column.data-table-expand"?: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        "v-slot:default"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:colgroup"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:top"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:body"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:tbody"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:thead"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:tfoot"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:bottom"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:footer.prepend"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        $slots?: {
            [x: `item.${string}`]: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            [x: `column.${string}`]: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'data-table-group'?: ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            'data-table-select'?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            loading?: (() => vue.VNodeChild) | undefined;
            'group-header'?: ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
            'expanded-row'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-select'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-expand'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'column.data-table-select'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'column.data-table-expand'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            'footer.prepend'?: (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
        "onUpdate:sortBy"?: ((value: any) => any) | undefined;
        "onUpdate:groupBy"?: ((value: any) => any) | undefined;
        "onUpdate:page"?: ((value: number) => any) | undefined;
        "onUpdate:itemsPerPage"?: ((value: number) => any) | undefined;
        "onUpdate:expanded"?: ((value: any) => any) | undefined;
        "onUpdate:options"?: ((value: any) => any) | undefined;
    } & vue.ShallowUnwrapRef<{}> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    style: vue.StyleValue;
    expanded: readonly string[];
    tag: string;
    page: string | number;
    sticky: boolean;
    headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
    noDataText: string;
    loadingText: string;
    itemsPerPageText: string;
    sortBy: readonly SortItem[];
    pageText: string;
    items: any[];
    density: Density;
    modelValue: readonly any[];
    itemValue: SelectItemKey;
    returnObject: boolean;
    hideNoData: boolean;
    filterMode: FilterMode;
    noFilter: boolean;
    hover: boolean;
    nextIcon: string;
    prevIcon: string;
    firstIcon: string;
    lastIcon: string;
    fixedHeader: boolean;
    fixedFooter: boolean;
    multiSort: boolean;
    mustSort: boolean;
    groupBy: readonly SortItem[];
    itemsPerPage: string | number;
    expandOnClick: boolean;
    showExpand: boolean;
    showSelect: boolean;
    firstPageLabel: string;
    prevPageLabel: string;
    nextPageLabel: string;
    lastPageLabel: string;
    itemsPerPageOptions: readonly {
        title: string;
        value: number;
    }[];
    showCurrentPage: boolean;
    sortAscIcon: IconValue;
    sortDescIcon: IconValue;
} & {
    search?: string | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    color?: string | undefined;
    loading?: string | boolean | undefined;
    class?: any;
    theme?: string | undefined;
    customFilter?: FilterFunction | undefined;
    customKeyFilter?: FilterKeyFunctions | undefined;
    filterKeys?: FilterKeys | undefined;
    customKeySort?: Record<string, DataTableCompareFunction> | undefined;
    rowHeight?: number | undefined;
    'onClick:row'?: ((e: Event, value: {
        item: DataTableItem<any>;
    }) => void) | undefined;
} & {
    $children?: vue.VNodeChild | {
        [x: `item.${string}`]: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        [x: `column.${string}`]: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'data-table-group'?: ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        'data-table-select'?: ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        item?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        loading?: (() => vue.VNodeChild) | undefined;
        'group-header'?: ((args_0: {
            index: number;
            item: Group<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
            toggleGroup: (group: Group<any>) => void;
            isGroupOpen: (group: Group<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'no-data'?: (() => vue.VNodeChild) | undefined;
        'expanded-row'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-select'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-expand'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'column.data-table-select'?: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'column.data-table-expand'?: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        'footer.prepend'?: (() => vue.VNodeChild) | undefined;
    } | ((args_0: VDataTableSlotProps) => vue.VNodeChild);
    'v-slots'?: {
        [x: `item.${string}`]: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        [x: `column.${string}`]: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'data-table-group'?: false | ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        'data-table-select'?: false | ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        item?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        loading?: false | (() => vue.VNodeChild) | undefined;
        'group-header'?: false | ((args_0: {
            index: number;
            item: Group<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
            toggleGroup: (group: Group<any>) => void;
            isGroupOpen: (group: Group<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'no-data'?: false | (() => vue.VNodeChild) | undefined;
        'expanded-row'?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-select'?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-expand'?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        headers?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
        loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'column.data-table-select'?: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'column.data-table-expand'?: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        default?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        colgroup?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        top?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        body?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        tbody?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        thead?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        tfoot?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        bottom?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        'footer.prepend'?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    [x: `v-slot:item.${string}`]: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    [x: `v-slot:column.${string}`]: false | ((args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNodeChild) | undefined;
    "v-slot:data-table-group"?: false | ((args_0: {
        item: Group<any>;
        count: number;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:data-table-select"?: false | ((args_0: {
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:item"?: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:group-header"?: false | ((args_0: {
        index: number;
        item: Group<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
        toggleGroup: (group: Group<any>) => void;
        isGroupOpen: (group: Group<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:expanded-row"?: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:item.data-table-select"?: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:item.data-table-expand"?: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:headers"?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:column.data-table-select"?: false | ((args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNodeChild) | undefined;
    "v-slot:column.data-table-expand"?: false | ((args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNodeChild) | undefined;
    "v-slot:default"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:colgroup"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:top"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:body"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:tbody"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:thead"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:tfoot"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:bottom"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:footer.prepend"?: false | (() => vue.VNodeChild) | undefined;
} & {
    $slots?: {
        [x: `item.${string}`]: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        [x: `column.${string}`]: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'data-table-group'?: ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        'data-table-select'?: ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        item?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        loading?: (() => vue.VNodeChild) | undefined;
        'group-header'?: ((args_0: {
            index: number;
            item: Group<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
            toggleGroup: (group: Group<any>) => void;
            isGroupOpen: (group: Group<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'no-data'?: (() => vue.VNodeChild) | undefined;
        'expanded-row'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-select'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-expand'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'column.data-table-select'?: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'column.data-table-expand'?: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        'footer.prepend'?: (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
    "onUpdate:sortBy"?: ((value: any) => any) | undefined;
    "onUpdate:groupBy"?: ((value: any) => any) | undefined;
    "onUpdate:page"?: ((value: number) => any) | undefined;
    "onUpdate:itemsPerPage"?: ((value: number) => any) | undefined;
    "onUpdate:expanded"?: ((value: any) => any) | undefined;
    "onUpdate:options"?: ((value: any) => any) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any[]) => true;
    'update:page': (value: number) => true;
    'update:itemsPerPage': (value: number) => true;
    'update:sortBy': (value: any) => true;
    'update:options': (value: any) => true;
    'update:groupBy': (value: any) => true;
    'update:expanded': (value: any) => true;
}, string, {
    style: vue.StyleValue;
    expanded: readonly string[];
    tag: string;
    page: string | number;
    sticky: boolean;
    headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
    noDataText: string;
    loadingText: string;
    itemsPerPageText: string;
    sortBy: readonly SortItem[];
    pageText: string;
    items: any[];
    density: Density;
    modelValue: readonly any[];
    itemValue: SelectItemKey;
    returnObject: boolean;
    hideNoData: boolean;
    filterMode: FilterMode;
    noFilter: boolean;
    hover: boolean;
    nextIcon: string;
    prevIcon: string;
    firstIcon: string;
    lastIcon: string;
    fixedHeader: boolean;
    fixedFooter: boolean;
    multiSort: boolean;
    mustSort: boolean;
    groupBy: readonly SortItem[];
    itemsPerPage: string | number;
    expandOnClick: boolean;
    showExpand: boolean;
    showSelect: boolean;
    firstPageLabel: string;
    prevPageLabel: string;
    nextPageLabel: string;
    lastPageLabel: string;
    itemsPerPageOptions: readonly {
        title: string;
        value: number;
    }[];
    showCurrentPage: boolean;
    sortAscIcon: IconValue;
    sortDescIcon: IconValue;
}, {}, string, vue.SlotsType<Partial<{
    [x: `item.${string}`]: (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    [x: `column.${string}`]: (args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'data-table-group': (args_0: {
        item: Group<any>;
        count: number;
        props: Record<string, unknown>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'data-table-select': (args_0: {
        props: Record<string, unknown>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    item: (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    loading: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'group-header': (args_0: {
        index: number;
        item: Group<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
        toggleGroup: (group: Group<any>) => void;
        isGroupOpen: (group: Group<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'no-data': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'expanded-row': (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'item.data-table-select': (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'item.data-table-expand': (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    headers: (args_0: HeadersSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    loader: (args_0: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'column.data-table-select': (args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'column.data-table-expand': (args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    default: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    colgroup: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    top: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    body: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    tbody: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    thead: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    tfoot: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    bottom: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'footer.prepend': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    prevIcon: {
        type: StringConstructor;
        default: string;
    };
    nextIcon: {
        type: StringConstructor;
        default: string;
    };
    firstIcon: {
        type: StringConstructor;
        default: string;
    };
    lastIcon: {
        type: StringConstructor;
        default: string;
    };
    itemsPerPageText: {
        type: StringConstructor;
        default: string;
    };
    pageText: {
        type: StringConstructor;
        default: string;
    };
    firstPageLabel: {
        type: StringConstructor;
        default: string;
    };
    prevPageLabel: {
        type: StringConstructor;
        default: string;
    };
    nextPageLabel: {
        type: StringConstructor;
        default: string;
    };
    lastPageLabel: {
        type: StringConstructor;
        default: string;
    };
    itemsPerPageOptions: {
        type: vue.PropType<readonly {
            title: string;
            value: number;
        }[]>;
        default: () => {
            value: number;
            title: string;
        }[];
    };
    showCurrentPage: BooleanConstructor;
    customFilter: vue.PropType<FilterFunction>;
    customKeyFilter: vue.PropType<FilterKeyFunctions>;
    filterKeys: vue.PropType<FilterKeys>;
    filterMode: {
        type: vue.PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    height: (StringConstructor | NumberConstructor)[];
    hover: BooleanConstructor;
    loading: (StringConstructor | BooleanConstructor)[];
    color: StringConstructor;
    sticky: BooleanConstructor;
    multiSort: BooleanConstructor;
    sortAscIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    sortDescIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    sortBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    customKeySort: vue.PropType<Record<string, DataTableCompareFunction>>;
    mustSort: BooleanConstructor;
    showSelect: BooleanConstructor;
    modelValue: {
        type: vue.PropType<readonly any[]>;
        default: () => never[];
    };
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemValue: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    headers: {
        type: vue.PropType<vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>>;
        default: () => never[];
    };
    groupBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    expandOnClick: BooleanConstructor;
    showExpand: BooleanConstructor;
    expanded: {
        type: vue.PropType<readonly string[]>;
        default: () => never[];
    };
    width: (StringConstructor | NumberConstructor)[];
    search: StringConstructor;
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    hideNoData: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    rowHeight: NumberConstructor;
    'onClick:row': vue.PropType<(e: Event, value: {
        item: DataTableItem<any>;
    }) => void>;
    page: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemsPerPage: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, vue.ExtractPropTypes<{
    prevIcon: {
        type: StringConstructor;
        default: string;
    };
    nextIcon: {
        type: StringConstructor;
        default: string;
    };
    firstIcon: {
        type: StringConstructor;
        default: string;
    };
    lastIcon: {
        type: StringConstructor;
        default: string;
    };
    itemsPerPageText: {
        type: StringConstructor;
        default: string;
    };
    pageText: {
        type: StringConstructor;
        default: string;
    };
    firstPageLabel: {
        type: StringConstructor;
        default: string;
    };
    prevPageLabel: {
        type: StringConstructor;
        default: string;
    };
    nextPageLabel: {
        type: StringConstructor;
        default: string;
    };
    lastPageLabel: {
        type: StringConstructor;
        default: string;
    };
    itemsPerPageOptions: {
        type: vue.PropType<readonly {
            title: string;
            value: number;
        }[]>;
        default: () => {
            value: number;
            title: string;
        }[];
    };
    showCurrentPage: BooleanConstructor;
    customFilter: vue.PropType<FilterFunction>;
    customKeyFilter: vue.PropType<FilterKeyFunctions>;
    filterKeys: vue.PropType<FilterKeys>;
    filterMode: {
        type: vue.PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    height: (StringConstructor | NumberConstructor)[];
    hover: BooleanConstructor;
    loading: (StringConstructor | BooleanConstructor)[];
    color: StringConstructor;
    sticky: BooleanConstructor;
    multiSort: BooleanConstructor;
    sortAscIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    sortDescIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    sortBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    customKeySort: vue.PropType<Record<string, DataTableCompareFunction>>;
    mustSort: BooleanConstructor;
    showSelect: BooleanConstructor;
    modelValue: {
        type: vue.PropType<readonly any[]>;
        default: () => never[];
    };
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemValue: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    headers: {
        type: vue.PropType<vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>>;
        default: () => never[];
    };
    groupBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    expandOnClick: BooleanConstructor;
    showExpand: BooleanConstructor;
    expanded: {
        type: vue.PropType<readonly string[]>;
        default: () => never[];
    };
    width: (StringConstructor | NumberConstructor)[];
    search: StringConstructor;
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    hideNoData: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    rowHeight: NumberConstructor;
    'onClick:row': vue.PropType<(e: Event, value: {
        item: DataTableItem<any>;
    }) => void>;
    page: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemsPerPage: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}>>;
type VDataTable = InstanceType<typeof VDataTable>;

declare const VDataTableFooter: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: {
            itemsPerPageText?: string | undefined;
            pageText?: string | undefined;
            nextIcon?: string | undefined;
            prevIcon?: string | undefined;
            firstIcon?: string | undefined;
            lastIcon?: string | undefined;
            firstPageLabel?: string | undefined;
            prevPageLabel?: string | undefined;
            nextPageLabel?: string | undefined;
            lastPageLabel?: string | undefined;
            itemsPerPageOptions?: readonly {
                title: string;
                value: number;
            }[] | undefined;
            showCurrentPage?: boolean | undefined;
            key?: string | number | symbol | undefined;
            style?: unknown;
            class?: unknown;
            $children?: {} | vue.VNodeChild | {
                prepend?: (() => vue.VNodeChild) | undefined;
            };
            ref?: vue.VNodeRef | undefined;
            ref_for?: boolean | undefined;
            ref_key?: string | undefined;
            'v-slots'?: {
                prepend?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
            $slots?: {
                prepend?: (() => vue.VNodeChild) | undefined;
            } | undefined;
            onVnodeBeforeMount?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeMounted?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUpdate?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUpdated?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUnmount?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUnmounted?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
        };
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            prepend?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<{
            itemsPerPageText: string;
            pageText: string;
            nextIcon: string;
            prevIcon: string;
            firstIcon: string;
            lastIcon: string;
            firstPageLabel: string;
            prevPageLabel: string;
            nextPageLabel: string;
            lastPageLabel: string;
            itemsPerPageOptions: readonly {
                title: string;
                value: number;
            }[];
            showCurrentPage: boolean;
        } & {} & {
            $children?: {} | vue.VNodeChild | {
                prepend?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                prepend?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
        } & {
            $slots?: {
                prepend?: (() => vue.VNodeChild) | undefined;
            } | undefined;
        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
            itemsPerPageText: string;
            pageText: string;
            nextIcon: string;
            prevIcon: string;
            firstIcon: string;
            lastIcon: string;
            firstPageLabel: string;
            prevPageLabel: string;
            nextPageLabel: string;
            lastPageLabel: string;
            itemsPerPageOptions: readonly {
                title: string;
                value: number;
            }[];
            showCurrentPage: boolean;
        }, {}, string, vue.SlotsType<Partial<{
            prepend: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
        }>>> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & {
        itemsPerPageText: string;
        pageText: string;
        nextIcon: string;
        prevIcon: string;
        firstIcon: string;
        lastIcon: string;
        firstPageLabel: string;
        prevPageLabel: string;
        nextPageLabel: string;
        lastPageLabel: string;
        itemsPerPageOptions: readonly {
            title: string;
            value: number;
        }[];
        showCurrentPage: boolean;
    } & {} & {
        $children?: {} | vue.VNodeChild | {
            prepend?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            prepend?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        $slots?: {
            prepend?: (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & vue.ShallowUnwrapRef<() => JSX.Element> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    itemsPerPageText: string;
    pageText: string;
    nextIcon: string;
    prevIcon: string;
    firstIcon: string;
    lastIcon: string;
    firstPageLabel: string;
    prevPageLabel: string;
    nextPageLabel: string;
    lastPageLabel: string;
    itemsPerPageOptions: readonly {
        title: string;
        value: number;
    }[];
    showCurrentPage: boolean;
} & {} & {
    $children?: {} | vue.VNodeChild | {
        prepend?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        prepend?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:prepend"?: false | (() => vue.VNodeChild) | undefined;
} & {
    $slots?: {
        prepend?: (() => vue.VNodeChild) | undefined;
    } | undefined;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
    itemsPerPageText: string;
    pageText: string;
    nextIcon: string;
    prevIcon: string;
    firstIcon: string;
    lastIcon: string;
    firstPageLabel: string;
    prevPageLabel: string;
    nextPageLabel: string;
    lastPageLabel: string;
    itemsPerPageOptions: readonly {
        title: string;
        value: number;
    }[];
    showCurrentPage: boolean;
}, {}, string, vue.SlotsType<Partial<{
    prepend: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    prevIcon: {
        type: StringConstructor;
        default: string;
    };
    nextIcon: {
        type: StringConstructor;
        default: string;
    };
    firstIcon: {
        type: StringConstructor;
        default: string;
    };
    lastIcon: {
        type: StringConstructor;
        default: string;
    };
    itemsPerPageText: {
        type: StringConstructor;
        default: string;
    };
    pageText: {
        type: StringConstructor;
        default: string;
    };
    firstPageLabel: {
        type: StringConstructor;
        default: string;
    };
    prevPageLabel: {
        type: StringConstructor;
        default: string;
    };
    nextPageLabel: {
        type: StringConstructor;
        default: string;
    };
    lastPageLabel: {
        type: StringConstructor;
        default: string;
    };
    itemsPerPageOptions: {
        type: PropType<readonly {
            title: string;
            value: number;
        }[]>;
        default: () => {
            value: number;
            title: string;
        }[];
    };
    showCurrentPage: BooleanConstructor;
}, vue.ExtractPropTypes<{
    prevIcon: {
        type: StringConstructor;
        default: string;
    };
    nextIcon: {
        type: StringConstructor;
        default: string;
    };
    firstIcon: {
        type: StringConstructor;
        default: string;
    };
    lastIcon: {
        type: StringConstructor;
        default: string;
    };
    itemsPerPageText: {
        type: StringConstructor;
        default: string;
    };
    pageText: {
        type: StringConstructor;
        default: string;
    };
    firstPageLabel: {
        type: StringConstructor;
        default: string;
    };
    prevPageLabel: {
        type: StringConstructor;
        default: string;
    };
    nextPageLabel: {
        type: StringConstructor;
        default: string;
    };
    lastPageLabel: {
        type: StringConstructor;
        default: string;
    };
    itemsPerPageOptions: {
        type: PropType<readonly {
            title: string;
            value: number;
        }[]>;
        default: () => {
            value: number;
            title: string;
        }[];
    };
    showCurrentPage: BooleanConstructor;
}>>;

declare const VDataTableRow: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: {
            readonly index?: Number | undefined;
            key?: string | number | symbol | undefined;
            readonly item?: DataTableItem<any> | undefined;
            style?: unknown;
            class?: unknown;
            readonly onClick?: ((e: MouseEvent) => void) | undefined;
            ref?: vue.VNodeRef | undefined;
            ref_for?: boolean | undefined;
            ref_key?: string | undefined;
            onVnodeBeforeMount?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeMounted?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUpdate?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUpdated?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUnmount?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUnmounted?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
        };
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot<any> | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<{
            index: PropType<Number>;
            item: PropType<DataTableItem<any>>;
            onClick: PropType<(e: MouseEvent) => void>;
        }>>, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<vue.ExtractPropTypes<{
        index: PropType<Number>;
        item: PropType<DataTableItem<any>>;
        onClick: PropType<(e: MouseEvent) => void>;
    }>> & vue.ShallowUnwrapRef<{}> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<{
    index: PropType<Number>;
    item: PropType<DataTableItem<any>>;
    onClick: PropType<(e: MouseEvent) => void>;
}>>, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    index: PropType<Number>;
    item: PropType<DataTableItem<any>>;
    onClick: PropType<(e: MouseEvent) => void>;
}, vue.ExtractPropTypes<{
    index: PropType<Number>;
    item: PropType<DataTableItem<any>>;
    onClick: PropType<(e: MouseEvent) => void>;
}>>;
type VDataTableRow = InstanceType<typeof VDataTableRow>;

type VDataTableVirtualSlotProps = Omit<VDataTableSlotProps, 'setItemsPerPage' | 'page' | 'pageCount' | 'itemsPerPage'>;
declare const VDataTableVirtual: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: {
            [x: `v-slot:column.${string}`]: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            [x: `v-slot:item.${string}`]: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            style?: vue.StyleValue | undefined;
            expanded?: readonly string[] | undefined;
            tag?: string | undefined;
            sticky?: boolean | undefined;
            headers?: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]> | undefined;
            noDataText?: string | undefined;
            loadingText?: string | undefined;
            sortBy?: readonly SortItem[] | undefined;
            items?: any[] | undefined;
            density?: Density | undefined;
            modelValue?: readonly any[] | undefined;
            itemValue?: SelectItemKey | undefined;
            returnObject?: boolean | undefined;
            hideNoData?: boolean | undefined;
            filterMode?: FilterMode | undefined;
            noFilter?: boolean | undefined;
            hover?: boolean | undefined;
            fixedHeader?: boolean | undefined;
            fixedFooter?: boolean | undefined;
            itemHeight?: string | number | undefined;
            multiSort?: boolean | undefined;
            mustSort?: boolean | undefined;
            groupBy?: readonly SortItem[] | undefined;
            expandOnClick?: boolean | undefined;
            showExpand?: boolean | undefined;
            showSelect?: boolean | undefined;
            sortAscIcon?: IconValue | undefined;
            sortDescIcon?: IconValue | undefined;
            visibleItems?: string | number | undefined;
            search?: string | undefined;
            key?: string | number | symbol | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            color?: string | undefined;
            loading?: string | boolean | undefined;
            class?: any;
            $children?: {} | vue.VNodeChild | {
                [x: `item.${string}`]: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                top?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
                bottom?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
            };
            ref?: vue.VNodeRef | undefined;
            ref_for?: boolean | undefined;
            ref_key?: string | undefined;
            theme?: string | undefined;
            'v-slots'?: {
                [x: `item.${string}`]: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: false | ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: false | ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: false | (() => vue.VNodeChild) | undefined;
                'group-header'?: false | ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: false | (() => vue.VNodeChild) | undefined;
                'expanded-row'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                top?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
                bottom?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
            } | undefined;
            $slots?: {
                [x: `item.${string}`]: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                top?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
                bottom?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
            } | undefined;
            onVnodeBeforeMount?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeMounted?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUpdate?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUpdated?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUnmount?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUnmounted?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
            "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:item"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
            customFilter?: FilterFunction | undefined;
            customKeyFilter?: FilterKeyFunctions | undefined;
            filterKeys?: FilterKeys | undefined;
            "v-slot:top"?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:bottom"?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
            customKeySort?: Record<string, DataTableCompareFunction> | undefined;
            "onUpdate:sortBy"?: ((value: any) => any) | undefined;
            "onUpdate:groupBy"?: ((value: any) => any) | undefined;
            "onUpdate:expanded"?: ((value: any) => any) | undefined;
            "onUpdate:options"?: ((value: any) => any) | undefined;
            "v-slot:headers"?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:data-table-group"?: false | ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:data-table-select"?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            rowHeight?: number | undefined;
            'onClick:row'?: (((e: Event, value: {
                item: DataTableItem<any>;
            }) => void) & ((e: Event, value: {
                item: DataTableItem;
            }) => any)) | undefined;
            "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:group-header"?: false | ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:expanded-row"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
        };
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [x: `item.${string}`]: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            [x: `column.${string}`]: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'data-table-group'?: ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'data-table-select'?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            item?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            loading?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'group-header'?: ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'no-data'?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'expanded-row'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'item.data-table-select'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'item.data-table-expand'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            headers?: ((args_0: HeadersSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'column.data-table-select'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'column.data-table-expand'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            top?: ((args_0: VDataTableVirtualSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            bottom?: ((args_0: VDataTableVirtualSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: ((event: "update:modelValue", value: any[]) => void) & ((event: "update:options", value: any) => void) & ((event: "update:groupBy", value: any) => void) & ((event: "update:sortBy", value: any) => void) & ((event: "update:expanded", value: any) => void) & ((event: "click:row", e: Event, value: {
            item: DataTableItem;
        }) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<{
            style: vue.StyleValue;
            expanded: readonly string[];
            tag: string;
            sticky: boolean;
            headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
            noDataText: string;
            loadingText: string;
            sortBy: readonly SortItem[];
            items: any[];
            density: Density;
            modelValue: readonly any[];
            itemValue: SelectItemKey;
            returnObject: boolean;
            hideNoData: boolean;
            filterMode: FilterMode;
            noFilter: boolean;
            hover: boolean;
            fixedHeader: boolean;
            fixedFooter: boolean;
            itemHeight: string | number;
            multiSort: boolean;
            mustSort: boolean;
            groupBy: readonly SortItem[];
            expandOnClick: boolean;
            showExpand: boolean;
            showSelect: boolean;
            sortAscIcon: IconValue;
            sortDescIcon: IconValue;
            visibleItems: string | number;
        } & {
            search?: string | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            color?: string | undefined;
            loading?: string | boolean | undefined;
            class?: any;
            theme?: string | undefined;
            customFilter?: FilterFunction | undefined;
            customKeyFilter?: FilterKeyFunctions | undefined;
            filterKeys?: FilterKeys | undefined;
            customKeySort?: Record<string, DataTableCompareFunction> | undefined;
            rowHeight?: number | undefined;
            'onClick:row'?: ((e: Event, value: {
                item: DataTableItem<any>;
            }) => void) | undefined;
        } & {
            $children?: {} | vue.VNodeChild | {
                [x: `item.${string}`]: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                top?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
                bottom?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                [x: `item.${string}`]: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: false | ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: false | ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: false | (() => vue.VNodeChild) | undefined;
                'group-header'?: false | ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: false | (() => vue.VNodeChild) | undefined;
                'expanded-row'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                top?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
                bottom?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            [x: `v-slot:item.${string}`]: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            [x: `v-slot:column.${string}`]: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            "v-slot:data-table-group"?: false | ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:data-table-select"?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:item"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:group-header"?: false | ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:expanded-row"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:item.data-table-select"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:item.data-table-expand"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:headers"?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:column.data-table-select"?: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            "v-slot:column.data-table-expand"?: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            "v-slot:top"?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:bottom"?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
        } & {
            $slots?: {
                [x: `item.${string}`]: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                top?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
                bottom?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
            "onUpdate:sortBy"?: ((value: any) => any) | undefined;
            "onUpdate:groupBy"?: ((value: any) => any) | undefined;
            "onUpdate:expanded"?: ((value: any) => any) | undefined;
            "onUpdate:options"?: ((value: any) => any) | undefined;
            "onClick:row"?: ((e: Event, value: {
                item: DataTableItem;
            }) => any) | undefined;
        }, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'update:modelValue': (value: any[]) => true;
            'update:sortBy': (value: any) => true;
            'update:options': (value: any) => true;
            'update:groupBy': (value: any) => true;
            'update:expanded': (value: any) => true;
            'click:row': (e: Event, value: {
                item: DataTableItem;
            }) => true;
        }, string, {
            style: vue.StyleValue;
            expanded: readonly string[];
            tag: string;
            sticky: boolean;
            headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
            noDataText: string;
            loadingText: string;
            sortBy: readonly SortItem[];
            items: any[];
            density: Density;
            modelValue: readonly any[];
            itemValue: SelectItemKey;
            returnObject: boolean;
            hideNoData: boolean;
            filterMode: FilterMode;
            noFilter: boolean;
            hover: boolean;
            fixedHeader: boolean;
            fixedFooter: boolean;
            itemHeight: string | number;
            multiSort: boolean;
            mustSort: boolean;
            groupBy: readonly SortItem[];
            expandOnClick: boolean;
            showExpand: boolean;
            showSelect: boolean;
            sortAscIcon: IconValue;
            sortDescIcon: IconValue;
            visibleItems: string | number;
        }, {}, string, vue.SlotsType<Partial<{
            [x: `item.${string}`]: (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            [x: `column.${string}`]: (args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'data-table-group': (args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'data-table-select': (args_0: {
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            item: (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            loading: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'group-header': (args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'no-data': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'expanded-row': (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'item.data-table-select': (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'item.data-table-expand': (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            headers: (args_0: HeadersSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            loader: (args_0: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'column.data-table-select': (args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'column.data-table-expand': (args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            top: (args_0: VDataTableVirtualSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            bottom: (args_0: VDataTableVirtualSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
        }>>> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & {
        style: vue.StyleValue;
        expanded: readonly string[];
        tag: string;
        sticky: boolean;
        headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
        noDataText: string;
        loadingText: string;
        sortBy: readonly SortItem[];
        items: any[];
        density: Density;
        modelValue: readonly any[];
        itemValue: SelectItemKey;
        returnObject: boolean;
        hideNoData: boolean;
        filterMode: FilterMode;
        noFilter: boolean;
        hover: boolean;
        fixedHeader: boolean;
        fixedFooter: boolean;
        itemHeight: string | number;
        multiSort: boolean;
        mustSort: boolean;
        groupBy: readonly SortItem[];
        expandOnClick: boolean;
        showExpand: boolean;
        showSelect: boolean;
        sortAscIcon: IconValue;
        sortDescIcon: IconValue;
        visibleItems: string | number;
    } & {
        search?: string | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        color?: string | undefined;
        loading?: string | boolean | undefined;
        class?: any;
        theme?: string | undefined;
        customFilter?: FilterFunction | undefined;
        customKeyFilter?: FilterKeyFunctions | undefined;
        filterKeys?: FilterKeys | undefined;
        customKeySort?: Record<string, DataTableCompareFunction> | undefined;
        rowHeight?: number | undefined;
        'onClick:row'?: ((e: Event, value: {
            item: DataTableItem<any>;
        }) => void) | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            [x: `item.${string}`]: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            [x: `column.${string}`]: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'data-table-group'?: ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            'data-table-select'?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            loading?: (() => vue.VNodeChild) | undefined;
            'group-header'?: ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
            'expanded-row'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-select'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-expand'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'column.data-table-select'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'column.data-table-expand'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            top?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
            bottom?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            [x: `item.${string}`]: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            [x: `column.${string}`]: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'data-table-group'?: false | ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            'data-table-select'?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            loading?: false | (() => vue.VNodeChild) | undefined;
            'group-header'?: false | ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'no-data'?: false | (() => vue.VNodeChild) | undefined;
            'expanded-row'?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-select'?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-expand'?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            headers?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'column.data-table-select'?: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'column.data-table-expand'?: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            top?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
            bottom?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        [x: `v-slot:item.${string}`]: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        [x: `v-slot:column.${string}`]: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        "v-slot:data-table-group"?: false | ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:data-table-select"?: false | ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:item"?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:group-header"?: false | ((args_0: {
            index: number;
            item: Group<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
            toggleGroup: (group: Group<any>) => void;
            isGroupOpen: (group: Group<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:expanded-row"?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:item.data-table-select"?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:item.data-table-expand"?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:headers"?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:column.data-table-select"?: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        "v-slot:column.data-table-expand"?: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        "v-slot:top"?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:bottom"?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
    } & {
        $slots?: {
            [x: `item.${string}`]: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            [x: `column.${string}`]: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'data-table-group'?: ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            'data-table-select'?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            loading?: (() => vue.VNodeChild) | undefined;
            'group-header'?: ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
            'expanded-row'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-select'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-expand'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'column.data-table-select'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'column.data-table-expand'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            top?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
            bottom?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
        "onUpdate:sortBy"?: ((value: any) => any) | undefined;
        "onUpdate:groupBy"?: ((value: any) => any) | undefined;
        "onUpdate:expanded"?: ((value: any) => any) | undefined;
        "onUpdate:options"?: ((value: any) => any) | undefined;
        "onClick:row"?: ((e: Event, value: {
            item: DataTableItem;
        }) => any) | undefined;
    } & vue.ShallowUnwrapRef<{}> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    style: vue.StyleValue;
    expanded: readonly string[];
    tag: string;
    sticky: boolean;
    headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
    noDataText: string;
    loadingText: string;
    sortBy: readonly SortItem[];
    items: any[];
    density: Density;
    modelValue: readonly any[];
    itemValue: SelectItemKey;
    returnObject: boolean;
    hideNoData: boolean;
    filterMode: FilterMode;
    noFilter: boolean;
    hover: boolean;
    fixedHeader: boolean;
    fixedFooter: boolean;
    itemHeight: string | number;
    multiSort: boolean;
    mustSort: boolean;
    groupBy: readonly SortItem[];
    expandOnClick: boolean;
    showExpand: boolean;
    showSelect: boolean;
    sortAscIcon: IconValue;
    sortDescIcon: IconValue;
    visibleItems: string | number;
} & {
    search?: string | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    color?: string | undefined;
    loading?: string | boolean | undefined;
    class?: any;
    theme?: string | undefined;
    customFilter?: FilterFunction | undefined;
    customKeyFilter?: FilterKeyFunctions | undefined;
    filterKeys?: FilterKeys | undefined;
    customKeySort?: Record<string, DataTableCompareFunction> | undefined;
    rowHeight?: number | undefined;
    'onClick:row'?: ((e: Event, value: {
        item: DataTableItem<any>;
    }) => void) | undefined;
} & {
    $children?: {} | vue.VNodeChild | {
        [x: `item.${string}`]: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        [x: `column.${string}`]: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'data-table-group'?: ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        'data-table-select'?: ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        item?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        loading?: (() => vue.VNodeChild) | undefined;
        'group-header'?: ((args_0: {
            index: number;
            item: Group<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
            toggleGroup: (group: Group<any>) => void;
            isGroupOpen: (group: Group<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'no-data'?: (() => vue.VNodeChild) | undefined;
        'expanded-row'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-select'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-expand'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'column.data-table-select'?: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'column.data-table-expand'?: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        top?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
        bottom?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        [x: `item.${string}`]: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        [x: `column.${string}`]: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'data-table-group'?: false | ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        'data-table-select'?: false | ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        item?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        loading?: false | (() => vue.VNodeChild) | undefined;
        'group-header'?: false | ((args_0: {
            index: number;
            item: Group<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
            toggleGroup: (group: Group<any>) => void;
            isGroupOpen: (group: Group<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'no-data'?: false | (() => vue.VNodeChild) | undefined;
        'expanded-row'?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-select'?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-expand'?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        headers?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
        loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'column.data-table-select'?: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'column.data-table-expand'?: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        top?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
        bottom?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    [x: `v-slot:item.${string}`]: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    [x: `v-slot:column.${string}`]: false | ((args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNodeChild) | undefined;
    "v-slot:data-table-group"?: false | ((args_0: {
        item: Group<any>;
        count: number;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:data-table-select"?: false | ((args_0: {
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:item"?: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:group-header"?: false | ((args_0: {
        index: number;
        item: Group<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
        toggleGroup: (group: Group<any>) => void;
        isGroupOpen: (group: Group<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:expanded-row"?: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:item.data-table-select"?: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:item.data-table-expand"?: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:headers"?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:column.data-table-select"?: false | ((args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNodeChild) | undefined;
    "v-slot:column.data-table-expand"?: false | ((args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNodeChild) | undefined;
    "v-slot:top"?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:bottom"?: false | ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
} & {
    $slots?: {
        [x: `item.${string}`]: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        [x: `column.${string}`]: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'data-table-group'?: ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        'data-table-select'?: ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        item?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        loading?: (() => vue.VNodeChild) | undefined;
        'group-header'?: ((args_0: {
            index: number;
            item: Group<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
            toggleGroup: (group: Group<any>) => void;
            isGroupOpen: (group: Group<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'no-data'?: (() => vue.VNodeChild) | undefined;
        'expanded-row'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-select'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-expand'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'column.data-table-select'?: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'column.data-table-expand'?: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        top?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
        bottom?: ((args_0: VDataTableVirtualSlotProps) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
    "onUpdate:sortBy"?: ((value: any) => any) | undefined;
    "onUpdate:groupBy"?: ((value: any) => any) | undefined;
    "onUpdate:expanded"?: ((value: any) => any) | undefined;
    "onUpdate:options"?: ((value: any) => any) | undefined;
    "onClick:row"?: ((e: Event, value: {
        item: DataTableItem;
    }) => any) | undefined;
}, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any[]) => true;
    'update:sortBy': (value: any) => true;
    'update:options': (value: any) => true;
    'update:groupBy': (value: any) => true;
    'update:expanded': (value: any) => true;
    'click:row': (e: Event, value: {
        item: DataTableItem;
    }) => true;
}, string, {
    style: vue.StyleValue;
    expanded: readonly string[];
    tag: string;
    sticky: boolean;
    headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
    noDataText: string;
    loadingText: string;
    sortBy: readonly SortItem[];
    items: any[];
    density: Density;
    modelValue: readonly any[];
    itemValue: SelectItemKey;
    returnObject: boolean;
    hideNoData: boolean;
    filterMode: FilterMode;
    noFilter: boolean;
    hover: boolean;
    fixedHeader: boolean;
    fixedFooter: boolean;
    itemHeight: string | number;
    multiSort: boolean;
    mustSort: boolean;
    groupBy: readonly SortItem[];
    expandOnClick: boolean;
    showExpand: boolean;
    showSelect: boolean;
    sortAscIcon: IconValue;
    sortDescIcon: IconValue;
    visibleItems: string | number;
}, {}, string, vue.SlotsType<Partial<{
    [x: `item.${string}`]: (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    [x: `column.${string}`]: (args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'data-table-group': (args_0: {
        item: Group<any>;
        count: number;
        props: Record<string, unknown>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'data-table-select': (args_0: {
        props: Record<string, unknown>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    item: (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    loading: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'group-header': (args_0: {
        index: number;
        item: Group<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
        toggleGroup: (group: Group<any>) => void;
        isGroupOpen: (group: Group<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'no-data': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'expanded-row': (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'item.data-table-select': (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'item.data-table-expand': (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    headers: (args_0: HeadersSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    loader: (args_0: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'column.data-table-select': (args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'column.data-table-expand': (args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    top: (args_0: VDataTableVirtualSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    bottom: (args_0: VDataTableVirtualSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    customFilter: vue.PropType<FilterFunction>;
    customKeyFilter: vue.PropType<FilterKeyFunctions>;
    filterKeys: vue.PropType<FilterKeys>;
    filterMode: {
        type: vue.PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
    visibleItems: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    groupBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    height: (StringConstructor | NumberConstructor)[];
    hover: BooleanConstructor;
    loading: (StringConstructor | BooleanConstructor)[];
    color: StringConstructor;
    sticky: BooleanConstructor;
    multiSort: BooleanConstructor;
    sortAscIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    sortDescIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    sortBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    customKeySort: vue.PropType<Record<string, DataTableCompareFunction>>;
    mustSort: BooleanConstructor;
    showSelect: BooleanConstructor;
    modelValue: {
        type: vue.PropType<readonly any[]>;
        default: () => never[];
    };
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemValue: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    headers: {
        type: vue.PropType<vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>>;
        default: () => never[];
    };
    expandOnClick: BooleanConstructor;
    showExpand: BooleanConstructor;
    expanded: {
        type: vue.PropType<readonly string[]>;
        default: () => never[];
    };
    width: (StringConstructor | NumberConstructor)[];
    search: StringConstructor;
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    hideNoData: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    rowHeight: NumberConstructor;
    'onClick:row': vue.PropType<(e: Event, value: {
        item: DataTableItem<any>;
    }) => void>;
}, vue.ExtractPropTypes<{
    customFilter: vue.PropType<FilterFunction>;
    customKeyFilter: vue.PropType<FilterKeyFunctions>;
    filterKeys: vue.PropType<FilterKeys>;
    filterMode: {
        type: vue.PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
    visibleItems: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    groupBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    height: (StringConstructor | NumberConstructor)[];
    hover: BooleanConstructor;
    loading: (StringConstructor | BooleanConstructor)[];
    color: StringConstructor;
    sticky: BooleanConstructor;
    multiSort: BooleanConstructor;
    sortAscIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    sortDescIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    sortBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    customKeySort: vue.PropType<Record<string, DataTableCompareFunction>>;
    mustSort: BooleanConstructor;
    showSelect: BooleanConstructor;
    modelValue: {
        type: vue.PropType<readonly any[]>;
        default: () => never[];
    };
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemValue: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    headers: {
        type: vue.PropType<vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>>;
        default: () => never[];
    };
    expandOnClick: BooleanConstructor;
    showExpand: BooleanConstructor;
    expanded: {
        type: vue.PropType<readonly string[]>;
        default: () => never[];
    };
    width: (StringConstructor | NumberConstructor)[];
    search: StringConstructor;
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    hideNoData: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    rowHeight: NumberConstructor;
    'onClick:row': vue.PropType<(e: Event, value: {
        item: DataTableItem<any>;
    }) => void>;
}>>;
type VDataTableVirtual = InstanceType<typeof VDataTableVirtual>;

declare const VDataTableServer: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: {
            [x: `v-slot:column.${string}`]: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            [x: `v-slot:item.${string}`]: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            style?: vue.StyleValue | undefined;
            expanded?: readonly string[] | undefined;
            tag?: string | undefined;
            page?: string | number | undefined;
            sticky?: boolean | undefined;
            headers?: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]> | undefined;
            noDataText?: string | undefined;
            loadingText?: string | undefined;
            itemsPerPageText?: string | undefined;
            sortBy?: readonly SortItem[] | undefined;
            pageText?: string | undefined;
            items?: any[] | undefined;
            density?: Density | undefined;
            modelValue?: readonly any[] | undefined;
            itemValue?: SelectItemKey | undefined;
            returnObject?: boolean | undefined;
            hideNoData?: boolean | undefined;
            hover?: boolean | undefined;
            nextIcon?: string | undefined;
            prevIcon?: string | undefined;
            firstIcon?: string | undefined;
            lastIcon?: string | undefined;
            fixedHeader?: boolean | undefined;
            fixedFooter?: boolean | undefined;
            multiSort?: boolean | undefined;
            mustSort?: boolean | undefined;
            groupBy?: readonly SortItem[] | undefined;
            itemsPerPage?: string | number | undefined;
            expandOnClick?: boolean | undefined;
            showExpand?: boolean | undefined;
            showSelect?: boolean | undefined;
            firstPageLabel?: string | undefined;
            prevPageLabel?: string | undefined;
            nextPageLabel?: string | undefined;
            lastPageLabel?: string | undefined;
            itemsPerPageOptions?: readonly {
                title: string;
                value: number;
            }[] | undefined;
            showCurrentPage?: boolean | undefined;
            sortAscIcon?: IconValue | undefined;
            sortDescIcon?: IconValue | undefined;
            search?: string | undefined;
            key?: string | number | symbol | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            color?: string | undefined;
            loading?: string | boolean | undefined;
            class?: any;
            $children?: vue.VNodeChild | {
                [x: `item.${string}`]: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                'footer.prepend'?: (() => vue.VNodeChild) | undefined;
            } | ((args_0: VDataTableSlotProps) => vue.VNodeChild);
            ref?: vue.VNodeRef | undefined;
            ref_for?: boolean | undefined;
            ref_key?: string | undefined;
            theme?: string | undefined;
            "v-slot:default"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            'v-slots'?: {
                [x: `item.${string}`]: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: false | ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: false | ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: false | (() => vue.VNodeChild) | undefined;
                'group-header'?: false | ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: false | (() => vue.VNodeChild) | undefined;
                'expanded-row'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                default?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                colgroup?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                top?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                body?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tbody?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                thead?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tfoot?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                bottom?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                'footer.prepend'?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
            $slots?: {
                [x: `item.${string}`]: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                'footer.prepend'?: (() => vue.VNodeChild) | undefined;
            } | undefined;
            onVnodeBeforeMount?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeMounted?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUpdate?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUpdated?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUnmount?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUnmounted?: ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
            "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:item"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:top"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:bottom"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            customKeySort?: Record<string, DataTableCompareFunction> | undefined;
            "onUpdate:sortBy"?: ((sortBy: any) => any) | undefined;
            "onUpdate:groupBy"?: ((value: any) => any) | undefined;
            "onUpdate:page"?: ((page: number) => any) | undefined;
            "onUpdate:itemsPerPage"?: ((page: number) => any) | undefined;
            itemsLength: string | number;
            "onUpdate:expanded"?: ((options: any) => any) | undefined;
            "onUpdate:options"?: ((options: any) => any) | undefined;
            "v-slot:headers"?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:data-table-group"?: false | ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:data-table-select"?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            rowHeight?: number | undefined;
            'onClick:row'?: (((e: Event, value: {
                item: DataTableItem<any>;
            }) => void) & ((e: Event, value: {
                item: DataTableItem;
            }) => any)) | undefined;
            "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:group-header"?: false | ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:expanded-row"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:body"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:colgroup"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:tbody"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:tfoot"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:thead"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:footer.prepend"?: false | (() => vue.VNodeChild) | undefined;
        };
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [x: `item.${string}`]: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            [x: `column.${string}`]: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'data-table-group'?: ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'data-table-select'?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            item?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            loading?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'group-header'?: ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'no-data'?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'expanded-row'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'item.data-table-select'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'item.data-table-expand'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            headers?: ((args_0: HeadersSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'column.data-table-select'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'column.data-table-expand'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            default?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            colgroup?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            top?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            body?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            tbody?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            thead?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            tfoot?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            bottom?: ((args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'footer.prepend'?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: ((event: "update:modelValue", value: any[]) => void) & ((event: "update:options", options: any) => void) & ((event: "update:groupBy", value: any) => void) & ((event: "update:page", page: number) => void) & ((event: "update:itemsPerPage", page: number) => void) & ((event: "update:sortBy", sortBy: any) => void) & ((event: "update:expanded", options: any) => void) & ((event: "click:row", e: Event, value: {
            item: DataTableItem;
        }) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<{
            style: vue.StyleValue;
            expanded: readonly string[];
            tag: string;
            page: string | number;
            sticky: boolean;
            headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
            noDataText: string;
            loadingText: string;
            itemsPerPageText: string;
            sortBy: readonly SortItem[];
            pageText: string;
            items: any[];
            density: Density;
            modelValue: readonly any[];
            itemValue: SelectItemKey;
            returnObject: boolean;
            hideNoData: boolean;
            hover: boolean;
            nextIcon: string;
            prevIcon: string;
            firstIcon: string;
            lastIcon: string;
            fixedHeader: boolean;
            fixedFooter: boolean;
            multiSort: boolean;
            mustSort: boolean;
            groupBy: readonly SortItem[];
            itemsPerPage: string | number;
            itemsLength: string | number;
            expandOnClick: boolean;
            showExpand: boolean;
            showSelect: boolean;
            firstPageLabel: string;
            prevPageLabel: string;
            nextPageLabel: string;
            lastPageLabel: string;
            itemsPerPageOptions: readonly {
                title: string;
                value: number;
            }[];
            showCurrentPage: boolean;
            sortAscIcon: IconValue;
            sortDescIcon: IconValue;
        } & {
            search?: string | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            color?: string | undefined;
            loading?: string | boolean | undefined;
            class?: any;
            theme?: string | undefined;
            customKeySort?: Record<string, DataTableCompareFunction> | undefined;
            rowHeight?: number | undefined;
            'onClick:row'?: ((e: Event, value: {
                item: DataTableItem<any>;
            }) => void) | undefined;
        } & {
            $children?: vue.VNodeChild | {
                [x: `item.${string}`]: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                'footer.prepend'?: (() => vue.VNodeChild) | undefined;
            } | ((args_0: VDataTableSlotProps) => vue.VNodeChild);
            'v-slots'?: {
                [x: `item.${string}`]: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: false | ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: false | ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: false | (() => vue.VNodeChild) | undefined;
                'group-header'?: false | ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: false | (() => vue.VNodeChild) | undefined;
                'expanded-row'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: false | ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: false | ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                default?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                colgroup?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                top?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                body?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tbody?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                thead?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tfoot?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                bottom?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                'footer.prepend'?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            [x: `v-slot:item.${string}`]: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            [x: `v-slot:column.${string}`]: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            "v-slot:data-table-group"?: false | ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:data-table-select"?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:item"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:group-header"?: false | ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:expanded-row"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:item.data-table-select"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:item.data-table-expand"?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            "v-slot:headers"?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:column.data-table-select"?: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            "v-slot:column.data-table-expand"?: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            "v-slot:default"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:colgroup"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:top"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:body"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:tbody"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:thead"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:tfoot"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:bottom"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:footer.prepend"?: false | (() => vue.VNodeChild) | undefined;
        } & {
            $slots?: {
                [x: `item.${string}`]: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                [x: `column.${string}`]: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'data-table-group'?: ((args_0: {
                    item: Group<any>;
                    count: number;
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                'data-table-select'?: ((args_0: {
                    props: Record<string, unknown>;
                }) => vue.VNodeChild) | undefined;
                item?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                loading?: (() => vue.VNodeChild) | undefined;
                'group-header'?: ((args_0: {
                    index: number;
                    item: Group<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                    toggleGroup: (group: Group<any>) => void;
                    isGroupOpen: (group: Group<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
                'expanded-row'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-select'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                'item.data-table-expand'?: ((args_0: {
                    index: number;
                    item: DataTableItem<any>;
                    columns: InternalDataTableHeader[];
                    isExpanded: (item: DataTableItem<any>) => boolean;
                    toggleExpand: (item: DataTableItem<any>) => void;
                    isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                    toggleSelect: (item: DataTableItem<any>) => void;
                }) => vue.VNodeChild) | undefined;
                headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
                loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
                'column.data-table-select'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                'column.data-table-expand'?: ((args_0: {
                    column: InternalDataTableHeader;
                    selectAll: (value: boolean) => void;
                    isSorted: (column: InternalDataTableHeader) => boolean;
                    toggleSort: (column: InternalDataTableHeader) => void;
                    sortBy: readonly SortItem[];
                    someSelected: boolean;
                    allSelected: boolean;
                    getSortIcon: (column: InternalDataTableHeader) => IconValue;
                }) => vue.VNodeChild) | undefined;
                default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
                'footer.prepend'?: (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
            "onUpdate:sortBy"?: ((sortBy: any) => any) | undefined;
            "onUpdate:groupBy"?: ((value: any) => any) | undefined;
            "onUpdate:page"?: ((page: number) => any) | undefined;
            "onUpdate:itemsPerPage"?: ((page: number) => any) | undefined;
            "onUpdate:expanded"?: ((options: any) => any) | undefined;
            "onUpdate:options"?: ((options: any) => any) | undefined;
            "onClick:row"?: ((e: Event, value: {
                item: DataTableItem;
            }) => any) | undefined;
        }, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'update:modelValue': (value: any[]) => true;
            'update:page': (page: number) => true;
            'update:itemsPerPage': (page: number) => true;
            'update:sortBy': (sortBy: any) => true;
            'update:options': (options: any) => true;
            'update:expanded': (options: any) => true;
            'update:groupBy': (value: any) => true;
            'click:row': (e: Event, value: {
                item: DataTableItem;
            }) => true;
        }, string, {
            style: vue.StyleValue;
            expanded: readonly string[];
            tag: string;
            page: string | number;
            sticky: boolean;
            headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
            noDataText: string;
            loadingText: string;
            itemsPerPageText: string;
            sortBy: readonly SortItem[];
            pageText: string;
            items: any[];
            density: Density;
            modelValue: readonly any[];
            itemValue: SelectItemKey;
            returnObject: boolean;
            hideNoData: boolean;
            hover: boolean;
            nextIcon: string;
            prevIcon: string;
            firstIcon: string;
            lastIcon: string;
            fixedHeader: boolean;
            fixedFooter: boolean;
            multiSort: boolean;
            mustSort: boolean;
            groupBy: readonly SortItem[];
            itemsPerPage: string | number;
            expandOnClick: boolean;
            showExpand: boolean;
            showSelect: boolean;
            firstPageLabel: string;
            prevPageLabel: string;
            nextPageLabel: string;
            lastPageLabel: string;
            itemsPerPageOptions: readonly {
                title: string;
                value: number;
            }[];
            showCurrentPage: boolean;
            sortAscIcon: IconValue;
            sortDescIcon: IconValue;
        }, {}, string, vue.SlotsType<Partial<{
            [x: `item.${string}`]: (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            [x: `column.${string}`]: (args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'data-table-group': (args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'data-table-select': (args_0: {
                props: Record<string, unknown>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            item: (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            loading: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'group-header': (args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'no-data': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'expanded-row': (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'item.data-table-select': (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'item.data-table-expand': (args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            headers: (args_0: HeadersSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            loader: (args_0: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'column.data-table-select': (args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'column.data-table-expand': (args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            default: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            colgroup: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            top: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            body: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            tbody: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            thead: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            tfoot: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            bottom: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'footer.prepend': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
        }>>> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof vue.nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & {
        style: vue.StyleValue;
        expanded: readonly string[];
        tag: string;
        page: string | number;
        sticky: boolean;
        headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
        noDataText: string;
        loadingText: string;
        itemsPerPageText: string;
        sortBy: readonly SortItem[];
        pageText: string;
        items: any[];
        density: Density;
        modelValue: readonly any[];
        itemValue: SelectItemKey;
        returnObject: boolean;
        hideNoData: boolean;
        hover: boolean;
        nextIcon: string;
        prevIcon: string;
        firstIcon: string;
        lastIcon: string;
        fixedHeader: boolean;
        fixedFooter: boolean;
        multiSort: boolean;
        mustSort: boolean;
        groupBy: readonly SortItem[];
        itemsPerPage: string | number;
        itemsLength: string | number;
        expandOnClick: boolean;
        showExpand: boolean;
        showSelect: boolean;
        firstPageLabel: string;
        prevPageLabel: string;
        nextPageLabel: string;
        lastPageLabel: string;
        itemsPerPageOptions: readonly {
            title: string;
            value: number;
        }[];
        showCurrentPage: boolean;
        sortAscIcon: IconValue;
        sortDescIcon: IconValue;
    } & {
        search?: string | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        color?: string | undefined;
        loading?: string | boolean | undefined;
        class?: any;
        theme?: string | undefined;
        customKeySort?: Record<string, DataTableCompareFunction> | undefined;
        rowHeight?: number | undefined;
        'onClick:row'?: ((e: Event, value: {
            item: DataTableItem<any>;
        }) => void) | undefined;
    } & {
        $children?: vue.VNodeChild | {
            [x: `item.${string}`]: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            [x: `column.${string}`]: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'data-table-group'?: ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            'data-table-select'?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            loading?: (() => vue.VNodeChild) | undefined;
            'group-header'?: ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
            'expanded-row'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-select'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-expand'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'column.data-table-select'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'column.data-table-expand'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            'footer.prepend'?: (() => vue.VNodeChild) | undefined;
        } | ((args_0: VDataTableSlotProps) => vue.VNodeChild);
        'v-slots'?: {
            [x: `item.${string}`]: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            [x: `column.${string}`]: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'data-table-group'?: false | ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            'data-table-select'?: false | ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            loading?: false | (() => vue.VNodeChild) | undefined;
            'group-header'?: false | ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'no-data'?: false | (() => vue.VNodeChild) | undefined;
            'expanded-row'?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-select'?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-expand'?: false | ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            headers?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'column.data-table-select'?: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'column.data-table-expand'?: false | ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            default?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            colgroup?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            top?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            body?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            tbody?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            thead?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            tfoot?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            bottom?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            'footer.prepend'?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        [x: `v-slot:item.${string}`]: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        [x: `v-slot:column.${string}`]: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        "v-slot:data-table-group"?: false | ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:data-table-select"?: false | ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:item"?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:group-header"?: false | ((args_0: {
            index: number;
            item: Group<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
            toggleGroup: (group: Group<any>) => void;
            isGroupOpen: (group: Group<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:expanded-row"?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:item.data-table-select"?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:item.data-table-expand"?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        "v-slot:headers"?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:column.data-table-select"?: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        "v-slot:column.data-table-expand"?: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        "v-slot:default"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:colgroup"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:top"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:body"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:tbody"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:thead"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:tfoot"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:bottom"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:footer.prepend"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        $slots?: {
            [x: `item.${string}`]: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            [x: `column.${string}`]: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'data-table-group'?: ((args_0: {
                item: Group<any>;
                count: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            'data-table-select'?: ((args_0: {
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            item?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            loading?: (() => vue.VNodeChild) | undefined;
            'group-header'?: ((args_0: {
                index: number;
                item: Group<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
                toggleGroup: (group: Group<any>) => void;
                isGroupOpen: (group: Group<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
            'expanded-row'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-select'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            'item.data-table-expand'?: ((args_0: {
                index: number;
                item: DataTableItem<any>;
                columns: InternalDataTableHeader[];
                isExpanded: (item: DataTableItem<any>) => boolean;
                toggleExpand: (item: DataTableItem<any>) => void;
                isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
                toggleSelect: (item: DataTableItem<any>) => void;
            }) => vue.VNodeChild) | undefined;
            headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'column.data-table-select'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            'column.data-table-expand'?: ((args_0: {
                column: InternalDataTableHeader;
                selectAll: (value: boolean) => void;
                isSorted: (column: InternalDataTableHeader) => boolean;
                toggleSort: (column: InternalDataTableHeader) => void;
                sortBy: readonly SortItem[];
                someSelected: boolean;
                allSelected: boolean;
                getSortIcon: (column: InternalDataTableHeader) => IconValue;
            }) => vue.VNodeChild) | undefined;
            default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
            'footer.prepend'?: (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
        "onUpdate:sortBy"?: ((sortBy: any) => any) | undefined;
        "onUpdate:groupBy"?: ((value: any) => any) | undefined;
        "onUpdate:page"?: ((page: number) => any) | undefined;
        "onUpdate:itemsPerPage"?: ((page: number) => any) | undefined;
        "onUpdate:expanded"?: ((options: any) => any) | undefined;
        "onUpdate:options"?: ((options: any) => any) | undefined;
        "onClick:row"?: ((e: Event, value: {
            item: DataTableItem;
        }) => any) | undefined;
    } & vue.ShallowUnwrapRef<{}> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    style: vue.StyleValue;
    expanded: readonly string[];
    tag: string;
    page: string | number;
    sticky: boolean;
    headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
    noDataText: string;
    loadingText: string;
    itemsPerPageText: string;
    sortBy: readonly SortItem[];
    pageText: string;
    items: any[];
    density: Density;
    modelValue: readonly any[];
    itemValue: SelectItemKey;
    returnObject: boolean;
    hideNoData: boolean;
    hover: boolean;
    nextIcon: string;
    prevIcon: string;
    firstIcon: string;
    lastIcon: string;
    fixedHeader: boolean;
    fixedFooter: boolean;
    multiSort: boolean;
    mustSort: boolean;
    groupBy: readonly SortItem[];
    itemsPerPage: string | number;
    itemsLength: string | number;
    expandOnClick: boolean;
    showExpand: boolean;
    showSelect: boolean;
    firstPageLabel: string;
    prevPageLabel: string;
    nextPageLabel: string;
    lastPageLabel: string;
    itemsPerPageOptions: readonly {
        title: string;
        value: number;
    }[];
    showCurrentPage: boolean;
    sortAscIcon: IconValue;
    sortDescIcon: IconValue;
} & {
    search?: string | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    color?: string | undefined;
    loading?: string | boolean | undefined;
    class?: any;
    theme?: string | undefined;
    customKeySort?: Record<string, DataTableCompareFunction> | undefined;
    rowHeight?: number | undefined;
    'onClick:row'?: ((e: Event, value: {
        item: DataTableItem<any>;
    }) => void) | undefined;
} & {
    $children?: vue.VNodeChild | {
        [x: `item.${string}`]: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        [x: `column.${string}`]: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'data-table-group'?: ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        'data-table-select'?: ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        item?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        loading?: (() => vue.VNodeChild) | undefined;
        'group-header'?: ((args_0: {
            index: number;
            item: Group<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
            toggleGroup: (group: Group<any>) => void;
            isGroupOpen: (group: Group<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'no-data'?: (() => vue.VNodeChild) | undefined;
        'expanded-row'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-select'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-expand'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'column.data-table-select'?: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'column.data-table-expand'?: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        'footer.prepend'?: (() => vue.VNodeChild) | undefined;
    } | ((args_0: VDataTableSlotProps) => vue.VNodeChild);
    'v-slots'?: {
        [x: `item.${string}`]: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        [x: `column.${string}`]: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'data-table-group'?: false | ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        'data-table-select'?: false | ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        item?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        loading?: false | (() => vue.VNodeChild) | undefined;
        'group-header'?: false | ((args_0: {
            index: number;
            item: Group<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
            toggleGroup: (group: Group<any>) => void;
            isGroupOpen: (group: Group<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'no-data'?: false | (() => vue.VNodeChild) | undefined;
        'expanded-row'?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-select'?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-expand'?: false | ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        headers?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
        loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'column.data-table-select'?: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'column.data-table-expand'?: false | ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        default?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        colgroup?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        top?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        body?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        tbody?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        thead?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        tfoot?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        bottom?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        'footer.prepend'?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    [x: `v-slot:item.${string}`]: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    [x: `v-slot:column.${string}`]: false | ((args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNodeChild) | undefined;
    "v-slot:data-table-group"?: false | ((args_0: {
        item: Group<any>;
        count: number;
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:data-table-select"?: false | ((args_0: {
        props: Record<string, unknown>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:item"?: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:loading"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:group-header"?: false | ((args_0: {
        index: number;
        item: Group<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
        toggleGroup: (group: Group<any>) => void;
        isGroupOpen: (group: Group<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:expanded-row"?: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:item.data-table-select"?: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:item.data-table-expand"?: false | ((args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNodeChild) | undefined;
    "v-slot:headers"?: false | ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:column.data-table-select"?: false | ((args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNodeChild) | undefined;
    "v-slot:column.data-table-expand"?: false | ((args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNodeChild) | undefined;
    "v-slot:default"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:colgroup"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:top"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:body"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:tbody"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:thead"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:tfoot"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:bottom"?: false | ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:footer.prepend"?: false | (() => vue.VNodeChild) | undefined;
} & {
    $slots?: {
        [x: `item.${string}`]: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        [x: `column.${string}`]: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'data-table-group'?: ((args_0: {
            item: Group<any>;
            count: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        'data-table-select'?: ((args_0: {
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        item?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        loading?: (() => vue.VNodeChild) | undefined;
        'group-header'?: ((args_0: {
            index: number;
            item: Group<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
            toggleGroup: (group: Group<any>) => void;
            isGroupOpen: (group: Group<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'no-data'?: (() => vue.VNodeChild) | undefined;
        'expanded-row'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-select'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        'item.data-table-expand'?: ((args_0: {
            index: number;
            item: DataTableItem<any>;
            columns: InternalDataTableHeader[];
            isExpanded: (item: DataTableItem<any>) => boolean;
            toggleExpand: (item: DataTableItem<any>) => void;
            isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
            toggleSelect: (item: DataTableItem<any>) => void;
        }) => vue.VNodeChild) | undefined;
        headers?: ((args_0: HeadersSlotProps) => vue.VNodeChild) | undefined;
        loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        'column.data-table-select'?: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        'column.data-table-expand'?: ((args_0: {
            column: InternalDataTableHeader;
            selectAll: (value: boolean) => void;
            isSorted: (column: InternalDataTableHeader) => boolean;
            toggleSort: (column: InternalDataTableHeader) => void;
            sortBy: readonly SortItem[];
            someSelected: boolean;
            allSelected: boolean;
            getSortIcon: (column: InternalDataTableHeader) => IconValue;
        }) => vue.VNodeChild) | undefined;
        default?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        colgroup?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        top?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        body?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        tbody?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        thead?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        tfoot?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        bottom?: ((args_0: VDataTableSlotProps) => vue.VNodeChild) | undefined;
        'footer.prepend'?: (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
    "onUpdate:sortBy"?: ((sortBy: any) => any) | undefined;
    "onUpdate:groupBy"?: ((value: any) => any) | undefined;
    "onUpdate:page"?: ((page: number) => any) | undefined;
    "onUpdate:itemsPerPage"?: ((page: number) => any) | undefined;
    "onUpdate:expanded"?: ((options: any) => any) | undefined;
    "onUpdate:options"?: ((options: any) => any) | undefined;
    "onClick:row"?: ((e: Event, value: {
        item: DataTableItem;
    }) => any) | undefined;
}, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: any[]) => true;
    'update:page': (page: number) => true;
    'update:itemsPerPage': (page: number) => true;
    'update:sortBy': (sortBy: any) => true;
    'update:options': (options: any) => true;
    'update:expanded': (options: any) => true;
    'update:groupBy': (value: any) => true;
    'click:row': (e: Event, value: {
        item: DataTableItem;
    }) => true;
}, string, {
    style: vue.StyleValue;
    expanded: readonly string[];
    tag: string;
    page: string | number;
    sticky: boolean;
    headers: vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>;
    noDataText: string;
    loadingText: string;
    itemsPerPageText: string;
    sortBy: readonly SortItem[];
    pageText: string;
    items: any[];
    density: Density;
    modelValue: readonly any[];
    itemValue: SelectItemKey;
    returnObject: boolean;
    hideNoData: boolean;
    hover: boolean;
    nextIcon: string;
    prevIcon: string;
    firstIcon: string;
    lastIcon: string;
    fixedHeader: boolean;
    fixedFooter: boolean;
    multiSort: boolean;
    mustSort: boolean;
    groupBy: readonly SortItem[];
    itemsPerPage: string | number;
    expandOnClick: boolean;
    showExpand: boolean;
    showSelect: boolean;
    firstPageLabel: string;
    prevPageLabel: string;
    nextPageLabel: string;
    lastPageLabel: string;
    itemsPerPageOptions: readonly {
        title: string;
        value: number;
    }[];
    showCurrentPage: boolean;
    sortAscIcon: IconValue;
    sortDescIcon: IconValue;
}, {}, string, vue.SlotsType<Partial<{
    [x: `item.${string}`]: (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    [x: `column.${string}`]: (args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'data-table-group': (args_0: {
        item: Group<any>;
        count: number;
        props: Record<string, unknown>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'data-table-select': (args_0: {
        props: Record<string, unknown>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    item: (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    loading: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'group-header': (args_0: {
        index: number;
        item: Group<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
        toggleGroup: (group: Group<any>) => void;
        isGroupOpen: (group: Group<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'no-data': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'expanded-row': (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'item.data-table-select': (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'item.data-table-expand': (args_0: {
        index: number;
        item: DataTableItem<any>;
        columns: InternalDataTableHeader[];
        isExpanded: (item: DataTableItem<any>) => boolean;
        toggleExpand: (item: DataTableItem<any>) => void;
        isSelected: (items: DataTableItem<any> | DataTableItem<any>[]) => boolean;
        toggleSelect: (item: DataTableItem<any>) => void;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    headers: (args_0: HeadersSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    loader: (args_0: LoaderSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'column.data-table-select': (args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'column.data-table-expand': (args_0: {
        column: InternalDataTableHeader;
        selectAll: (value: boolean) => void;
        isSorted: (column: InternalDataTableHeader) => boolean;
        toggleSort: (column: InternalDataTableHeader) => void;
        sortBy: readonly SortItem[];
        someSelected: boolean;
        allSelected: boolean;
        getSortIcon: (column: InternalDataTableHeader) => IconValue;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    default: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    colgroup: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    top: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    body: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    tbody: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    thead: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    tfoot: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    bottom: (args_0: VDataTableSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'footer.prepend': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    prevIcon: {
        type: StringConstructor;
        default: string;
    };
    nextIcon: {
        type: StringConstructor;
        default: string;
    };
    firstIcon: {
        type: StringConstructor;
        default: string;
    };
    lastIcon: {
        type: StringConstructor;
        default: string;
    };
    itemsPerPageText: {
        type: StringConstructor;
        default: string;
    };
    pageText: {
        type: StringConstructor;
        default: string;
    };
    firstPageLabel: {
        type: StringConstructor;
        default: string;
    };
    prevPageLabel: {
        type: StringConstructor;
        default: string;
    };
    nextPageLabel: {
        type: StringConstructor;
        default: string;
    };
    lastPageLabel: {
        type: StringConstructor;
        default: string;
    };
    itemsPerPageOptions: {
        type: vue.PropType<readonly {
            title: string;
            value: number;
        }[]>;
        default: () => {
            value: number;
            title: string;
        }[];
    };
    showCurrentPage: BooleanConstructor;
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    height: (StringConstructor | NumberConstructor)[];
    hover: BooleanConstructor;
    loading: (StringConstructor | BooleanConstructor)[];
    color: StringConstructor;
    sticky: BooleanConstructor;
    multiSort: BooleanConstructor;
    sortAscIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    sortDescIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    sortBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    customKeySort: vue.PropType<Record<string, DataTableCompareFunction>>;
    mustSort: BooleanConstructor;
    showSelect: BooleanConstructor;
    modelValue: {
        type: vue.PropType<readonly any[]>;
        default: () => never[];
    };
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemValue: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    headers: {
        type: vue.PropType<vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>>;
        default: () => never[];
    };
    groupBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    expandOnClick: BooleanConstructor;
    showExpand: BooleanConstructor;
    expanded: {
        type: vue.PropType<readonly string[]>;
        default: () => never[];
    };
    width: (StringConstructor | NumberConstructor)[];
    search: StringConstructor;
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    hideNoData: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    rowHeight: NumberConstructor;
    'onClick:row': vue.PropType<(e: Event, value: {
        item: DataTableItem<any>;
    }) => void>;
    page: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemsPerPage: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemsLength: {
        type: (StringConstructor | NumberConstructor)[];
        required: true;
    };
}, vue.ExtractPropTypes<{
    prevIcon: {
        type: StringConstructor;
        default: string;
    };
    nextIcon: {
        type: StringConstructor;
        default: string;
    };
    firstIcon: {
        type: StringConstructor;
        default: string;
    };
    lastIcon: {
        type: StringConstructor;
        default: string;
    };
    itemsPerPageText: {
        type: StringConstructor;
        default: string;
    };
    pageText: {
        type: StringConstructor;
        default: string;
    };
    firstPageLabel: {
        type: StringConstructor;
        default: string;
    };
    prevPageLabel: {
        type: StringConstructor;
        default: string;
    };
    nextPageLabel: {
        type: StringConstructor;
        default: string;
    };
    lastPageLabel: {
        type: StringConstructor;
        default: string;
    };
    itemsPerPageOptions: {
        type: vue.PropType<readonly {
            title: string;
            value: number;
        }[]>;
        default: () => {
            value: number;
            title: string;
        }[];
    };
    showCurrentPage: BooleanConstructor;
    theme: StringConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    fixedHeader: BooleanConstructor;
    fixedFooter: BooleanConstructor;
    height: (StringConstructor | NumberConstructor)[];
    hover: BooleanConstructor;
    loading: (StringConstructor | BooleanConstructor)[];
    color: StringConstructor;
    sticky: BooleanConstructor;
    multiSort: BooleanConstructor;
    sortAscIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    sortDescIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    sortBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    customKeySort: vue.PropType<Record<string, DataTableCompareFunction>>;
    mustSort: BooleanConstructor;
    showSelect: BooleanConstructor;
    modelValue: {
        type: vue.PropType<readonly any[]>;
        default: () => never[];
    };
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemValue: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    headers: {
        type: vue.PropType<vue.DeepReadonly<DataTableHeader[] | DataTableHeader[][]>>;
        default: () => never[];
    };
    groupBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    expandOnClick: BooleanConstructor;
    showExpand: BooleanConstructor;
    expanded: {
        type: vue.PropType<readonly string[]>;
        default: () => never[];
    };
    width: (StringConstructor | NumberConstructor)[];
    search: StringConstructor;
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    hideNoData: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    rowHeight: NumberConstructor;
    'onClick:row': vue.PropType<(e: Event, value: {
        item: DataTableItem<any>;
    }) => void>;
    page: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemsPerPage: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemsLength: {
        type: (StringConstructor | NumberConstructor)[];
        required: true;
    };
}>>;
type VDataTableServer = InstanceType<typeof VDataTableServer>;

export { VDataTable, VDataTableFooter, VDataTableRow, VDataTableRows, VDataTableServer, VDataTableVirtual };
