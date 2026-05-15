package com.jatre.nammapride.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val FestiveRed = Color(0xFFD32F2F)
val FestiveOrange = Color(0xFFE64A19)
val FestiveYellow = Color(0xFFFBC02D)
val FestiveBackground = Color(0xFFFFF9F0)

private val LightColorScheme = lightColorScheme(
    primary = FestiveRed,
    secondary = FestiveOrange,
    tertiary = FestiveYellow,
    background = FestiveBackground,
    surface = Color.White,
    onPrimary = Color.White,
    onSecondary = Color.White,
    onTertiary = Color.Black,
    onBackground = Color(0xFF2D2D2D),
    onSurface = Color(0xFF2D2D2D),
    outlineVariant = Color(0xFFFFE0B2) // For orange-100 borders
)

@Composable
fun JatreNammaPrideTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme, // Keep festive theme even in dark mode for jatre vibe
        content = content
    )
}
