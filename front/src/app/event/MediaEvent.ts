import {Moment  } from "moment";

export interface MediaEvent {
    id?:number,
    title:string,
    type:string,
    startDate:string,
    endDate:string,
    description:string
}

export interface MediaCreateEvent {
    id:number,
    title:string,
    type:string,
    date: Moment[],
    description:string
}