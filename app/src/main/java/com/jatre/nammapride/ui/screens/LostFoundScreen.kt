package com.jatre.nammapride.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import coil.compose.AsyncImage
import com.jatre.nammapride.domain.model.ItemStatus
import com.jatre.nammapride.domain.model.LostFoundItem
import com.jatre.nammapride.ui.components.JatreCard
import com.jatre.nammapride.ui.theme.FestiveOrange
import com.jatre.nammapride.ui.theme.FestiveRed
import com.jatre.nammapride.ui.viewmodels.LostFoundViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LostFoundScreen(
    onBack: () -> Unit,
    onNavigateToAdd: () -> Unit,
    viewModel: LostFoundViewModel = hiltViewModel()
) {
    val items by viewModel.items.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Lost & Found") },
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
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = onNavigateToAdd,
                containerColor = FestiveOrange,
                contentColor = Color.White
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Item")
            }
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            items(items) { item ->
                LostFoundItemCard(item, onMarkResolved = { viewModel.markResolved(item.id) })
            }
        }
    }
}

@Composable
fun LostFoundItemCard(item: LostFoundItem, onMarkResolved: () -> Unit) {
    JatreCard {
        Column {
            if (item.imageUrl.isNotEmpty()) {
                AsyncImage(
                    model = item.imageUrl,
                    contentDescription = null,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(200.dp),
                    contentScale = ContentScale.Crop
                )
            }
            Text(
                text = if (item.type == com.jatre.nammapride.domain.model.ItemType.LOST) "LOST" else "FOUND",
                color = if (item.type == com.jatre.nammapride.domain.model.ItemType.LOST) FestiveRed else FestiveOrange,
                fontWeight = FontWeight.Bold,
                fontSize = 12.sp
            )
            Text(text = item.description, fontSize = 16.sp, fontWeight = FontWeight.Medium)
            Text(text = "Reported: ${item.timestamp.toDate().toLocaleString()}", fontSize = 12.sp, color = Color.Gray)
            
            if (item.status == ItemStatus.ACTIVE) {
                Button(
                    onClick = onMarkResolved,
                    modifier = Modifier.padding(top = 8.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color.LightGray)
                ) {
                    Text("Mark as Resolved", color = Color.Black)
                }
            } else {
                Text(text = "RESOLVED", color = Color.Green, fontWeight = FontWeight.ExtraBold, modifier = Modifier.padding(top = 8.dp))
            }
        }
    }
}
