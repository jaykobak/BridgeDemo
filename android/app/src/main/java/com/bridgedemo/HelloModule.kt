package com.bridgedemo

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class HelloModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "HelloModule"
    }

    @ReactMethod
    fun sayHello(name: String, promise: Promise) {
        promise.resolve("Hello $name, from Android")
    }
}
