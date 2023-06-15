<script setup lang="ts">
import type { CollapseTransitionProps } from './collapseTransition';

defineProps<CollapseTransitionProps>();

const closed = '0px';

interface initialStyle {
    height: string;
    width: string;
    position: string;
    visibility: string;
    overflow: string;
    paddingTop: string;
    paddingBottom: string;
    borderTopWidth: string;
    borderBottomWidth: string;
    marginTop: string;
    marginBottom: string;
}

function getElementStyle(element: HTMLElement) {
    return {
        height: element.style.height,
        width: element.style.width,
        position: element.style.position,
        visibility: element.style.visibility,
        overflow: element.style.overflow,
        paddingTop: element.style.paddingTop,
        paddingBottom: element.style.paddingBottom,
        borderTopWidth: element.style.borderTopWidth,
        borderBottomWidth: element.style.borderBottomWidth,
        marginTop: element.style.marginTop,
        marginBottom: element.style.marginBottom,
    };
}

function prepareElement(element: HTMLElement, initialStyle: initialStyle) {
    const { width } = getComputedStyle(element);
    element.style.width = width;
    element.style.position = 'absolute';
    element.style.visibility = 'hidden';
    element.style.height = '';

    let { height } = getComputedStyle(element);

    element.style.width = initialStyle.width;
    element.style.position = initialStyle.position;
    element.style.visibility = initialStyle.visibility;
    element.style.height = closed;
    element.style.overflow = 'hidden';

    return initialStyle.height && initialStyle.height != closed ? initialStyle.height : height;
}

function animateTransition(
    element: HTMLElement,
    initialStyle: initialStyle,
    done: () => void,
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions
) {
    const animation = element.animate(keyframes, options);
    element.style.height = initialStyle.height;

    animation.onfinish = () => {
        element.style.overflow = initialStyle.overflow;
        done();
    };
}

function getEnterKeyframes(height: string, initialStyle: initialStyle) {
    return [
        {
            height: closed,
            opacity: 0,
            paddingTop: closed,
            paddingBottom: closed,
            borderTopWidth: closed,
            borderBottomWidth: closed,
            marginTop: closed,
            marginBottom: closed,
        },
        {
            height,
            opacity: 1,
            paddingTop: initialStyle.paddingTop,
            paddingBottom: initialStyle.paddingBottom,
            borderTopWidth: initialStyle.borderTopWidth,
            borderBottomWidth: initialStyle.borderBottomWidth,
            marginTop: initialStyle.marginTop,
            marginBottom: initialStyle.marginBottom,
        },
    ];
}

function enter(element: Element, done: () => void) {
    const HTMLElement = element as HTMLElement;
    const initialStyle = getElementStyle(HTMLElement);
    const height = prepareElement(HTMLElement, initialStyle);
    const keyframes = getEnterKeyframes(height, initialStyle);
    const options = { duration: 250, easing: 'ease-in-out' };
    animateTransition(HTMLElement, initialStyle, done, keyframes, options);
}

function leave(element: Element, done: () => void) {
    const HTMLElement = element as HTMLElement;
    const initialStyle = getElementStyle(HTMLElement);
    const { height } = getComputedStyle(HTMLElement);
    HTMLElement.style.height = height;
    const keyframes = getEnterKeyframes(height, initialStyle).reverse();
    const options = { duration: 250, easing: 'ease-in-out' };
    animateTransition(HTMLElement, initialStyle, done, keyframes, options);
}
</script>

<template>
    <Transition :css="false" @enter="enter" @leave="leave">
        <div v-if="show">
            <slot />
        </div>
    </Transition>
</template>
