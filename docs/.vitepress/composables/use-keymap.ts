import { useEventListener } from '@vueuse/core'

export function useKeymap<T>(options: {
  escape?: () => void
  keymap: Record<string, T>
  onKey: (value: T) => void
}) {
  const { escape, keymap, onKey } = options

  useEventListener(window, 'keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && escape) {
      escape()

      return
    }

    const value = keymap[e.key]

    if (value !== undefined) {
      onKey(value)
    }
  })
}
