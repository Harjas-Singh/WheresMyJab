import React, { useRef, useState } from 'react'
import { Row, Typography, Select, Radio, Button, Skeleton } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { findSlotsLogic } from './findSlotsLogic'
import './index.scss'
import { useActions, useValues } from 'kea'
import { A } from 'kea-router'

const { Title, Text } = Typography
const { Option } = Select

const FindSlots: React.FC = () => {
    const { states, selectedState, statesLoading, districts, districtsLoading, selectedDistrict, selectedAgeGroup } =
        useValues(findSlotsLogic)

    const { setSelectedState, setSelectedDistrict, setSelectedAgeGroup } = useActions(findSlotsLogic)

    // This will hold reference to `<Select>`
    const stateRef = useRef(null)
    const districtRef = useRef(null)

    const [hidden, setHidden] = useState(false)

    const handleStateChange = (v): void => {
        setSelectedState(v)
        setTimeout(() => {
            stateRef.current.blur()
        }, 20)
    }

    const handleDistrictChange = (v): void => {
        setSelectedDistrict(v)
        setTimeout(() => {
            districtRef.current.blur()
        }, 20)
    }

    return (
        <div>
            <Row justify="center" align="middle" className="title">
                <Title level={2}>WheresMyJab</Title>
            </Row>

            <Row justify="center" align="middle" className="description">
                <Text type="secondary"> Search for vaccination slots • Get real-time data from CoWIN</Text>
            </Row>

            <Row justify="center" align="middle" className="pa">
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Select State"
                    optionFilterProp="title"
                    value={states && selectedState}
                    onChange={handleStateChange}
                    disabled={statesLoading}
                    loading={statesLoading}
                    ref={stateRef}
                    onFocus={() => setHidden(true)}
                    onBlur={() => setHidden(false)}
                    dropdownAlign={{
                        points: ['tl', 'bl'], // align dropdown top-left to bottom-left  of input element
                        offset: [0, 2], // align offset
                        overflow: {
                            adjustX: 0,
                            adjustY: 0, // do not auto flip in y-axis
                        },
                    }}
                >
                    {states &&
                        states.map((state) => (
                            <Option key={state.state_id} value={state.state_id} title={state.state_name}>
                                {state.state_name}
                            </Option>
                        ))}
                </Select>
            </Row>

            <Row justify="center" align="middle" className="pa">
                {districtsLoading ? (
                    <Skeleton active />
                ) : (
                    <Select
                        showSearch
                        style={{ width: '100%', display: selectedState ? 'block' : 'none' }}
                        size="large"
                        placeholder="Select District"
                        optionFilterProp="title"
                        value={districts && selectedDistrict}
                        onChange={handleDistrictChange}
                        ref={districtRef}
                        onFocus={() => setHidden(true)}
                        onBlur={() => setHidden(false)}
                        dropdownAlign={{
                            points: ['tl', 'bl'], // align dropdown top-left to bottom-left  of input element
                            offset: [0, 2], // align offset
                            overflow: {
                                adjustX: 0,
                                adjustY: 0, // do not auto flip in y-axis
                            },
                        }}
                    >
                        {districts &&
                            districts.map((district) => (
                                <Option
                                    key={district.district_id}
                                    value={district.district_id}
                                    title={district.district_name}
                                >
                                    {district.district_name}
                                </Option>
                            ))}
                    </Select>
                )}
            </Row>

            <Row justify="center" align="middle" className="ageGroup">
                <Text type="secondary" style={{ display: selectedDistrict ? 'block' : 'none' }}>
                    Age Group
                </Text>
            </Row>

            <Row justify="center" align="middle" className="radio">
                <Radio.Group
                    value={selectedAgeGroup}
                    onChange={(e) => setSelectedAgeGroup(e.target.value)}
                    style={{ display: selectedDistrict ? 'block' : 'none' }}
                >
                    <Radio value={18}>18+</Radio>
                    <Radio value={45}>45+</Radio>
                </Radio.Group>
            </Row>

            <Row justify="center" align="middle" className="radio">
                <A href="/listAllSlots">
                    <Button
                        type="primary"
                        shape="round"
                        size="large"
                        disabled={!selectedState || !selectedDistrict || !selectedAgeGroup}
                    >
                        Search Slots
                    </Button>
                </A>
            </Row>

            <Row justify="center" align="middle" className="footer" style={{ display: hidden ? 'none' : 'flex' }}>
                <HeartOutlined className="heart" />
                <Text type="secondary"> Inspired by - www.vaccinateme.in </Text>
                <HeartOutlined className="heart" />
            </Row>
        </div>
    )
}

export default FindSlots
