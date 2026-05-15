package com.jatre.nammapride.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.jatre.nammapride.domain.model.CulturalStory
import com.jatre.nammapride.ui.components.JatreCard
import com.jatre.nammapride.ui.theme.FestiveRed

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CulturalStoriesScreen(
    onBack: () -> Unit
) {
    // Standard stories for Jatre
    val stories = listOf(
        CulturalStory("1", "Legend of the Village Fair", "Long ago, a village saint saved the town from plague. This fair celebrates his legacy every year with devotion and pride.", ""),
        CulturalStory("2", "Traditional Folk Dance", "The Dolu Kunitha is a traditional dance performed during Jatre, symbolizing power and rhythm.", "")
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Cultural Stories") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = FestiveRed,
                    titleContentColor = Color.White,
                    navigationIconContentColor = Color.White
                )
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            items(stories) { story ->
                StoryCard(story)
            }
        }
    }
}

@Composable
fun StoryCard(story: CulturalStory) {
    JatreCard {
        Column {
            if (story.imageUrl.isNotEmpty()) {
                AsyncImage(
                    model = story.imageUrl,
                    contentDescription = null,
                    modifier = Modifier.fillMaxWidth().height(180.dp),
                    contentScale = ContentScale.Crop
                )
            }
            Text(text = story.title, fontSize = 20.sp, fontWeight = FontWeight.Bold, color = FestiveRed)
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = story.content, fontSize = 16.sp, lineHeight = 22.sp)
        }
    }
}
