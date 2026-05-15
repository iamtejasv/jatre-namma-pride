package com.jatre.nammapride.di

import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.storage.FirebaseStorage
import com.jatre.nammapride.data.repository.JatreRepositoryImpl
import com.jatre.nammapride.domain.repository.JatreRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideFirestore(): FirebaseFirestore = FirebaseFirestore.getInstance()

    @Provides
    @Singleton
    fun provideStorage(): FirebaseStorage = FirebaseStorage.getInstance()

    @Provides
    @Singleton
    fun provideJatreRepository(
        firestore: FirebaseFirestore,
        storage: FirebaseStorage
    ): JatreRepository = JatreRepositoryImpl(firestore, storage)
}
