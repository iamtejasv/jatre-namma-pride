package com.jatre.nammapride.ui.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jatre.nammapride.domain.model.JatreEvent
import com.jatre.nammapride.domain.repository.JatreRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val repository: JatreRepository
) : ViewModel() {

    private val _events = repository.getEvents()
    val ongoingEvent: StateFlow<JatreEvent?> = _events
        .map { events ->
            val now = com.google.firebase.Timestamp.now()
            events.find { it.startTime <= now && it.endTime >= now }
        }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)

    val allEvents = _events.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())
}

@HiltViewModel
class EventViewModel @Inject constructor(
    repository: JatreRepository
) : ViewModel() {
    val events = repository.getEvents()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())
}

@HiltViewModel
class LostFoundViewModel @Inject constructor(
    private val repository: JatreRepository
) : ViewModel() {
    val items = repository.getLostFoundItems()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    private val _uploadStatus = MutableSharedFlow<Result<Unit>>()
    val uploadStatus = _uploadStatus.asSharedFlow()

    fun addItem(description: String, imageBytes: ByteArray?, type: com.jatre.nammapride.domain.model.ItemType) {
        viewModelScope.launch {
            val item = com.jatre.nammapride.domain.model.LostFoundItem(
                description = description,
                type = type
            )
            _uploadStatus.emit(repository.addLostFoundItem(item, imageBytes))
        }
    }

    fun markResolved(itemId: String) {
        viewModelScope.launch {
            repository.markItemResolved(itemId)
        }
    }
}

@HiltViewModel
class MapViewModel @Inject constructor(
    repository: JatreRepository
) : ViewModel() {
    val markers = repository.getSafetyMarkers()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())
}
