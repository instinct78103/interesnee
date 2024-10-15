<template>
  <svg :class="[$style.icon, { [$style.active]: isActive }]" symbol="icon-placemark">
    <filter id="filter" x="-6.8%" y="-11.1%" width="113.7%" height="122.2%" filterUnits="objectBoundingBox">
      <feGaussianBlur stdDeviation="1" in="SourceGraphic" />
    </filter>
    <defs>
      <linearGradient id="default" x1="0%" y1="0%" x2="50%" y2="100%">
        <stop stop-color="#C40E0E" offset="0%" />
        <stop stop-color="#F75050" offset="100%" />
      </linearGradient>
      <linearGradient id="active" x1="0%" y1="0%" x2="50%" y2="100%">
        <stop stop-color="#0058A4" offset="0%" />
        <stop stop-color="#036CC7" offset="100%" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script>
export default {
  name: 'HomeMapMark',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" module>
//@import '../styles/variables';

$default-gradient: url('#default');
$active-gradient: url('#active');

.icon {
  width: 44px;
  height: 44px;
  fill: $default-gradient;
  transition: fill 0.3s;
}

.icon.active {
  fill: $active-gradient;
}
</style>
