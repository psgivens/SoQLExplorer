import * as React from 'react';


type AttributeProps = {} & {
    name: string
    value: any
}

const Hidden:React.SFC<AttributeProps> = ({
    name,
    value
}:AttributeProps) => {
    return <input 
            name={name}
            value={value}
            type="hidden" />
}

export default Hidden 