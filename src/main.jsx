import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ProductContextProvider } from "./contex/productContext.jsx";
import { FilterContextProvider } from "./contex/FilterProductContext.jsx";
import { CartContextProvider } from "./contex/AddToCartContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { ToastProvider } from "./contex/ToastContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <ProductContextProvider>
      <FilterContextProvider>
        <CartContextProvider>
          <ToastProvider>
            <Provider store={store}>
                <App />
            </Provider>
            
          </ToastProvider>
        </CartContextProvider>
      </FilterContextProvider>
    </ProductContextProvider>
  </Auth0Provider>,
);
