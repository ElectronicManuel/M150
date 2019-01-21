import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, CssBaseline, MuiThemeProvider, createMuiTheme, Theme, PaletteType, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { FlashOffRounded, FlashOnRounded } from '@material-ui/icons';
import axios from 'axios';
import './firebase/setup';
import * as firebase from 'firebase';
import { LoginComponent } from './firebase/ui';

type AppState = {
    themeType: PaletteType
    theme: Theme
    authenticated: boolean
}

class App extends React.Component<any, AppState> {
    constructor(props) {
        super(props);

        const defaultTheme: PaletteType = 'dark';

        this.state = {
            themeType: defaultTheme,
            theme: this.getTheme(defaultTheme),
            authenticated: false
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({
                    authenticated: true
                })
            } else {
                this.setState({
                    authenticated: false
                })
            }
        })
    }

    getTheme = (type: PaletteType) => {
        return createMuiTheme({
            palette: {
                type
            },
            typography: {
                useNextVariants: true
            }
        })
    }

    changeTheme = () => {
        const opposite: PaletteType = this.state.themeType === 'dark' ? 'light' : 'dark';
        this.setState({
            themeType: opposite,
            theme: this.getTheme(opposite)
        })
    }

    render() {
        return (
            <MuiThemeProvider theme={this.state.theme}>
                <CssBaseline />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%'
                }}>
                    <div>
                        <AppBar position='relative'>
                            <Toolbar style={{display: 'flex'}}>
                                <Typography variant='h6' color='inherit' noWrap>
                                    eBusiness
                                </Typography>
                                <div style={{flexGrow: 1}} />
                                <div>
                                <IconButton onClick={this.changeTheme} color='inherit'>
                                    {
                                        this.state.themeType === 'dark' ? <FlashOffRounded /> : <FlashOnRounded />
                                    }
                                </IconButton>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div style={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)'
                    }}>
                        <div style={{
                            width: '80%',
                            backgroundColor: this.state.theme.palette.background.default,
                            paddingLeft: '2%',
                            paddingRight: '2%',
                            paddingTop: '1%'
                        }}>
                            <Typography variant='h2'>Webshop</Typography>
                            <Button
                                variant='contained'
                                onClick={async () => {
                                    try {
                                        const result = await axios.get('/test');
                                        alert(result.data);
                                    } catch(err) {
                                        alert(JSON.stringify(err));
                                    }
                            }}>Request</Button>
                            {
                                this.state.authenticated ? <Button variant='contained' onClick={() => firebase.auth().signOut()}>Abmelden</Button> : <LoginComponent />
                            }
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('react-app'));