import * as React from 'react';
import { ApplicationState, mapDispatch, mapAppState } from './_redux';
import { connect } from 'react-redux';
import { MuiThemeProvider, PaletteType, Theme, createMuiTheme, CssBaseline } from '@material-ui/core';
import { Layout } from './layout';

export type ThemeState = {
    themeType: PaletteType
    theme: Theme
}

class ThemeHandlerBase extends React.Component<ApplicationState, ThemeState> {
    constructor(props) {
        super(props);

        let defaultTheme: PaletteType = 'light';
        let storedTheme = window.localStorage.getItem('theme');
        if(storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) defaultTheme = storedTheme as PaletteType;

        this.state = {
            themeType: defaultTheme,
            theme: this.getTheme(defaultTheme)
        }
    }

    getTheme = (type: PaletteType) => {
        return createMuiTheme({
            palette: {
                type
            },
            typography: {
                useNextVariants: true
            },
            overrides: {
                MuiButton: {
                    root: {
                        textTransform: 'none'
                    }
                }
            }
        })
    }

    changeTheme = () => {
        const opposite: PaletteType = this.state.themeType === 'dark' ? 'light' : 'dark';
        this.setState({
            themeType: opposite,
            theme: this.getTheme(opposite)
        });
        window.localStorage.setItem('theme', opposite);
    }

    render() {
        return (
            <MuiThemeProvider theme={this.state.theme}>
                <CssBaseline />
                <Layout changeTheme={this.changeTheme} theme={this.state.theme} />
            </MuiThemeProvider>
        )
    }
}

export const ThemeHandler = connect(mapAppState, mapDispatch)(ThemeHandlerBase);