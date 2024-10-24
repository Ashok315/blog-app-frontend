import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider} from 'react-redux'
import {store, persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './components/ThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
       <ThemeProvider>
         <App />
       </ThemeProvider>         
       <ToastContainer theme='colored'></ToastContainer>
    </PersistGate>
  </Provider>  
)
