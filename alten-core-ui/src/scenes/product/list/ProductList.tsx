import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import productActions from '../redux/actions';
import ProductListComponent from './ProductListComponent';

const ProductList = () => {
    useDocumentTitle('Alten Project - Products');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const refreshPageContent = () => dispatch(productActions.listProducts());

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <ProductListComponent refreshPageContent={refreshPageContent} />;
};

export default ProductList;
