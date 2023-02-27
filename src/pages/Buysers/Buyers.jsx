import { Button } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import BuyersContext from '../../context/buyers/BuersProvider';
import BuersModal from './BuersModal';
import BuyersTable from './BuyersTable';


const Buyers = () => {

    const {buyersModalOpened , setBuyersModalOpened , selectedBuyer} = useContext(BuyersContext);
    
    const {t} = useTranslation();
    
    return (
        <div>
            <Button onClick={()=>setBuyersModalOpened(true)} style={{marginBottom:"10px"}} size='large' type='primary'>{t('buyers_page.add_btn')}</Button>
            <BuyersTable />
            {
                buyersModalOpened && <BuersModal/>
            }
        </div>
    )
}

export default Buyers