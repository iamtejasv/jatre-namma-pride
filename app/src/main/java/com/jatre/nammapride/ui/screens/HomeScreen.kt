package com.jatre.nammapride.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Event
import androidx.compose.material.icons.filled.Map
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.jatre.nammapride.domain.model.JatreEvent
import com.jatre.nammapride.ui.components.FestiveHeader
import com.jatre.nammapride.ui.components.JatreCard
import com.jatre.nammapride.ui.theme.FestiveOrange
import com.jatre.nammapride.ui.theme.FestiveRed
import com.jatre.nammapride.ui.viewmodels.HomeViewModel

@Composable
fun HomeScreen(
    onNavigateToEvents: () -> Unit,
    onNavigateToLostFound: () -> Unit,
    onNavigateToMap: () -> Unit,
    onNavigateToStories: () -> Unit,
    viewModel: HomeViewModel = hiltViewModel()
) {
    val ongoingEvent by viewModel.ongoingEvent.collectAsState()
    val allEvents by viewModel.allEvents.collectAsState()

    Scaffold(
        topBar = { FestiveHeader("Jatre Namma Pride") }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            item {
                OngoingEventHighlight(ongoingEvent)
            }

            item {
                QuickActions(
                    onEvents = onNavigateToEvents,
                    onLostFound = onNavigateToLostFound,
                    onMap = onNavigateToMap,
                    onStories = onNavigateToStories
                )
            }

            item {
                Text(
                    text = "Upcoming Events",
                    modifier = Modifier.padding(16.dp),
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = FestiveRed
                )
            }

            items(allEvents.take(3)) { event ->
                EventSmallCard(event)
            }
        }
    }
}

@Composable
fun OngoingEventHighlight(event: JatreEvent?) {
    JatreCard(
        modifier = Modifier.padding(16.dp)
    ) {
        Column {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Surface(
                    color = FestiveRed.copy(alpha = 0.1f),
                    shape = CircleShape
                ) {
                    Text(
                        text = "LIVE NOW",
                        color = FestiveRed,
                        fontWeight = FontWeight.Bold,
                        fontSize = 10.sp,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
                Text(
                    text = "Mahotsava Guide",
                    color = Color.Gray,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            Spacer(modifier = Modifier.height(12.dp))
            if (event != null) {
                Text(
                    text = event.title,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color(0xFF2D2D2D)
                )
                Text(
                    text = event.description,
                    fontSize = 14.sp,
                    color = Color.Gray,
                    modifier = Modifier.padding(top = 4.dp)
                )
            } else {
                Text(
                    text = "Stay Tuned for Next Event",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF2D2D2D)
                )
                Text(
                    text = "Checking real-time schedule...",
                    fontSize = 14.sp,
                    color = Color.Gray
                )
            }
        }
    }
}

@Composable
fun QuickActions(
    onEvents: () -> Unit,
    onLostFound: () -> Unit,
    onMap: () -> Unit,
    onStories: () -> Unit,
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        ActionButton("Events", Icons.Default.Event, onEvents)
        ActionButton("Map", Icons.Default.Map, onMap)
        ActionButton("Lost & Found", Icons.Default.Search, onLostFound)
        ActionButton("Stories", Icons.Default.Event, onStories)
    }
}

@Composable
fun ActionButton(label: String, icon: ImageVector, onClick: () -> Unit) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .padding(4.dp)
            .clickable { onClick() }
    ) {
        Surface(
            shape = RoundedCornerShape(16.dp),
            color = Color.White,
            shadowElevation = 4.dp,
            modifier = Modifier.size(64.dp)
        ) {
            Box(contentAlignment = Alignment.Center) {
                Icon(
                    imageVector = icon,
                    contentDescription = label,
                    tint = FestiveOrange,
                    modifier = Modifier.size(28.dp)
                )
            }
        }
        Text(
            text = label,
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF2D2D2D),
            modifier = Modifier.padding(top = 8.dp)
        )
    }
}

@Composable
fun EventSmallCard(event: JatreEvent) {
    JatreCard(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(text = event.title, fontWeight = FontWeight.Bold)
                Text(text = "Starts at: ${event.startTime.toDate().toLocaleString()}", fontSize = 12.sp)
            }
            Icon(Icons.Default.Event, contentDescription = null, tint = FestiveOrange)
        }
    }
}
