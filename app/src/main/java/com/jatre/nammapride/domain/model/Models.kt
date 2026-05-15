package com.jatre.nammapride.domain.model

import com.google.firebase.Timestamp

data class JatreEvent(
    val id: String = "",
    val title: String = "",
    val description: String = "",
    val startTime: Timestamp = Timestamp.now(),
    val endTime: Timestamp = Timestamp.now()
)

data class LostFoundItem(
    val id: String = "",
    val imageUrl: String = "",
    val description: String = "",
    val status: ItemStatus = ItemStatus.ACTIVE,
    val timestamp: Timestamp = Timestamp.now(),
    val contactName: String = "",
    val contactPhone: String = "",
    val type: ItemType = ItemType.LOST
)

enum class ItemStatus {
    ACTIVE, RESOLVED
}

enum class ItemType {
    LOST, FOUND
}

data class SafetyMarker(
    val id: String = "",
    val title: String = "",
    val type: MarkerType = MarkerType.PARKING,
    val latitude: Double = 0.0,
    val longitude: Double = 0.0
)

enum class MarkerType {
    PARKING, FIRST_AID
}

data class CulturalStory(
    val id: String = "",
    val title: String = "",
    val content: String = "",
    val imageUrl: String = ""
)
