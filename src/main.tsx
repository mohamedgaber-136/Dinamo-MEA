import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './Redux/Store';
import { PostDataProvider } from './Context/PostData.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PostDataProvider>
        <App />
      </PostDataProvider>
    </Provider>
  </StrictMode>,
)