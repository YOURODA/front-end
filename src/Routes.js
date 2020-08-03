import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Route, IndexRoute } from 'react-router';
// Layout Types
// import { DefaultLayout } from './layouts';
import RouteWithLayout from './Components/RouteWithLayout/RouteWithLayout';
// import MainLayout from './layouts/Main/Main';
// import MinimalLayout from './layouts/Minimal/Minimal';

// Route Views
import CreateCor from './Components/CoreographyNew/CreateCor'
import Editor from './Components/Editor/Editor'
import PartySelection from './Components/PartySelection/PartySelection'
import PlayCoreography from './Components/PlayCoreography/PlayCoreography'
import MusicPlayer from './Components/MusicPlayer/MusicPlayer'
import SpotifyFooter from './Containers/SpotifyFooter/SpotifyFooter'
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";


const Routes = () => {

    return (
        <Switch>
            <Redirect
                exact
                from="/"
                to="/party-selection"
            />

            <RouteWithLayout
                // component={PartySelection}
                exact
                layout={PartySelection}
                path="/party-selection"
            />
            <RouteWithLayout
                // component={PlayParty}
                exact
                layout={PlayCoreography}
                path="/play-coreography"
            />
            <RouteWithLayout
                component={Editor}
                exact
                layout={Editor}
                path="/make-coreography"
            />
        </Switch>
    );
    {/* ),
    {
        path: '/party-selection',
        layout: PartySelection,
        component: PartySelection,
    },
    {
        path: '/make-coreography',
        layout: Editor,
        component: Editor,
    },
    {
        path: '/play-coreography',
        layout: PlayParty,
        component: PlayParty,
    },
        // {
        //     path: '/coreography',
        //     layout: Editor,
        //     component: Editor,
        // }
    
} */}
}

export default Routes;
