package com.mediagenix.api.service

import com.mediagenix.api.model.Event
import com.mediagenix.api.repo.EventRepo
import org.springframework.stereotype.Service

@Service
class EventService(val repo: EventRepo) {
    fun getAll(): MutableIterable<Event> = repo.findAll()
    fun createEvent(event: Event) = repo.save(event)
    fun deleteEvent(id: Long) = repo.deleteById(id)
    fun updateEvent(event: Event) : Event {
        return repo.findById(event.id)
            .map { ev: Event ->
                ev.description = event.description
                ev.title = event.title
                ev.startDate = event.startDate
                ev.endDate = event.endDate
                repo.save(ev)
            }
            .orElseGet {
                event.id = event.id
                repo.save(event)
            }

    }
}