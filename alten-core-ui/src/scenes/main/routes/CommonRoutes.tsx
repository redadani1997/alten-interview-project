import { Navigate, Route, Routes } from 'react-router';
import NotFoundPage from 'scenes/404/NotFoundPage';
import BasketProductList from 'scenes/basket/list/BasketProductList';
import Contact from 'scenes/contact/Contact';
import ProductList from 'scenes/product/list/ProductList';
import CommonRoutesHoc from './CommonRoutesHoc';

const CommonRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route
                path="/admin"
                element={
                    <CommonRoutesHoc activeLink={{ id: 'ADMIN' }}>
                        <ProductList />
                    </CommonRoutesHoc>
                }
            />
            <Route
                path="/contact"
                element={
                    <CommonRoutesHoc activeLink={{ id: 'CONTACT' }}>
                        <Contact />
                    </CommonRoutesHoc>
                }
            />
            <Route
                path="/basket"
                element={
                    <CommonRoutesHoc activeLink={{ id: 'BASKET' }}>
                        <BasketProductList />
                    </CommonRoutesHoc>
                }
            />

            <Route
                path="*"
                element={
                    <CommonRoutesHoc activeLink={{ id: 'NOT_FOUND' }}>
                        <NotFoundPage />
                    </CommonRoutesHoc>
                }
            />
        </Routes>
    );
};
export default CommonRoutes;
