import React from "react";
import { DatePicker, Form, Select } from "antd";
import { FormCreationData, FormCreationDataOptions } from "./FormCreationData";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";


const { RangePicker } = DatePicker;

interface FormItem<nameType = string> {
    name: nameType
    component: string
    options?: FormCreationDataOptions[]
    label: string
    t: TFunction
}

export const useGenerateForm = (objectForForm: FormCreationData[]) => {

    const { t } = useTranslation();

    let formFields: JSX.Element[] = []
    for (const key in objectForForm) {
        const singleObjectForForm = objectForForm[key];
        const { name, options, component, label } = singleObjectForForm
        if (Array.isArray(name)) {
            formFields = formFields.concat(generateFormItemMultiple({ name, options, component, label, t }))
        } else {
            formFields.push(generateFormItem({ name, options, component, label, t }))
        }
    }
    return formFields;
}


const generateFormItemMultiple = ({ name, component, options, label, t }: FormItem<string[]>) => {
    if (component === "range_picker") {
        return generateFormItem({ name: "date", component, options, label, t })
    } else {
        const nameArray: string[] = name;
        let formFields: JSX.Element[] = []

        nameArray.forEach((currentName) => {
            formFields.push(generateFormItem({ name: currentName, component, options, label, t }))
        })
        return formFields;
    }

}
const generateFormItem = ({ name, component, options, label, t }: FormItem) => {
    return <>
        <Form.Item
            label={t(label)}
            name={name}
            rules={[
                {
                    required: true,
                    message: t("error.required"),
                }]}
        >
            {generateInputField(component, options)}
        </Form.Item>
    </>
}

const generateInputField = (component: string, options: FormCreationDataOptions[] | undefined) => {
    switch (component) {
        case "text":
            return <input/>
        case "textarea":
            return <TextArea/>
        case "range_picker":
            return <RangePicker/>
        case "select": {
            if (options) {
                let formFields: JSX.Element[] = []
                options.forEach(option => formFields.push(
                    <Option value={option.value}>{option.label}</Option>
                ))
                return <Select>{formFields}</Select>;
            }
            return <Select/>
        }
        default :
            return <div>component not implemented</div>
    }
}