import { faArrowTrendDown, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Statistic } from 'antd';
import React from 'react';
import CountUp from 'react-countup';

const formatter = (value) => <CountUp end={value} separator="," duration={1.5} />;


const StaticsChart = () => {
    return (
        <div>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-3 mb-3'>
                    <Card bordered={false}>
                        <Statistic
                            title="New Users"
                            value={11.28}
                            precision={2}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                            formatter={formatter}
                            prefix={<FontAwesomeIcon icon={faArrowTrendUp} />}
                            suffix="%"
                        />
                    </Card>
                </div>
                <div className='col-12 col-md-6 col-lg-3 mb-3'>
                    <Card bordered={false}>
                        <Statistic
                            title="Free users"
                            value={9.3}
                            precision={2}
                            valueStyle={{
                                color: '#cf1322',
                            }}
                            prefix={<FontAwesomeIcon icon={faArrowTrendDown} />}
                            suffix="%"
                            formatter={formatter}
                        />
                    </Card>
                </div>
                <div className='col-12 col-md-6 col-lg-3 mb-3'>
                    <Card bordered={false}>
                        <Statistic
                            title="New Orders"
                            value={3510}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                            prefix={<FontAwesomeIcon icon={faArrowTrendUp} />}
                            formatter={formatter}
                        />
                    </Card>
                </div>
                <div className='col-12 col-md-6 col-lg-3 mb-3'>
                    <Card bordered={false}>
                        <Statistic
                            title="New Buyers"
                            value={120}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                            prefix={<FontAwesomeIcon icon={faArrowTrendUp} />}
                            formatter={formatter}
                        />
                    </Card>
                </div>
            </div>
        </div>

    )
}

export default StaticsChart