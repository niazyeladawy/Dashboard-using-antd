import { Button } from 'antd';
import React, { useContext, useEffect } from 'react'
import BuyersContext from '../../context/buyers/BuersProvider';
import BuersModal from './BuersModal';
import BuyersTable from './BuyersTable'


const Buyers = () => {

    const {buyersModalOpened , setBuyersModalOpened , selectedBuyer} = useContext(BuyersContext);
    
    console.log("first" , selectedBuyer)
    return (
        <div>
            <Button onClick={()=>setBuyersModalOpened(true)} style={{marginBottom:"10px"}} size='large' type='primary'>Add New buyer</Button>
            <BuyersTable />
            {
                buyersModalOpened && <BuersModal/>
            }
        </div>
    )
}

export default Buyers