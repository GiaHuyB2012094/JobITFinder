import { Descriptions } from "antd";
import { memo } from "react";
const Description = memo((props) => {
  return (
    <Descriptions  
        title={props.title}
        layout={props.layout} 
        items={props.items} 
        bordered
        column={props.column}
    />
  )
});
Description.displayName = "Description"
export default Description
