import DefaultTheme from 'vitepress/theme'
import './style.css'

export default DefaultTheme

// import DefaultTheme from 'vitepress/theme'

// export default {
//   extends: DefaultTheme,
//   enhanceApp({ app }) {
//     const components = import.meta.glob('../components/*.vue', { eager: true })
//     for (const [path, mod] of Object.entries(components)) {
//       const name = path.split('/').pop()?.replace(/\.vue$/, '') ?? ''
//       if (name) {
//         app.component(name, (mod as { default: unknown }).default)
//       }
//     }
//   },
// }
