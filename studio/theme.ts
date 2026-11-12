import { buildLegacyTheme } from 'sanity'

// VRM brand: deep navy and amber, square corners (see the website's design system).
export const vrmTheme = buildLegacyTheme({
  '--black': '#011f41',
  '--white': '#ffffff',
  '--gray': '#5a6a82',
  '--gray-base': '#5a6a82',
  '--component-bg': '#ffffff',
  '--component-text-color': '#011f41',
  '--brand-primary': '#011f41',
  '--default-button-color': '#5a6a82',
  '--default-button-primary-color': '#d4952a',
  '--default-button-success-color': '#2f8a3e',
  '--default-button-warning-color': '#b87c17',
  '--default-button-danger-color': '#b3261e',
  '--state-info-color': '#14407a',
  '--state-success-color': '#2f8a3e',
  '--state-warning-color': '#d4952a',
  '--state-danger-color': '#b3261e',
  '--main-navigation-color': '#011f41',
  '--main-navigation-color--inverted': '#ffffff',
  '--focus-color': '#d4952a',
  '--font-family-base': "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  '--font-family-monospace': "'IBM Plex Mono', ui-monospace, Menlo, monospace",
})
