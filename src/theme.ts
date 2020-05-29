const theme =  {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [
        12, 14, 16, 20, 24, 32, 48, 64,
    ],
    palette: {

    },
    colors: {
        background: '#040616',
        level1: '#0e1726',
        text: "#e0e6ed"

    },
    space: [
        0, 4, 8, 16, 32, 64, 128, 256,
    ],
    fonts: {
        sans: 'Nunito',
        heading: 'Nunito, ',
        monospace: 'Nunito, ',
    },
};

export const mq = [576, 768, 992, 1200].map(
    (bp) => `@media (max-width: ${bp}px)`,
  );

export type Theme = typeof theme;

export default theme;