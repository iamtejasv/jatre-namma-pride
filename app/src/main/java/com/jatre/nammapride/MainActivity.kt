package com.jatre.nammapride

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.jatre.nammapride.ui.navigation.Screen
import com.jatre.nammapride.ui.screens.AddLostFoundScreen
import com.jatre.nammapride.ui.screens.CulturalStoriesScreen
import com.jatre.nammapride.ui.screens.EventScreen
import com.jatre.nammapride.ui.screens.HomeScreen
import com.jatre.nammapride.ui.screens.LostFoundScreen
import com.jatre.nammapride.ui.screens.MapScreen
import com.jatre.nammapride.ui.theme.JatreNammaPrideTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            JatreNammaPrideTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = androidx.compose.material3.MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    
                    NavHost(
                        navController = navController,
                        startDestination = Screen.Home.route
                    ) {
                        composable(Screen.Home.route) {
                            HomeScreen(
                                onNavigateToEvents = { navController.navigate(Screen.Events.route) },
                                onNavigateToLostFound = { navController.navigate(Screen.LostFound.route) },
                                onNavigateToMap = { navController.navigate(Screen.Map.route) },
                                onNavigateToStories = { navController.navigate(Screen.Stories.route) }
                            )
                        }
                        composable(Screen.Events.route) {
                            EventScreen(onBack = { navController.popBackStack() })
                        }
                        composable(Screen.LostFound.route) {
                            LostFoundScreen(
                                onBack = { navController.popBackStack() },
                                onNavigateToAdd = { navController.navigate(Screen.AddLostFound.route) }
                            )
                        }
                        composable(Screen.Map.route) {
                            MapScreen(onBack = { navController.popBackStack() })
                        }
                        composable(Screen.Stories.route) {
                            CulturalStoriesScreen(onBack = { navController.popBackStack() })
                        }
                        composable(Screen.AddLostFound.route) {
                            AddLostFoundScreen(onBack = { navController.popBackStack() })
                        }
                    }
                }
            }
        }
    }
}
