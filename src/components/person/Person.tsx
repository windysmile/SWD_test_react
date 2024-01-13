import { ReactElement, useEffect, useRef, useState } from "react"
import './person.scss';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Radio,
    Select,
    Table,
    Space,
    Checkbox,
} from 'antd';
import { IIdCardInput, IPerson, IPersonLists } from "../../interfaces/person";
import { useDispatch, useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import { updatePerson, deletePerson } from "../../store/features/personSlice";
import moment from "moment";
import randomString from "../../store/features/generateKey";
import { CheckboxChangeEvent } from "antd/es/checkbox";



const Person = () => {
    const refs = useRef<any[]>([]);
    const defInput: IIdCardInput[] = [
        { textLenght: 1, text: '' },
        { textLenght: 4, text: '' },
        { textLenght: 5, text: '' },
        { textLenght: 2, text: '' },
        { textLenght: 1, text: '' }
    ]
    const [inputRange, setInputRange] = useState<IIdCardInput[]>(defInput);
    const [form] = Form.useForm();
    const [keys, setKeys] = useState<string[]>([]);
    const personData = useSelector(({ person }) => person?.persons);
    const appDispath = useDispatch();

    const columns: ColumnsType<IPerson> = [
        {
            title: 'ชื่อ',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'เพศ',
            dataIndex: 'gender',
            sorter: (a, b) => a.gender.localeCompare(b.gender)
        },
        {
            title: 'หมายเลขโทรศัพท์มือถือ',
            dataIndex: 'phoneNumber',
            sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber)
        },
        {
            title: 'สัญชาติ',
            dataIndex: 'nationality',
            sorter: (a, b) => a.nationality.localeCompare(b.nationality)
        },
        {
            title: 'จัดการ',
            key: 'action',
            sorter: false,
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => editPerson(record)}>แก้ไข</a>
                    <a onClick={() => appDispath(deletePerson([record.key]))}>ลบ</a>
                </Space>
            ),
        },
    ]

    const handleTextIdCard = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const re = /^[0-9\b]+$/;
        let inputRangeHandle: IIdCardInput[] = inputRange;
        if (e.target.value === '' || re.test(e.target.value)) {
            inputRangeHandle[i].text = e.target.value;
        } else {
            inputRangeHandle[i].text = e.target.value.substring(0, e.target.value.length - 1);
        }
        setInputRange(inputRangeHandle);
        if (inputRangeHandle[i].textLenght === inputRangeHandle[i].text.length) refs.current[i + 1]?.focus()
        if (inputRangeHandle[i].text.length === 0) refs.current[i - 1]?.focus()
    }

    const onFinish = (values: any) => {
        let personData: IPerson = {
            key: values.key || randomString(),
            prefix: values.prefix,
            name: values.fName + " " + values.lName,
            birthDate: moment(values.birthDate).format('MM/DD/YYYY'),
            nationality: values.nationality,
            idCard: (values.idCard1 + values.idCard2 + values.idCard3 + values.idCard4 + values.idCard5) || '',
            gender: values.gender || '',
            zoneNumber: values.zoneNumber,
            phoneNumber: values.phoneNumber,
            passport: values.passport || '',
            expectedSalary: values.expectedSalary || ''
        }
        appDispath(updatePerson(personData))
        form.resetFields();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IPerson[]) => {

            setKeys(selectedRows.map((e: IPerson) => e.key))
        }
    };

    const rowSelectAll = (isSelectAll: CheckboxChangeEvent) => {
        if (isSelectAll.target.checked) {
            setKeys(personData.map((e: IPerson) => e.key))
        } else {
            setKeys([])
        }
    }

    const editPerson = (person: IPerson) => {
        const nameSplit = person.name.split(' ')
        form.setFieldsValue({
            key: person.key,
            prefix: person.prefix,
            fName: nameSplit[0],
            lName: nameSplit[1],
            birthDate: moment(person.birthDate),
            nationality: person.nationality,
            idCard1: person.idCard.substring(0, 1),
            idCard2: person.idCard.substring(1, 5),
            idCard3: person.idCard.substring(5,10),
            idCard4: person.idCard.substring(10,12),
            idCard5: person.idCard.substring(12,13),
            gender: person.gender,
            zoneNumber: person.zoneNumber,
            phoneNumber: person.phoneNumber,
            passport: person.passport || '',
            expectedSalary: person.expectedSalary
        })
    }

    return (
        <div className="swarper-person">
            <Form className="form-person" layout="horizontal" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <div className="liner-list">
                    <Form.Item label="คำนำหน้า" name="prefix" rules={[{ required: true }]}>
                        <Select
                            placeholder="คำนำหน้า"
                            style={{ width: 100 }}
                            options={[
                                { value: 'นาย', label: 'นาย' },
                                { value: 'นาง', label: 'นาง' },
                                { value: 'นางสาว', label: 'นางสาว' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="ชื่อจริง" name="fName" rules={[{ required: true }]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="นามสกุล" name="lName" rules={[{ required: true }]}>
                        <Input type="text" />
                    </Form.Item>
                </div>
                <div className="liner-list">
                    <Form.Item label="วันเกิด" name="birthDate" rules={[{ required: true }]}>
                        <DatePicker format={'MM/DD/YYYY'} placeholder="เดือน/วัน/ปี" />
                    </Form.Item>
                    <Form.Item label="สัญชาติ" name="nationality" rules={[{ required: true }]}>
                        <Select
                            placeholder="--กรุณาเลือก--"
                            style={{ width: 300 }}
                            options={[
                                { value: 'ไทย', label: 'ไทย' },
                                { value: 'ลาว', label: 'ลาว' },
                                { value: 'พม่า', label: 'พม่า' },
                            ]}
                        />
                    </Form.Item>
                </div>
                <div className="liner-list id-card">
                    <Form.Item label="เลขบัตรประชาชน" name="idCard1">
                        <Input
                            type="text"
                            style={{ width: 50 }}
                            value={inputRange[0].text}
                            onChange={(input) => handleTextIdCard(input, 0)}
                            ref={(element) => refs.current[0] = element}
                            maxLength={inputRange[0].textLenght} />
                    </Form.Item><span className="line">-</span>
                    <Form.Item name="idCard2">
                        <Input
                            type="text"
                            style={{ width: 150 }}
                            value={inputRange[1].text}
                            onChange={(input) => handleTextIdCard(input, 1)}
                            ref={(element) => refs.current[1] = element}
                            maxLength={inputRange[1].textLenght} />
                    </Form.Item><span className="line">-</span>
                    <Form.Item name="idCard3">
                        <Input
                            type="text"
                            style={{ width: 150 }}
                            value={inputRange[2].text}
                            onChange={(input) => handleTextIdCard(input, 2)}
                            ref={(element) => refs.current[2] = element}
                            maxLength={inputRange[2].textLenght} />
                    </Form.Item><span className="line">-</span>
                    <Form.Item name="idCard4">
                        <Input
                            type="text"
                            style={{ width: 100 }}
                            value={inputRange[3].text}
                            onChange={(input) => handleTextIdCard(input, 3)}
                            ref={(element) => refs.current[3] = element}
                            maxLength={inputRange[3].textLenght} />
                    </Form.Item><span className="line">-</span>
                    <Form.Item name="idCard5">
                        <Input
                            type="text"
                            style={{ width: 50 }}
                            value={inputRange[4].text}
                            onChange={(input) => handleTextIdCard(input, 4)}
                            ref={(element) => refs.current[4] = element}
                            maxLength={inputRange[4].textLenght} />
                    </Form.Item>
                </div>
                <div className="liner-list">
                    <Form.Item label="เพศ" name="gender" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio value="ผู้ชาย"> ผู้ชาย </Radio>
                            <Radio value="ผู้หญิง"> ผู้หญิง </Radio>
                            <Radio value="ไม่ระบุ"> ไม่ระบุ </Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className="liner-list">
                    <Form.Item label="หมายเลขโทรศัพท์มือถือ" name="zoneNumber" rules={[{ required: true }]}>
                        <Select
                            style={{ width: 100 }}
                            options={[
                                { value: '+66', label: '(+66)' },
                            ]}
                        />
                    </Form.Item><span className="line">-</span>
                    <Form.Item label="" name="phoneNumber" rules={[{ required: true }]}>
                        <Input type="phone" maxLength={10} minLength={10} />
                    </Form.Item>
                </div>
                <div className="liner-list">
                    <Form.Item label="หนังสือเดินทาง" name="passport">
                        <Input type="text" />
                    </Form.Item>
                </div>
                <div className="liner-list">
                    <Form.Item label="เงินเดือนที่คาดหวัง" name="expectedSalary" rules={[{ required: true }]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item name="key">
                        <Input type="hidden" name="key" />
                    </Form.Item>
                    <div className="form-button">
                        <Button className="form-button" onClick={() => form.resetFields()}>ล้างข้อมูล</Button>
                        <Button className="form-button" htmlType="submit">ส่งข้อมูล</Button>
                    </div>
                </div>
            </Form>
            <div className="data-table">
                <div className="input-select-all">
                    <Checkbox onChange={rowSelectAll}>เลือกทั้งหมด</Checkbox>
                    <Button onClick={() => appDispath(deletePerson(keys))}>ล้างข้อมูล</Button>
                </div>
                <Table
                    rowSelection={{ type: 'checkbox', ...rowSelection, selectedRowKeys: keys }}
                    columns={columns}
                    dataSource={personData}
                    scroll={{ x: 500, y: 300 }}
                />
            </div>
        </div>
    )
}

export default Person;