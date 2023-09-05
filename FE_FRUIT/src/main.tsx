import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProductProvider from './provider/ProductProvider.tsx';
import CategoryProvider from './provider/CategoryProvider.tsx';
import UserProvider from './provider/UserProvider.tsx';
import CartProvider from './provider/CartReducer.tsx';
import AuthProvider from './provider/AuthReducer.tsx';
import BillProvider from './provider/BillReducer.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <UserProvider>
      <AuthProvider>
        <BillProvider>
          <CartProvider>
            <ProductProvider>
              <CategoryProvider>
                <App />
                <ToastContainer></ToastContainer>
              </CategoryProvider>
            </ProductProvider>
          </CartProvider>
        </BillProvider>
      </AuthProvider>
    </UserProvider>
  </BrowserRouter >
)
