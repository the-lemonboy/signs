import type { Config } from 'tailwindcss'

export default {
    content: [
        './**/*.{ts,tsx,js,jsx,html}',
        '../../apps/**/*.{ts,tsx,js,jsx,html}',
        '../../packages/**/*.{ts,tsx,js,jsx,html}'
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: 'hsl(var(--primary))',
                'primary-foreground': 'hsl(var(--primary-foreground))',
                accent: 'hsl(var(--accent))',
                'accent-foreground': 'hsl(var(--accent-foreground))',
                ring: 'hsl(var(--ring))',
                input: 'hsl(var(--input))'
            }
        }
    }
} satisfies Config
