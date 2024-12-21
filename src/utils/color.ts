export const getColorVariants = (baseColor: string) => ({
  light: `${baseColor}15`,
  medium: `${baseColor}40`,
  border: `${baseColor}30`,
  hover: `${baseColor}20`,
  text: baseColor,
});

export const colorOptions = [
  { label: 'Default', value: '#000000' },
  { label: 'Red', value: '#ef4444' },
  { label: 'Green', value: '#22c55e' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Purple', value: '#a855f7' },
  { label: 'Yellow', value: '#eab308' },
] as const;

export type ColorOption = typeof colorOptions[number]; 