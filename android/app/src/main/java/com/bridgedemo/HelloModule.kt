package com.bridgedemo

import android.os.Build
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.uimanager.ViewManager

class HelloModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "HelloModule"
    }

    @ReactMethod
    fun sayHello(name: String, promise: Promise) {
        promise.resolve("Hello $name, from Android")
    }

    @ReactMethod
    fun add(a: Double, b: Double, promise: Promise) {
        promise.resolve(a + b)
    }

    @ReactMethod
    fun getDeviceModel(promise: Promise) {
        try {
            promise.resolve(Build.MODEL)
        } catch (error: Exception) {
            promise.reject(
                "DEVICE_MODEL_ERROR",
                "Unable to read device model",
                error
            )
        }
    }
}

class HelloPackage : ReactPackage {

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): List<NativeModule> {
        return listOf(HelloModule(reactContext))
    }

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): List<ViewManager<*, *>> {
        return emptyList()
    }
}