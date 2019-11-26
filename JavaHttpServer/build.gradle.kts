subprojects {
    apply(plugin = "java")

    configure<JavaPluginConvention> {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    repositories {
        mavenCentral()
    }
}

