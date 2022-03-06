package com.mediagenix.api.model

import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity(name = "EVENT")
class Event(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Long,
    var title: String,
    val type: String,
    var description: String,
    var startDate: LocalDate,
    var endDate: LocalDate,
)