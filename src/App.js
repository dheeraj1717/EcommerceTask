import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { CartPage, HomePage, ProductsServices,ProductDetails, CheckoutPage} from './Routes';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/cart' element={<CartPage/>}/>
    <Route path='/product-details/:title' element={<ProductDetails/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
