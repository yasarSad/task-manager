import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#D0D0D0',
        },
        secondary: {
            main: '#909090',
        },
    },

    Typography: {
        h2: { fontSize: '2rem', fontWeight: 600},
        h3: {fontSize: '1.5rem', fontWeight: 500},
        body1: {fontSize: '1rem'},
    },

    spacing: 8,
});

export default theme;
