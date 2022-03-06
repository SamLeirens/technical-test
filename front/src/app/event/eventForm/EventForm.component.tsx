import React, { useEffect } from "react";
import { Form, FormInstance } from "antd";
import { getEventCreationJson } from "../EventDataUtil";
import { useGenerateForm } from "../../common/GenerateFormUtil";
import { MediaCreateEvent } from "../MediaEvent";

interface EventFormProps {
    form: FormInstance,
    initialValues?: MediaCreateEvent
}

export const EventForm: React.FunctionComponent<EventFormProps> = ({ form, initialValues }) => {

    const formFields = useGenerateForm(getEventCreationJson);
    useEffect(() => form.resetFields(), [initialValues, form]);
    return <>
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 3, }}
            wrapperCol={{ span: 10 }}
            autoComplete="off"
            initialValues={initialValues}
        >
            {formFields}
        </Form>
    </>
};