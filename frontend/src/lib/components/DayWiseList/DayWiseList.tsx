import React from 'react'
import { useValues } from 'kea'
import { List, Typography } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { dayWiseListLogic } from './dayWiseListLogic'
import { HumanFriendlySlotCapacity, humanFriendlyDate } from 'lib/utils'

const { Text } = Typography

const DayWiseList: React.FC = () => {
    const { slotsForAllDays } = useValues(dayWiseListLogic)

    return (
        <div className="pa mt2">
            <List
                dataSource={slotsForAllDays}
                footer
                itemLayout="horizontal"
                renderItem={(item) => (
                    <List.Item actions={[<RightOutlined key="shit" />]} onClick={() => console.log('Clicked')}>
                        <List.Item.Meta
                            title={<Text type={!item.slotCapacity && 'secondary'}>{humanFriendlyDate(item.date)}</Text>}
                        />
                        <div>
                            <HumanFriendlySlotCapacity slotCapacity={item.slotCapacity} />
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default DayWiseList
