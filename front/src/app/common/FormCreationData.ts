export interface FormCreationData {
    name: string[] | string,
    component: string,
    label:string,
    options?: FormCreationDataOptions[]
}

export interface FormCreationDataOptions {
    label: string,
    value: string
}

export interface ColumnData{
    title: string,
    dataIndex: string,
    key: string
}