package com.mediagenix.api.repo

import com.mediagenix.api.model.Event
import org.springframework.data.repository.CrudRepository

interface EventRepo:CrudRepository<Event,Long> {
}