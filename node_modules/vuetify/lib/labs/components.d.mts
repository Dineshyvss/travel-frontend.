import * as vue from 'vue';
import { ComponentPropsOptions, ExtractPropTypes, Ref, EffectScope, JSXComponent, PropType, UnwrapRef, CSSProperties, nextTick, VNode } from 'vue';

declare const block: readonly ["top", "bottom"];
declare const inline: readonly ["start", "end", "left", "right"];
type Tblock = typeof block[number];
type Tinline = typeof inline[number];
type Anchor = Tblock | Tinline | 'center' | 'center center' | `${Tblock} ${Tinline | 'center'}` | `${Tinline} ${Tblock | 'center'}`;

declare class Box {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor({ x, y, width, height }: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    get top(): number;
    get bottom(): number;
    get left(): number;
    get right(): number;
}

interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps<T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T): [yes: Partial<Pick<T, U>>, no: Omit<T, U>];
}

type SelectItemKey = boolean | string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any);

interface LocationStrategyData {
    contentEl: Ref<HTMLElement | undefined>;
    activatorEl: Ref<HTMLElement | undefined>;
    isActive: Ref<boolean>;
    isRtl: Ref<boolean>;
}
type LocationStrategyFn = (data: LocationStrategyData, props: StrategyProps$1, contentStyles: Ref<Record<string, string>>) => undefined | {
    updateLocation: (e: Event) => void;
};
declare const locationStrategies: {
    static: typeof staticLocationStrategy;
    connected: typeof connectedLocationStrategy;
};
interface StrategyProps$1 {
    locationStrategy: keyof typeof locationStrategies | LocationStrategyFn;
    location: Anchor;
    origin: Anchor | 'auto' | 'overlap';
    offset?: number | string | number[];
    maxHeight?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
}
declare function staticLocationStrategy(): void;
declare function connectedLocationStrategy(data: LocationStrategyData, props: StrategyProps$1, contentStyles: Ref<Record<string, string>>): {
    updateLocation: () => {
        available: {
            x: number;
            y: number;
        };
        contentBox: Box;
    } | undefined;
};

interface ScrollStrategyData {
    root: Ref<HTMLElement | undefined>;
    contentEl: Ref<HTMLElement | undefined>;
    activatorEl: Ref<HTMLElement | undefined>;
    isActive: Ref<boolean>;
    updateLocation: Ref<((e: Event) => void) | undefined>;
}
type ScrollStrategyFn = (data: ScrollStrategyData, props: StrategyProps, scope: EffectScope) => void;
declare const scrollStrategies: {
    none: null;
    close: typeof closeScrollStrategy;
    block: typeof blockScrollStrategy;
    reposition: typeof repositionScrollStrategy;
};
interface StrategyProps {
    scrollStrategy: keyof typeof scrollStrategies | ScrollStrategyFn;
    contained: boolean | undefined;
}
declare function closeScrollStrategy(data: ScrollStrategyData): void;
declare function blockScrollStrategy(data: ScrollStrategyData, props: StrategyProps): void;
declare function repositionScrollStrategy(data: ScrollStrategyData, props: StrategyProps, scope: EffectScope): void;

declare const VBottomSheet: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: {
            absolute?: boolean | undefined;
            location?: Anchor | undefined;
            origin?: NonNullable<"auto" | Anchor | "overlap"> | undefined;
            inset?: boolean | undefined;
            transition?: NonNullable<NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component | undefined;
            })> | {
                component: vue.Component;
            }> | undefined;
            zIndex?: NonNullable<string | number> | undefined;
            style?: vue.StyleValue | undefined;
            eager?: boolean | undefined;
            disabled?: boolean | undefined;
            contentClass?: any;
            modelValue?: boolean | undefined;
            activatorProps?: Record<string, any> | undefined;
            openOnClick?: boolean | undefined;
            openOnHover?: boolean | undefined;
            openOnFocus?: boolean | undefined;
            closeOnContentClick?: boolean | undefined;
            locationStrategy?: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps$1, contentStyles: vue.Ref<Record<string, string>>) => {
                updateLocation: (e: Event) => void;
            } | undefined) | undefined;
            scrollStrategy?: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps, scope: vue.EffectScope) => void) | "reposition"> | undefined;
            closeOnBack?: boolean | undefined;
            contained?: boolean | undefined;
            noClickAnimation?: boolean | undefined;
            persistent?: boolean | undefined;
            scrim?: string | boolean | undefined;
            fullscreen?: boolean | undefined;
            retainFocus?: boolean | undefined;
            scrollable?: boolean | undefined;
            offset?: string | number | number[] | undefined;
            key?: string | number | symbol | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            class?: any;
            $children?: vue.VNodeChild | {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild);
            ref?: vue.VNodeRef | undefined;
            ref_for?: boolean | undefined;
            ref_key?: string | undefined;
            theme?: string | undefined;
            "v-slot:default"?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            'v-slots'?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
            $slots?: {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
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
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
            activator?: string | Element | vue.ComponentPublicInstance | undefined;
            "v-slot:activator"?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
            closeDelay?: string | number | undefined;
            openDelay?: string | number | undefined;
            contentProps?: any;
            attach?: string | boolean | Element | undefined;
        };
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: "update:modelValue", value: boolean) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<{
            absolute: boolean;
            location: Anchor;
            origin: NonNullable<"auto" | Anchor | "overlap">;
            inset: boolean;
            transition: NonNullable<NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component | undefined;
            })> | {
                component: vue.Component;
            }>;
            zIndex: NonNullable<string | number>;
            style: vue.StyleValue;
            eager: boolean;
            disabled: boolean;
            modelValue: boolean;
            activatorProps: Record<string, any>;
            openOnHover: boolean;
            closeOnContentClick: boolean;
            locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps$1, contentStyles: vue.Ref<Record<string, string>>) => {
                updateLocation: (e: Event) => void;
            } | undefined);
            scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps, scope: vue.EffectScope) => void) | "reposition">;
            closeOnBack: boolean;
            contained: boolean;
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: string | boolean;
            fullscreen: boolean;
            retainFocus: boolean;
            scrollable: boolean;
        } & {
            offset?: string | number | number[] | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            class?: any;
            theme?: string | undefined;
            contentClass?: any;
            activator?: string | Element | vue.ComponentPublicInstance | undefined;
            closeDelay?: string | number | undefined;
            openDelay?: string | number | undefined;
            openOnClick?: boolean | undefined;
            openOnFocus?: boolean | undefined;
            contentProps?: any;
            attach?: string | boolean | Element | undefined;
        } & {
            $children?: vue.VNodeChild | {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild);
            'v-slots'?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:activator"?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } & {
            $slots?: {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        }, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            'update:modelValue': (value: boolean) => boolean;
        }, string, {
            absolute: boolean;
            location: Anchor;
            origin: NonNullable<"auto" | Anchor | "overlap">;
            inset: boolean;
            transition: NonNullable<NonNullable<string | boolean | (vue.TransitionProps & {
                component?: vue.Component | undefined;
            })> | {
                component: vue.Component;
            }>;
            zIndex: NonNullable<string | number>;
            style: vue.StyleValue;
            eager: boolean;
            disabled: boolean;
            contentClass: any;
            modelValue: boolean;
            activatorProps: Record<string, any>;
            openOnClick: boolean;
            openOnHover: boolean;
            openOnFocus: boolean;
            closeOnContentClick: boolean;
            locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps$1, contentStyles: vue.Ref<Record<string, string>>) => {
                updateLocation: (e: Event) => void;
            } | undefined);
            scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps, scope: vue.EffectScope) => void) | "reposition">;
            closeOnBack: boolean;
            contained: boolean;
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: string | boolean;
            fullscreen: boolean;
            retainFocus: boolean;
            scrollable: boolean;
        }, {}, string, vue.SlotsType<Partial<{
            default: (args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            activator: (args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
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
        absolute: boolean;
        location: Anchor;
        origin: NonNullable<"auto" | Anchor | "overlap">;
        inset: boolean;
        transition: NonNullable<NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })> | {
            component: vue.Component;
        }>;
        zIndex: NonNullable<string | number>;
        style: vue.StyleValue;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        closeOnContentClick: boolean;
        locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps$1, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined);
        scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps, scope: vue.EffectScope) => void) | "reposition">;
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: string | boolean;
        fullscreen: boolean;
        retainFocus: boolean;
        scrollable: boolean;
    } & {
        offset?: string | number | number[] | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        class?: any;
        theme?: string | undefined;
        contentClass?: any;
        activator?: string | Element | vue.ComponentPublicInstance | undefined;
        closeDelay?: string | number | undefined;
        openDelay?: string | number | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        contentProps?: any;
        attach?: string | boolean | Element | undefined;
    } & {
        $children?: vue.VNodeChild | {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild);
        'v-slots'?: {
            default?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:activator"?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } & {
        $slots?: {
            default?: ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    } & vue.ShallowUnwrapRef<{}> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    absolute: boolean;
    location: Anchor;
    origin: NonNullable<"auto" | Anchor | "overlap">;
    inset: boolean;
    transition: NonNullable<NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component | undefined;
    })> | {
        component: vue.Component;
    }>;
    zIndex: NonNullable<string | number>;
    style: vue.StyleValue;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps$1, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps, scope: vue.EffectScope) => void) | "reposition">;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
    fullscreen: boolean;
    retainFocus: boolean;
    scrollable: boolean;
} & {
    offset?: string | number | number[] | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    class?: any;
    theme?: string | undefined;
    contentClass?: any;
    activator?: string | Element | vue.ComponentPublicInstance | undefined;
    closeDelay?: string | number | undefined;
    openDelay?: string | number | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: vue.VNodeChild | {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild);
    'v-slots'?: {
        default?: false | ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
} & {
    $slots?: {
        default?: ((args_0: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((args_0: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    'update:modelValue': (value: boolean) => boolean;
}, string, {
    absolute: boolean;
    location: Anchor;
    origin: NonNullable<"auto" | Anchor | "overlap">;
    inset: boolean;
    transition: NonNullable<NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component | undefined;
    })> | {
        component: vue.Component;
    }>;
    zIndex: NonNullable<string | number>;
    style: vue.StyleValue;
    eager: boolean;
    disabled: boolean;
    contentClass: any;
    modelValue: boolean;
    activatorProps: Record<string, any>;
    openOnClick: boolean;
    openOnHover: boolean;
    openOnFocus: boolean;
    closeOnContentClick: boolean;
    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps$1, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined);
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps, scope: vue.EffectScope) => void) | "reposition">;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: string | boolean;
    fullscreen: boolean;
    retainFocus: boolean;
    scrollable: boolean;
}, {}, string, vue.SlotsType<Partial<{
    default: (args_0: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    activator: (args_0: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    transition: Omit<Omit<{
        type: vue.PropType<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })> | {
            component: vue.Component;
        }>;
        default: NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })> | {
            component: vue.Component;
        };
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })> | {
            component: vue.Component;
        }>>;
        default: NonNullable<NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })> | {
            component: vue.Component;
        }>;
    };
    theme: StringConstructor;
    scrollStrategy: Omit<{
        type: vue.PropType<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps, scope: vue.EffectScope) => void) | "reposition">;
        default: string;
        validator: (val: any) => boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps, scope: vue.EffectScope) => void) | "reposition">>;
        default: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps, scope: vue.EffectScope) => void) | "reposition">;
    };
    locationStrategy: {
        type: vue.PropType<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps$1, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>;
        default: string;
        validator: (val: any) => boolean;
    };
    location: {
        type: vue.PropType<Anchor>;
        default: string;
    };
    origin: Omit<{
        type: vue.PropType<"auto" | Anchor | "overlap">;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<"auto" | Anchor | "overlap">>;
        default: NonNullable<"auto" | Anchor | "overlap">;
    };
    offset: vue.PropType<string | number | number[] | undefined>;
    eager: BooleanConstructor;
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    closeDelay: (StringConstructor | NumberConstructor)[];
    openDelay: (StringConstructor | NumberConstructor)[];
    activator: vue.PropType<string | Element | vue.ComponentPublicInstance | undefined>;
    activatorProps: {
        type: vue.PropType<Record<string, any>>;
        default: () => {};
    };
    openOnClick: {
        type: BooleanConstructor;
        default: undefined;
    };
    openOnHover: BooleanConstructor;
    openOnFocus: {
        type: BooleanConstructor;
        default: undefined;
    };
    closeOnContentClick: BooleanConstructor;
    absolute: BooleanConstructor;
    attach: vue.PropType<string | boolean | Element>;
    closeOnBack: {
        type: BooleanConstructor;
        default: boolean;
    };
    contained: BooleanConstructor;
    contentClass: {
        type: vue.PropType<any>;
        default: any;
    };
    contentProps: null;
    disabled: BooleanConstructor;
    noClickAnimation: BooleanConstructor;
    modelValue: BooleanConstructor;
    persistent: BooleanConstructor;
    scrim: {
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    zIndex: Omit<{
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    fullscreen: BooleanConstructor;
    retainFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollable: BooleanConstructor;
    inset: BooleanConstructor;
}, vue.ExtractPropTypes<{
    transition: Omit<Omit<{
        type: vue.PropType<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })> | {
            component: vue.Component;
        }>;
        default: NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })> | {
            component: vue.Component;
        };
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })> | {
            component: vue.Component;
        }>>;
        default: NonNullable<NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })> | {
            component: vue.Component;
        }>;
    };
    theme: StringConstructor;
    scrollStrategy: Omit<{
        type: vue.PropType<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps, scope: vue.EffectScope) => void) | "reposition">;
        default: string;
        validator: (val: any) => boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps, scope: vue.EffectScope) => void) | "reposition">>;
        default: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps, scope: vue.EffectScope) => void) | "reposition">;
    };
    locationStrategy: {
        type: vue.PropType<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps$1, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>;
        default: string;
        validator: (val: any) => boolean;
    };
    location: {
        type: vue.PropType<Anchor>;
        default: string;
    };
    origin: Omit<{
        type: vue.PropType<"auto" | Anchor | "overlap">;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<"auto" | Anchor | "overlap">>;
        default: NonNullable<"auto" | Anchor | "overlap">;
    };
    offset: vue.PropType<string | number | number[] | undefined>;
    eager: BooleanConstructor;
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    class: vue.PropType<any>;
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    closeDelay: (StringConstructor | NumberConstructor)[];
    openDelay: (StringConstructor | NumberConstructor)[];
    activator: vue.PropType<string | Element | vue.ComponentPublicInstance | undefined>;
    activatorProps: {
        type: vue.PropType<Record<string, any>>;
        default: () => {};
    };
    openOnClick: {
        type: BooleanConstructor;
        default: undefined;
    };
    openOnHover: BooleanConstructor;
    openOnFocus: {
        type: BooleanConstructor;
        default: undefined;
    };
    closeOnContentClick: BooleanConstructor;
    absolute: BooleanConstructor;
    attach: vue.PropType<string | boolean | Element>;
    closeOnBack: {
        type: BooleanConstructor;
        default: boolean;
    };
    contained: BooleanConstructor;
    contentClass: {
        type: vue.PropType<any>;
        default: any;
    };
    contentProps: null;
    disabled: BooleanConstructor;
    noClickAnimation: BooleanConstructor;
    modelValue: BooleanConstructor;
    persistent: BooleanConstructor;
    scrim: {
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    zIndex: Omit<{
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    fullscreen: BooleanConstructor;
    retainFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollable: BooleanConstructor;
    inset: BooleanConstructor;
}>>;
type VBottomSheet = InstanceType<typeof VBottomSheet>;

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

interface LoaderSlotProps {
    color: string | undefined;
    isActive: boolean;
}

type IconValue = string | (string | [path: string, opacity: number])[] | JSXComponent;
declare const IconValue: PropType<IconValue>;

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

type Density = null | 'default' | 'comfortable' | 'compact';

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

type InfiniteScrollSide = 'start' | 'end' | 'both';
type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error';
type InfiniteScrollSlot = {
    side: InfiniteScrollSide;
    props: Record<string, any>;
};
declare const VInfiniteScroll: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: {
            direction?: "horizontal" | "vertical" | undefined;
            tag?: string | undefined;
            mode?: "manual" | "intersect" | undefined;
            side?: InfiniteScrollSide | undefined;
            loadMoreText?: string | undefined;
            emptyText?: string | undefined;
            key?: string | number | symbol | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            color?: string | undefined;
            margin?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            style?: unknown;
            class?: unknown;
            onLoad?: ((options: {
                side: InfiniteScrollSide;
                done: (status: InfiniteScrollStatus) => void;
            }) => any) | undefined;
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                loading?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                error?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                empty?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                'load-more'?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            };
            ref?: vue.VNodeRef | undefined;
            ref_for?: boolean | undefined;
            ref_key?: string | undefined;
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                loading?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                error?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                empty?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                'load-more'?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            } | undefined;
            "v-slot:error"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            $slots?: {
                default?: (() => vue.VNodeChild) | undefined;
                loading?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                error?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                empty?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                'load-more'?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
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
            "v-slot:loading"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            "v-slot:empty"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            "v-slot:load-more"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        };
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            default?: (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            loading?: ((args_0: InfiniteScrollSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            error?: ((args_0: InfiniteScrollSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            empty?: ((args_0: InfiniteScrollSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
            'load-more'?: ((args_0: InfiniteScrollSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: "load", options: {
            side: InfiniteScrollSide;
            done: (status: InfiniteScrollStatus) => void;
        }) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<{
            direction: "horizontal" | "vertical";
            tag: string;
            mode: "manual" | "intersect";
            side: InfiniteScrollSide;
            loadMoreText: string;
            emptyText: string;
        } & {
            height?: string | number | undefined;
            width?: string | number | undefined;
            color?: string | undefined;
            margin?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
                loading?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                error?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                empty?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                'load-more'?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
                loading?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                error?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                empty?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                'load-more'?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
            "v-slot:loading"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            "v-slot:error"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            "v-slot:empty"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            "v-slot:load-more"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        } & {
            $slots?: {
                default?: (() => vue.VNodeChild) | undefined;
                loading?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                error?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                empty?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
                'load-more'?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            onLoad?: ((options: {
                side: InfiniteScrollSide;
                done: (status: InfiniteScrollStatus) => void;
            }) => any) | undefined;
        }, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
            load: (options: {
                side: InfiniteScrollSide;
                done: (status: InfiniteScrollStatus) => void;
            }) => true;
        }, string, {
            direction: "horizontal" | "vertical";
            tag: string;
            mode: "manual" | "intersect";
            side: InfiniteScrollSide;
            loadMoreText: string;
            emptyText: string;
        }, {}, string, vue.SlotsType<Partial<{
            default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            loading: (args_0: InfiniteScrollSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            error: (args_0: InfiniteScrollSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            empty: (args_0: InfiniteScrollSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[];
            'load-more': (args_0: InfiniteScrollSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
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
        $nextTick: typeof nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & {
        direction: "horizontal" | "vertical";
        tag: string;
        mode: "manual" | "intersect";
        side: InfiniteScrollSide;
        loadMoreText: string;
        emptyText: string;
    } & {
        height?: string | number | undefined;
        width?: string | number | undefined;
        color?: string | undefined;
        margin?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
            loading?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            error?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            empty?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            'load-more'?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
            loading?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            error?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            empty?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            'load-more'?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:loading"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        "v-slot:error"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        "v-slot:empty"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        "v-slot:load-more"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
    } & {
        $slots?: {
            default?: (() => vue.VNodeChild) | undefined;
            loading?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            error?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            empty?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
            'load-more'?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        onLoad?: ((options: {
            side: InfiniteScrollSide;
            done: (status: InfiniteScrollStatus) => void;
        }) => any) | undefined;
    } & vue.ShallowUnwrapRef<{}> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    direction: "horizontal" | "vertical";
    tag: string;
    mode: "manual" | "intersect";
    side: InfiniteScrollSide;
    loadMoreText: string;
    emptyText: string;
} & {
    height?: string | number | undefined;
    width?: string | number | undefined;
    color?: string | undefined;
    margin?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
        loading?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        error?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        empty?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        'load-more'?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
        loading?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        error?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        empty?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        'load-more'?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    "v-slot:loading"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
    "v-slot:error"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
    "v-slot:empty"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
    "v-slot:load-more"?: false | ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
} & {
    $slots?: {
        default?: (() => vue.VNodeChild) | undefined;
        loading?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        error?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        empty?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
        'load-more'?: ((args_0: InfiniteScrollSlot) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    onLoad?: ((options: {
        side: InfiniteScrollSide;
        done: (status: InfiniteScrollStatus) => void;
    }) => any) | undefined;
}, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    load: (options: {
        side: InfiniteScrollSide;
        done: (status: InfiniteScrollStatus) => void;
    }) => true;
}, string, {
    direction: "horizontal" | "vertical";
    tag: string;
    mode: "manual" | "intersect";
    side: InfiniteScrollSide;
    loadMoreText: string;
    emptyText: string;
}, {}, string, vue.SlotsType<Partial<{
    default: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    loading: (args_0: InfiniteScrollSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    error: (args_0: InfiniteScrollSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    empty: (args_0: InfiniteScrollSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    'load-more': (args_0: InfiniteScrollSlot) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    color: StringConstructor;
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    side: {
        type: PropType<InfiniteScrollSide>;
        default: string;
        validator: (v: any) => boolean;
    };
    mode: {
        type: PropType<"manual" | "intersect">;
        default: string;
        validator: (v: any) => boolean;
    };
    margin: (StringConstructor | NumberConstructor)[];
    loadMoreText: {
        type: StringConstructor;
        default: string;
    };
    emptyText: {
        type: StringConstructor;
        default: string;
    };
}, vue.ExtractPropTypes<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    color: StringConstructor;
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    side: {
        type: PropType<InfiniteScrollSide>;
        default: string;
        validator: (v: any) => boolean;
    };
    mode: {
        type: PropType<"manual" | "intersect">;
        default: string;
        validator: (v: any) => boolean;
    };
    margin: (StringConstructor | NumberConstructor)[];
    loadMoreText: {
        type: StringConstructor;
        default: string;
    };
    emptyText: {
        type: StringConstructor;
        default: string;
    };
}>>;
type VInfiniteScroll = InstanceType<typeof VInfiniteScroll>;

declare const VSkeletonLoader: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: {
            type?: string | readonly string[] | undefined;
            loading?: boolean | undefined;
            loadingText?: string | undefined;
            boilerplate?: boolean | undefined;
            key?: string | number | symbol | undefined;
            height?: string | number | undefined;
            width?: string | number | undefined;
            color?: string | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            style?: unknown;
            class?: unknown;
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            elevation?: string | number | undefined;
            ref?: vue.VNodeRef | undefined;
            ref_for?: boolean | undefined;
            ref_key?: string | undefined;
            theme?: string | undefined;
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
            $slots?: {
                default?: (() => vue.VNodeChild) | undefined;
            } | undefined;
            onVnodeBeforeMount?: ((vnode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeMounted?: ((vnode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUpdate?: ((vnode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUpdated?: ((vnode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>, oldVNode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeBeforeUnmount?: ((vnode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void)[] | undefined;
            onVnodeUnmounted?: ((vnode: VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>) => void) | ((vnode: VNode<vue.RendererNode, vue.RendererElement, {
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
            default?: (() => VNode<vue.RendererNode, vue.RendererElement, {
                [key: string]: any;
            }>[]) | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: vue.ComponentOptionsBase<{
            type: string | readonly string[];
            loading: boolean;
            loadingText: string;
            boilerplate: boolean;
        } & {
            height?: string | number | undefined;
            width?: string | number | undefined;
            color?: string | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            elevation?: string | number | undefined;
            theme?: string | undefined;
        } & {
            $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
                default?: (() => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | (() => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
        } & {
            $slots?: {
                default?: (() => vue.VNodeChild) | undefined;
            } | undefined;
        }, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
            type: string | readonly string[];
            loading: boolean;
            loadingText: string;
            boilerplate: boolean;
        }, {}, string, vue.SlotsType<Partial<{
            default: () => VNode<vue.RendererNode, vue.RendererElement, {
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
        type: string | readonly string[];
        loading: boolean;
        loadingText: string;
        boilerplate: boolean;
    } & {
        height?: string | number | undefined;
        width?: string | number | undefined;
        color?: string | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        elevation?: string | number | undefined;
        theme?: string | undefined;
    } & {
        $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
            default?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            default?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
    } & {
        $slots?: {
            default?: (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & vue.ShallowUnwrapRef<{}> & {} & vue.ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    type: string | readonly string[];
    loading: boolean;
    loadingText: string;
    boilerplate: boolean;
} & {
    height?: string | number | undefined;
    width?: string | number | undefined;
    color?: string | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    minWidth?: string | number | undefined;
    elevation?: string | number | undefined;
    theme?: string | undefined;
} & {
    $children?: vue.VNodeChild | (() => vue.VNodeChild) | {
        default?: (() => vue.VNodeChild) | undefined;
    };
    'v-slots'?: {
        default?: false | (() => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => vue.VNodeChild) | undefined;
} & {
    $slots?: {
        default?: (() => vue.VNodeChild) | undefined;
    } | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
    type: string | readonly string[];
    loading: boolean;
    loadingText: string;
    boilerplate: boolean;
}, {}, string, vue.SlotsType<Partial<{
    default: () => VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    theme: StringConstructor;
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    boilerplate: BooleanConstructor;
    color: StringConstructor;
    loading: BooleanConstructor;
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: PropType<string | readonly string[]>;
        default: string;
    };
}, vue.ExtractPropTypes<{
    theme: StringConstructor;
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        validator(v: any): boolean;
    };
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    boilerplate: BooleanConstructor;
    color: StringConstructor;
    loading: BooleanConstructor;
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: PropType<string | readonly string[]>;
        default: string;
    };
}>>;
type VSkeletonLoader = InstanceType<typeof VSkeletonLoader>;

export { VBottomSheet, VDataIterator, VDataTable, VDataTableFooter, VDataTableRow, VDataTableRows, VDataTableServer, VDataTableVirtual, VInfiniteScroll, VSkeletonLoader };
