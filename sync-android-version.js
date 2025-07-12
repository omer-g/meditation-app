// sync-android-version.js
const fs = require('fs');
const path = require('path');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;

const gradlePath = path.join('android', 'app', 'build.gradle');
let gradle = fs.readFileSync(gradlePath, 'utf8');

// Update versionName
gradle = gradle.replace(/versionName ".*"/, `versionName "${version}"`);

// Increment versionCode by 1
gradle = gradle.replace(/versionCode (\d+)/, (match, p1) => `versionCode ${parseInt(p1, 10) + 1}`);

fs.writeFileSync(gradlePath, gradle);
console.log(`Updated build.gradle to versionName ${version}`);
