import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Chat from './Pages/Chat';
import People from './Pages/People';
const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='/people' element={<People />} />
            </Routes>
        </Layout>
    );
}

export default App;