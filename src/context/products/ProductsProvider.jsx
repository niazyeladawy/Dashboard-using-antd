import { createContext, useState } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [allProductsData, setAllProductsData] = useState();
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [ProductsModalOpened, setProductsModalOpened] = useState(false);
    const [fetchCount, setFetchCount] = useState(0);

    return (
        <ProductsContext.Provider
            value={{
                allProductsData,
                setAllProductsData,
                ProductsModalOpened,
                setProductsModalOpened,
                selectedProducts,
                setSelectedProducts,
                fetchCount,
                setFetchCount
            }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContext;
