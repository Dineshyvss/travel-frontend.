import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, Ref } from 'vue';

interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps<T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T): [yes: Partial<Pick<T, U>>, no: Omit<T, U>];
}

type SelectItemKey = boolean | string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any);

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

interface DataIteratorItem<T = any> extends GroupableItem<T> {
    value: unknown;
}

type VDataIteratorSlotProps = {
    page: number;
    itemsPerPage: number;
    sortBy: readonly SortItem[];
    pageCount: number;
    toggleSort: ReturnType<typeof provideSort>['toggleSort'];
    prevPage: ReturnType<typeof providePagination>['prevPage'];
    nextPage: ReturnType<typeof providePagination>['nextPage'];
    setPage: ReturnType<typeof providePagination>['setPage'];
    setItemsPerPage: ReturnType<typeof providePagination>['setItemsPerPage'];
    isSelected: ReturnType<typeof provideSelection>['isSelected'];
    select: ReturnType<typeof provideSelection>['select'];
    selectAll: ReturnType<typeof provideSelection>['selectAll'];
    toggleSelect: ReturnType<typeof provideSelection>['toggleSelect'];
    isExpanded: ReturnType<typeof provideExpanded>['isExpanded'];
    toggleExpand: ReturnType<typeof provideExpanded>['toggleExpand'];
    isGroupOpen: ReturnType<typeof provideGroupBy>['isGroupOpen'];
    toggleGroup: ReturnType<typeof provideGroupBy>['toggleGroup'];
    items: readonly DataIteratorItem[];
    groupedItems: readonly (DataIteratorItem | Group<DataIteratorItem>)[];
};
declare const VDataIterator: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: {
            loading?: boolean | undefined;
            style?: vue.StyleValue | undefined;
            expanded?: readonly string[] | undefined;
            tag?: string | undefined;
            page?: string | number | undefined;
            sortBy?: readonly SortItem[] | undefined;
            items?: any[] | undefined;
            modelValue?: readonly any[] | undefined;
            itemValue?: SelectItemKey | undefined;
            returnObject?: boolean | undefined;
            filterMode?: FilterMode | undefined;
            noFilter?: boolean | undefined;
            multiSort?: boolean | undefined;
            mustSort?: boolean | undefined;
            groupBy?: readonly SortItem[] | undefined;
            itemsPerPage?: NonNullable<string | number> | undefined;
            expandOnClick?: boolean | undefined;
            showExpand?: boolean | undefined;
            showSelect?: boolean | undefined;
            search?: string | undefined;
            key?: string | number | symbol | undefined;
            class?: any;
            $children?: vue.VNodeChild | {
                default?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                header?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                footer?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
            } | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild);
            ref?: vue.VNodeRef | undefined;
            ref_for?: boolean | undefined;
            ref_key?: string | undefined;
            "v-slot:default"?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            'v-slots'?: {
                default?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                header?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                footer?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                'no-data'?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
            $slots?: {
                default?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                header?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                footer?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
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
            "v-slot:header"?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
            customFilter?: FilterFunction | undefined;
            customKeyFilter?: FilterKeyFunctions | undefined;
            filterKeys?: FilterKeys | undefined;
            customKeySort?: Record<string, DataTableCompareFunction> | undefined;
            "onUpdate:sortBy"?: ((value: any) => any) | undefined;
            "onUpdate:groupBy"?: ((value: any) => any) | undefined;
            "onUpdate:page"?: ((value: number) => any) | undefined;
            "onUpdate:itemsPerPage"?: ((value: number) => any) | undefined;
            "onUpdate:expanded"?: ((value: any) => any) | undefined;
            "onUpdate:options"?: ((value: any) => any) | undefined;
            "v-slot:footer"?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        };
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            default?: ((args_0: VDataIteratorSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            header?: ((args_0: VDataIteratorSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            footer?: ((args_0: VDataIteratorSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'no-data'?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: ((event: "update:modelValue", value: any[]) => void) & ((event: "update:options", value: any) => void) & ((event: "update:groupBy", value: any) => void) & ((event: "update:page", value: number) => void) & ((event: "update:itemsPerPage", value: number) => void) & ((event: "update:sortBy", value: any) => void) & ((event: "update:expanded", value: any) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<{
            loading: boolean;
            style: vue.StyleValue;
            expanded: readonly string[];
            tag: string;
            page: string | number;
            sortBy: readonly SortItem[];
            items: any[];
            modelValue: readonly any[];
            itemValue: SelectItemKey;
            returnObject: boolean;
            filterMode: FilterMode;
            noFilter: boolean;
            multiSort: boolean;
            mustSort: boolean;
            groupBy: readonly SortItem[];
            itemsPerPage: NonNullable<string | number>;
            expandOnClick: boolean;
            showExpand: boolean;
            showSelect: boolean;
        } & {
            search?: string | undefined;
            class?: any;
            customFilter?: FilterFunction | undefined;
            customKeyFilter?: FilterKeyFunctions | undefined;
            filterKeys?: FilterKeys | undefined;
            customKeySort?: Record<string, DataTableCompareFunction> | undefined;
        } & {
            $children?: vue.VNodeChild | {
                default?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                header?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                footer?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
            } | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild);
            'v-slots'?: {
                default?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                header?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                footer?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                'no-data'?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:header"?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:footer"?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
        } & {
            $slots?: {
                default?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                header?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                footer?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
                'no-data'?: (() => vue.VNodeChild) | undefined;
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
            'update:modelValue': (value: any[]) => boolean;
            'update:groupBy': (value: any) => boolean;
            'update:page': (value: number) => boolean;
            'update:itemsPerPage': (value: number) => boolean;
            'update:sortBy': (value: any) => boolean;
            'update:options': (value: any) => boolean;
            'update:expanded': (value: any) => boolean;
        }, string, {
            loading: boolean;
            style: vue.StyleValue;
            expanded: readonly string[];
            tag: string;
            page: string | number;
            sortBy: readonly SortItem[];
            items: any[];
            modelValue: readonly any[];
            itemValue: SelectItemKey;
            returnObject: boolean;
            filterMode: FilterMode;
            noFilter: boolean;
            multiSort: boolean;
            mustSort: boolean;
            groupBy: readonly SortItem[];
            itemsPerPage: NonNullable<string | number>;
            expandOnClick: boolean;
            showExpand: boolean;
            showSelect: boolean;
        }, {}, string, vue.SlotsType<Partial<{
            default: (args_0: VDataIteratorSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            header: (args_0: VDataIteratorSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            footer: (args_0: VDataIteratorSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'no-data': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
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
        loading: boolean;
        style: vue.StyleValue;
        expanded: readonly string[];
        tag: string;
        page: string | number;
        sortBy: readonly SortItem[];
        items: any[];
        modelValue: readonly any[];
        itemValue: SelectItemKey;
        returnObject: boolean;
        filterMode: FilterMode;
        noFilter: boolean;
        multiSort: boolean;
        mustSort: boolean;
        groupBy: readonly SortItem[];
        itemsPerPage: NonNullable<string | number>;
        expandOnClick: boolean;
        showExpand: boolean;
        showSelect: boolean;
    } & {
        search?: string | undefined;
        class?: any;
        customFilter?: FilterFunction | undefined;
        customKeyFilter?: FilterKeyFunctions | undefined;
        filterKeys?: FilterKeys | undefined;
        customKeySort?: Record<string, DataTableCompareFunction> | undefined;
    } & {
        $children?: vue.VNodeChild | {
            default?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            header?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            footer?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
        } | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild);
        'v-slots'?: {
            default?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            header?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            footer?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            'no-data'?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:header"?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:footer"?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        $slots?: {
            default?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            header?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            footer?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
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
    loading: boolean;
    style: vue.StyleValue;
    expanded: readonly string[];
    tag: string;
    page: string | number;
    sortBy: readonly SortItem[];
    items: any[];
    modelValue: readonly any[];
    itemValue: SelectItemKey;
    returnObject: boolean;
    filterMode: FilterMode;
    noFilter: boolean;
    multiSort: boolean;
    mustSort: boolean;
    groupBy: readonly SortItem[];
    itemsPerPage: NonNullable<string | number>;
    expandOnClick: boolean;
    showExpand: boolean;
    showSelect: boolean;
} & {
    search?: string | undefined;
    class?: any;
    customFilter?: FilterFunction | undefined;
    customKeyFilter?: FilterKeyFunctions | undefined;
    filterKeys?: FilterKeys | undefined;
    customKeySort?: Record<string, DataTableCompareFunction> | undefined;
} & {
    $children?: vue.VNodeChild | {
        default?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        header?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        footer?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        'no-data'?: (() => vue.VNodeChild) | undefined;
    } | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild);
    'v-slots'?: {
        default?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        header?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        footer?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        'no-data'?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:header"?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:footer"?: false | ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
    "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
} & {
    $slots?: {
        default?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        header?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        footer?: ((args_0: VDataIteratorSlotProps) => vue.VNodeChild) | undefined;
        'no-data'?: (() => vue.VNodeChild) | undefined;
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
    'update:modelValue': (value: any[]) => boolean;
    'update:groupBy': (value: any) => boolean;
    'update:page': (value: number) => boolean;
    'update:itemsPerPage': (value: number) => boolean;
    'update:sortBy': (value: any) => boolean;
    'update:options': (value: any) => boolean;
    'update:expanded': (value: any) => boolean;
}, string, {
    loading: boolean;
    style: vue.StyleValue;
    expanded: readonly string[];
    tag: string;
    page: string | number;
    sortBy: readonly SortItem[];
    items: any[];
    modelValue: readonly any[];
    itemValue: SelectItemKey;
    returnObject: boolean;
    filterMode: FilterMode;
    noFilter: boolean;
    multiSort: boolean;
    mustSort: boolean;
    groupBy: readonly SortItem[];
    itemsPerPage: NonNullable<string | number>;
    expandOnClick: boolean;
    showExpand: boolean;
    showSelect: boolean;
}, {}, string, vue.SlotsType<Partial<{
    default: (args_0: VDataIteratorSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    header: (args_0: VDataIteratorSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    footer: (args_0: VDataIteratorSlotProps) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'no-data': () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    customFilter: vue.PropType<FilterFunction>;
    customKeyFilter: vue.PropType<FilterKeyFunctions>;
    filterKeys: vue.PropType<FilterKeys>;
    filterMode: {
        type: vue.PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
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
    page: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemsPerPage: Omit<{
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    sortBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    customKeySort: vue.PropType<Record<string, DataTableCompareFunction>>;
    multiSort: BooleanConstructor;
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
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    search: StringConstructor;
    loading: BooleanConstructor;
}, vue.ExtractPropTypes<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    customFilter: vue.PropType<FilterFunction>;
    customKeyFilter: vue.PropType<FilterKeyFunctions>;
    filterKeys: vue.PropType<FilterKeys>;
    filterMode: {
        type: vue.PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
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
    page: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    itemsPerPage: Omit<{
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    sortBy: {
        type: vue.PropType<readonly SortItem[]>;
        default: () => never[];
    };
    customKeySort: vue.PropType<Record<string, DataTableCompareFunction>>;
    multiSort: BooleanConstructor;
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
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    search: StringConstructor;
    loading: BooleanConstructor;
}>>;
type VDataIterator = InstanceType<typeof VDataIterator>;

export { VDataIterator };
