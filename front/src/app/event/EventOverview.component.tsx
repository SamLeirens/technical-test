import React, { useState } from "react";
import { Button, Form, Modal, notification, Table } from "antd";
import { MediaCreateEvent, MediaEvent } from "./MediaEvent";
import { getEventCreationJson } from "./EventDataUtil";
import moment from "moment";
import { generateColumns } from "../common/GenerateTableColumnsUtil";
import { useCreateEvent, useDeleteEvent, useEditEvent, useFetchEvents } from "./Event.service";
import { EventForm } from "./eventForm/EventForm.component";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const EventOverview: React.FunctionComponent = () => {
    const [isCreateEventFormOpen, setIsCreateEventFormOpen] = useState<boolean>(false);
    const [isEditEventFormOpen, setIsEditEventFormOpen] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [selectedEventToEdit, setSelectedEventToEdit] = useState<MediaEvent>();

    const { t } = useTranslation();

    const { data: events, refetch: refetchEvents } = useFetchEvents();

    const { mutate: createEvent } = useCreateEvent({
        onSuccess: async () => {
            setIsCreateEventFormOpen(false);
            notification.success({ message: "Event added" })
            await refetchEvents()
        },
        onError: async () => {
            notification.error({ message: "Event failed to add" })
        }
    })

    const { mutate: editEvent } = useEditEvent({
        onSuccess: async () => {
            setIsEditEventFormOpen(false);
            notification.success({ message: "Event edited" })
            await refetchEvents()
        },
        onError: async () => {
            notification.error({ message: "Event failed to edit" })
        }
    })

    const { mutate: deleteEvent } = useDeleteEvent({
        onSuccess: async () => {
            notification.success({ message: "Event deleted" })
            await refetchEvents()
        },
        onError: async () => {
            notification.error({ message: "Event failed to delete" })
        }
    })


    const handleAddEvent = (event: MediaCreateEvent) => {
        const { title, type, description } = event
        let eventToCreate: MediaEvent = {
            title,
            type,
            startDate: (moment(event.date[0])).format('YYYY-MM-DD'),
            endDate: (moment(event.date[1])).format('YYYY-MM-DD'),
            description
        }
        createEvent(eventToCreate)
    }

    const handleEditEvent = (event: MediaCreateEvent) => {
        const { title, type, description } = event
        let eventToEdit: MediaEvent = {
            id: selectedEventToEdit?.id,
            title,
            type,
            startDate: (moment(event.date[0])).format('YYYY-MM-DD'),
            endDate: (moment(event.date[1])).format('YYYY-MM-DD'),
            description
        }
        editEvent(eventToEdit)
        setSelectedEventToEdit(undefined);
    }

    const handleColumns = () => {
        return [
            ...generateColumns(getEventCreationJson, t),
            {
                title: 'Action',
                key: 'action',
                render: (row: MediaEvent) => (
                    <>
                        <EditOutlined style={{ cursor: "pointer" }} onClick={() => {
                            setSelectedEventToEdit(row);
                            setIsEditEventFormOpen(true);
                        }}/>
                        <DeleteOutlined style={{ cursor: "pointer" }} onClick={() => {
                            if (row.id) deleteEvent(row.id)
                        }}/>
                    </>
                ),
            }
        ]
    }

    return <>
        <Button onClick={() => setIsCreateEventFormOpen(true)}>Create event</Button>

        <Table dataSource={events} columns={handleColumns()}/>
        <Modal
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        handleAddEvent(values);
                        form.resetFields();
                    });
            }}
            onCancel={() => {
                setIsCreateEventFormOpen(false);
                form.resetFields();
            }}
            visible={isCreateEventFormOpen}>
            <EventForm form={form}/>
        </Modal>
        <Modal
            onOk={() => {
                editForm
                    .validateFields()
                    .then((values) => {
                        handleEditEvent(values);
                        editForm.resetFields();
                    });
            }}
            onCancel={() => {
                setIsEditEventFormOpen(false);
                setSelectedEventToEdit(undefined);
                editForm.resetFields();
            }}
            visible={isEditEventFormOpen}>
            <EventForm initialValues={selectedEventToEdit ? {
                id: selectedEventToEdit.id,
                title: selectedEventToEdit.title,
                type: selectedEventToEdit.type,
                date: [moment(selectedEventToEdit.startDate, "YYYY-MM-DD"), moment(selectedEventToEdit.startDate, "YYYY-MM-DD")],
                description: selectedEventToEdit.description
            } as MediaCreateEvent : undefined} form={editForm}/>
        </Modal>
    </>
};