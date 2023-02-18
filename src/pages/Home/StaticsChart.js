
import { Card, Statistic } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiTrendingUp } from 'react-icons/bi';
import { BiTrendingDown } from 'react-icons/bi';

import CountUp from 'react-countup';

const formatter = (value) => <CountUp end={value} separator="," duration={1.5} />;


const StaticsChart = () => {

    const {t} =useTranslation()

    return (
        <div>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-3 mb-3'>
                    <Card bordered={false}>
                        <Statistic
                            title={t('home.nusers')}
                            value={11.28}
                            precision={2}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                            formatter={formatter}
                            prefix={<BiTrendingUp/>}
                            suffix="%"
                        />
                    </Card>
                </div>
                <div className='col-12 col-md-6 col-lg-3 mb-3'>
                    <Card bordered={false}>
                        <Statistic
                            title={t('home.fusers')}
                            value={9.3}
                            precision={2}
                            valueStyle={{
                                color: '#cf1322',
                            }}
                            prefix={<BiTrendingDown/>}
                            suffix="%"
                            formatter={formatter}
                        />
                    </Card>
                </div>
                <div className='col-12 col-md-6 col-lg-3 mb-3'>
                    <Card bordered={false}>
                        <Statistic
                            title={t('home.norders')}
                            value={3510}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                            prefix={<BiTrendingUp/>}
                            formatter={formatter}
                        />
                    </Card>
                </div>
                <div className='col-12 col-md-6 col-lg-3 mb-3'>
                    <Card bordered={false}>
                        <Statistic
                            title={t('home.nbuyers')}
                            value={120}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                            prefix={<BiTrendingUp/>}
                            formatter={formatter}
                        />
                    </Card>
                </div>
            </div>
        </div>

    )
}

export default StaticsChart