import React from 'react';
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import GlboalStyle from '../src/styles/global'
import Header from './components/header'
import Routes from './routes';
import './config/ReactotronConfig'
import { ToastContainer } from 'react-toastify'
import history from './services/history'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <GlboalStyle />
        <Routes />
        <ToastContainer />
      </Router>
    </Provider>
  )
}

export default App;
