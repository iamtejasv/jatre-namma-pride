package com.jatre.nammapride.domain.repository

import com.jatre.nammapride.domain.model.CulturalStory
import com.jatre.nammapride.domain.model.JatreEvent
import com.jatre.nammapride.domain.model.LostFoundItem
import com.jatre.nammapride.domain.model.SafetyMarker
import kotlinx.coroutines.flow.Flow

interface JatreRepository {
    fun getEvents(): Flow<List<JatreEvent>>
    fun getLostFoundItems(): Flow<List<LostFoundItem>>
    fun getSafetyMarkers(): Flow<List<SafetyMarker>>
    fun getCulturalStories(): Flow<List<CulturalStory>>
    suspend fun addLostFoundItem(item: LostFoundItem, imageBytes: ByteArray?): Result<Unit>
    suspend fun markItemResolved(itemId: String): Result<Unit>
}
