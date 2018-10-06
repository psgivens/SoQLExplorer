export type QueryDatasourceIdb = {} & {
    id: number
    title: string
    description: string
    lastUsed: number
    apiKey: string
    apiSecret: string
    url: string
}

export const createDataSource = (
    id: number,
    title: string,
    description: string,
    lastUsed: number,
    apiKey: string,
    apiSecret: string,
    url: string): QueryDatasourceIdb => ({
        apiKey,
        apiSecret,
        description,
        id,
        lastUsed,
        title,        
        url            
    })

export type DatabaseCommand = {
    type: "LOAD_DATA"
  } | {
    type: "INSERT_DATASOURCE"
    item: QueryDatasourceIdb
  } 
  
export type DatabaseEvent = {
    type: "DATA_LOADED"
    datasources: QueryDatasourceIdb[]
} | {
    type: "DATASOURCE_INSERTED"
    item: QueryDatasourceIdb
} | {
    type: "DATABASE_ERROR"
    error: any
}
  