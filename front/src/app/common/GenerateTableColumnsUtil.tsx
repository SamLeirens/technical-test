import { ColumnData, FormCreationData } from "./FormCreationData";
import { TFunction } from "i18next";

export const generateColumns = (formProperties: FormCreationData[], t: TFunction) => {
    let column: ColumnData[] = []
    for (const property of formProperties) {
        if (Array.isArray(property.name)) {
            const columnsFromArray: ColumnData[] = [];
            property.name.forEach(value => {
                columnsFromArray.push(
                    {
                        "title": t(value),
                        "dataIndex": value,
                        "key": value
                    }
                )
            })
            column = column.concat(columnsFromArray);
        } else {
            column.push({
                "title": t(property.name),
                "dataIndex": property.name,
                "key": property.name
            })
        }
    }
    return column;
}