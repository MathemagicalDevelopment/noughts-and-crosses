import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import SetUp from '../components/SetUp';
import Game from '../components/Game';

const Router = (): ReactElement =>
    <BrowserRouter>
        <Routes>
            <Route path="/" Component={SetUp} />
            {/* <Route path="/local" Component={Game} /> */}
            <Route path="/online/:gameId" Component={Game} />
            <Route path="*" element={<div><h1>404</h1></div>} />
        </Routes>
    </BrowserRouter>

export default Router;