package com.jatre.nammapride.ui.navigation

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Events : Screen("events")
    object LostFound : Screen("lost_found")
    object AddLostFound : Screen("add_lost_found")
    object Map : Screen("map")
    object Stories : Screen("stories")
}
