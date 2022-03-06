import { MediaEvent } from "./MediaEvent";
import { useMutation, UseMutationOptions, useQuery } from "react-query";


export const useFetchEvents = () => useQuery('get events', () => fetch("http://localhost:8080/event", {
    "method": "GET",
}).then(response => {
    return response.json();
}))

export const useCreateEvent = (options: UseMutationOptions<any, any, MediaEvent> = {}) => useMutation('create event', (event: MediaEvent) => fetch("http://localhost:8080/event", {
    "method": "POST",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json"
    },
    "body": JSON.stringify(event)
}).then(response => {
    return response.json();
}), {
    ...options
})

export const useDeleteEvent = (options: UseMutationOptions<any, any, number> = {}) => useMutation('delete event', (id: number) => fetch("http://localhost:8080/event/" + id, {
    "method": "DELETE"
}).then(response => {
    console.log(response);
}), {
    ...options
})

export const useEditEvent = (options: UseMutationOptions<any, any, MediaEvent> = {}) => useMutation('create event', (event: MediaEvent) => fetch("http://localhost:8080/event", {
    "method": "PUT",
    "headers": {
        "content-type": "application/json",
        "accept": "application/json"
    },
    "body": JSON.stringify(event)
}).then(response => {
    return response.json();
}), {
    ...options
})