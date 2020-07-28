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
import PlayParty from './Components/PlayParty/PlayParty'
import MusicPlayer from './Components/MusicPlayer/MusicPlayer'
import SpotifyFooter from './Containers/SpotifyFooter/SpotifyFooter'
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";


const Routes = () => {

    return (
        <Route path="/" component={PartySelection}>
            {/* <Route component={PartySelection} /> */}
            {/* <Redirect
                exact
                from="/"
                to="/party-selection"
            /> */}

            <Route
                component={PartySelection}
                exact
                // layout={PartySelection}
                path="/party-selection"
            />
            <Route
                component={PlayParty}
                exact
                // layout={PlayParty}
                path="/play-coreography"
            />
            <Route
                component={Editor}
                exact
                // layout={Editor}
                path="/make-coreography"
            />
        </ Route>
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
