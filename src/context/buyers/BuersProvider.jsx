import { createContext, useState } from "react";

const BuyersContext = createContext();

export const BuyersProvider = ({ children }) => {
    const [allBuyersData, setAllBuyersData] = useState();
    const [selectedBuyer, setSelectedBuyer] = useState(null);
    const [buyersModalOpened, setBuyersModalOpened] = useState(false);
    const [fetchCount, setFetchCount] = useState(0);

    return (
        <BuyersContext.Provider
            value={{
                allBuyersData,
                setAllBuyersData,
                buyersModalOpened,
                setBuyersModalOpened,
                selectedBuyer,
                setSelectedBuyer,
                fetchCount,
                setFetchCount
            }}>
            {children}
        </BuyersContext.Provider>
    );
};

export default BuyersContext;
