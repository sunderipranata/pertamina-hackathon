package com.example.leland

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        this.supportActionBar?.hide()

        var ft = supportFragmentManager.beginTransaction()

        ft.replace(R.id.cl_main_layout, SplashFragment())
            .commit()
    }
}
