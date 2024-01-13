import './manageshape.scss'
import {
    Button
} from 'antd';
import { CaretLeftOutlined, CaretUpOutlined, CaretDownOutlined, CaretRightOutlined, AndroidFilled, AppleFilled, WindowsFilled, ChromeFilled, GithubFilled, AliwangwangFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';


function ManageShape() {
    const [icons, setIcons] = useState<any[]>([
        <AndroidFilled style={{ fontSize: '5rem' }} />,
        <AppleFilled style={{ fontSize: '5rem' }} />,
        <WindowsFilled style={{ fontSize: '5rem' }} />,
        <ChromeFilled style={{ fontSize: '5rem' }} />,
        <GithubFilled style={{ fontSize: '5rem' }} />,
        <AliwangwangFilled style={{ fontSize: '5rem' }} />
    ])
    const [offsetIndex, setOffsetIndex] = useState(0);

    const handleOffset = () => {
        setOffsetIndex((offsetIndex) => offsetIndex === 0 ? 3 : 0);
    }

    const renderColItemIcon = icons.map((item: any, index) =>
        <Col key={index} span={6} offset={index === offsetIndex ? 6 : 0}>
            <Button key={index} icon={item} />
        </Col>
    );

    const handleMoveLeftIcon = () => {
        const firstIndex = icons[0];
        const newIcons = icons.splice(1, icons.length);
        newIcons.push(firstIndex)
        setIcons(newIcons)
    }

    const handleMoveRightIcon = () => {
        const lastIndex = icons[icons.length-1];
        const newIcons = icons.splice(0, icons.length-1);
        newIcons.splice(0, 0, lastIndex);
        setIcons(newIcons)
    }

    useEffect(() => {
    }, [])

    return (
        <div className='swarper-shape'>
            <div className='buttons-control'>
                <div className='box-unwrap'>
                    <Button icon={<CaretLeftOutlined style={{ fontSize: '8rem' }} />} onClick={handleMoveLeftIcon} />
                    <Button icon={[<CaretUpOutlined style={{ fontSize: '8rem' }} />, <CaretDownOutlined style={{ fontSize: '8rem' }} />]} onClick={handleOffset} />
                    <Button icon={<CaretRightOutlined style={{ fontSize: '8rem' }}  onClick={handleMoveRightIcon}/>} />
                </div>
            </div>
            <div className='grid-shape'>
                <div className='box-list-shape'>
                    <Row justify={'center'}>
                        {renderColItemIcon}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default ManageShape;