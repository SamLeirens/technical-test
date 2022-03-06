package com.mediagenix.api.controller

import com.mediagenix.api.model.Event
import com.mediagenix.api.service.EventService
import org.springframework.web.bind.annotation.*

@RestController
class EventController(val service: EventService) {

    @GetMapping("/event")
    fun getEventFormCreationData() = service.getAll()

    @PostMapping("/event")
    fun createEvent(@RequestBody event: Event) = service.createEvent(event)

    @DeleteMapping("/event/{id}")
    fun deleteEvent(@PathVariable id: Long) {
        service.deleteEvent(id)
    }

    @PutMapping("/event")
    fun updateEvent(@RequestBody event: Event) = service.updateEvent(event)

}