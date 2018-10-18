import { CrudlDatabaseCommandBase, CrudlDatabaseEventBase } from 'src/jscommon/data/CrudlDomainCommands'
export type CrudlTableName = 
    "Datasources" 

export type CrudlDomainValues = 
    "Datasources"

// These are not real examples. They demonstrate how to extend the message 
// passing to handle any type of event you can dream up. These commands 
// can be sent, and received, from your custom Saga.
export type CrudlDatabaseCommand = CrudlDatabaseCommandBase | {
    type: "Follow_Your_Heart"
}        
export type CrudlDatabaseEvent = CrudlDatabaseEventBase | {
    type: "Heart_Followed"
}