import { Table } from "antd";
import { useState } from "react";

const TableSelect = (props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
      const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };

  return (
    <div>
      <Table 
        bordered 
        rowSelection={rowSelection} 
        columns={props.columns} 
        dataSource={props.dataSource} 
        />
    </div>
  )
}

export default TableSelect
