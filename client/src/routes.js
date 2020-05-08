import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'

export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage></LinksPage>
                </Route>
                <Route path="/create" exact>
                    <CreatePage></CreatePage>
                </Route>
                <Route path="/detail/:id">
                    <DetailPage></DetailPage>
                </Route>
                <Redirect to="/create"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact >
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}