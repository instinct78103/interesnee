export function useGlobalVar() {
  return {
    spritePath: new URL('@/assets/icons/sprite.svg', import.meta.url).href,
  };
}