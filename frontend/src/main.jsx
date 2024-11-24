import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux'; // Import Redux Provider
import App from './app';
import { AppProvider } from './context/AppContext';
import store from './redux/store'; // Import the Redux store

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ReduxProvider store={store}> {/* Wrap your app with ReduxProvider */}
        <AppProvider>
            <HelmetProvider>
                <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <App />
                    </Suspense>
                </BrowserRouter>
            </HelmetProvider>
        </AppProvider>
    </ReduxProvider>
);
