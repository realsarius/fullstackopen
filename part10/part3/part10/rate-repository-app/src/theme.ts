import { Platform } from 'react-native';

interface Theme {
    colors: {
        textPrimary: string;
        textSecondary: string;
        primary: string;
        backgroundColor: string;
    };
    fontSizes: {
        body: number;
        subheading: number;
    };
    fonts: {
        main: string;
    };
    fontWeights: {
        normal: 'normal' | '400';
        bold: 'bold' | '700';
    };
}

const theme: Theme = {
    colors: {
        textPrimary: '#24292e', // Dark text for good contrast on light background
        textSecondary: '#586069', // Subtle gray for secondary text
        primary: '#0366d6', // Blue for primary action
        backgroundColor: '#ffffff', // White background
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fonts: {
        // Set the font family based on the platform
        main: Platform.OS === 'android' ? 'Roboto' : Platform.OS === 'ios' ? 'Arial' : 'System',
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;
