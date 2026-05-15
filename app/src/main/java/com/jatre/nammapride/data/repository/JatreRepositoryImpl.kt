package com.jatre.nammapride.data.repository

import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.google.firebase.storage.FirebaseStorage
import com.jatre.nammapride.domain.model.*
import com.jatre.nammapride.domain.repository.JatreRepository
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await
import java.util.*
import javax.inject.Inject

class JatreRepositoryImpl @Inject constructor(
    private val firestore: FirebaseFirestore,
    private val storage: FirebaseStorage
) : JatreRepository {

    override fun getEvents(): Flow<List<JatreEvent>> = callbackFlow {
        val listener = firestore.collection("events")
            .orderBy("startTime", Query.Direction.ASCENDING)
            .addSnapshotListener { snapshot, error ->
                if (error != null) return@addSnapshotListener
                val events = snapshot?.toObjects(JatreEvent::class.java) ?: emptyList()
                trySend(events)
            }
        awaitClose { listener.remove() }
    }

    override fun getLostFoundItems(): Flow<List<LostFoundItem>> = callbackFlow {
        val listener = firestore.collection("lost_found")
            .orderBy("timestamp", Query.Direction.DESCENDING)
            .addSnapshotListener { snapshot, error ->
                if (error != null) return@addSnapshotListener
                val items = snapshot?.toObjects(LostFoundItem::class.java) ?: emptyList()
                trySend(items)
            }
        awaitClose { listener.remove() }
    }

    override fun getSafetyMarkers(): Flow<List<SafetyMarker>> = callbackFlow {
        val listener = firestore.collection("markers")
            .addSnapshotListener { snapshot, error ->
                if (error != null) return@addSnapshotListener
                val markers = snapshot?.toObjects(SafetyMarker::class.java) ?: emptyList()
                trySend(markers)
            }
        awaitClose { listener.remove() }
    }

    override fun getCulturalStories(): Flow<List<CulturalStory>> = callbackFlow {
        val listener = firestore.collection("stories")
            .addSnapshotListener { snapshot, error ->
                if (error != null) return@addSnapshotListener
                val stories = snapshot?.toObjects(CulturalStory::class.java) ?: emptyList()
                trySend(stories)
            }
        awaitClose { listener.remove() }
    }

    override suspend fun addLostFoundItem(item: LostFoundItem, imageBytes: ByteArray?): Result<Unit> = try {
        var imageUrl = ""
        if (imageBytes != null) {
            val ref = storage.reference.child("lost_found/${UUID.randomUUID()}.jpg")
            ref.putBytes(imageBytes).await()
            imageUrl = ref.downloadUrl.await().toString()
        }

        val newItem = item.copy(imageUrl = imageUrl, id = UUID.randomUUID().toString())
        firestore.collection("lost_found").document(newItem.id).set(newItem).await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }

    override suspend fun markItemResolved(itemId: String): Result<Unit> = try {
        firestore.collection("lost_found").document(itemId)
            .update("status", ItemStatus.RESOLVED).await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }
}
