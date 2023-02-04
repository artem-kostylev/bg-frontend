<template>
    <svg class="spin" width="150" height="150" viewBox="0 0 150 150">
        <circle class="spin__cicle" cx="75" cy="75" r="60" />
    </svg>
</template>

<style>
.spin {
    animation: 2s linear 0s infinite normal none running spin;
}

.spin__cicle {
    stroke-dashoffset: 600;
    stroke-dasharray: 300;
    stroke-width: 12;
    stroke-miterlimit: 10;
    stroke-linecap: round;
    animation: circle 1.6s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite;
    stroke: currentColor;
    fill: transparent;
}

@keyframes spin {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes circle {
    0% {
        stroke-dashoffset: 600;
    }
    100% {
        stroke-dashoffset: 0;
    }
}
</style>
