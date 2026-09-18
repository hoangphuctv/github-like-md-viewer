param(
    [ValidateSet('patch', 'minor', 'major')]
    [string]$Bump = 'patch'
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$manifestPath = Join-Path $root 'manifest.json'

if (-not (Test-Path $manifestPath)) {
    throw 'manifest.json not found.'
}

$content = [System.IO.File]::ReadAllText($manifestPath)
if ($content -notmatch '"version"\s*:\s*"(\d+)\.(\d+)\.(\d+)"') {
    throw 'Could not parse version in manifest.json.'
}

$major = [int]$Matches[1]
$minor = [int]$Matches[2]
$patch = [int]$Matches[3]
$oldVersion = "$major.$minor.$patch"

switch ($Bump) {
    'major' { $major++; $minor = 0; $patch = 0 }
    'minor' { $minor++; $patch = 0 }
    default { $patch++ }
}

$newVersion = "$major.$minor.$patch"
$content = [regex]::Replace(
    $content,
    '"version"\s*:\s*"\d+\.\d+\.\d+"',
    "`"version`": `"$newVersion`"",
    1
)
[System.IO.File]::WriteAllText($manifestPath, $content, [System.Text.UTF8Encoding]::new($false))

$distDir = Join-Path $root 'dist'
New-Item -ItemType Directory -Path $distDir -Force | Out-Null

$staging = Join-Path $env:TEMP ("github-like-md-viewer-pack-{0}" -f [guid]::NewGuid())
New-Item -ItemType Directory -Path $staging -Force | Out-Null

try {
    $requiredFiles = @('manifest.json', 'content.js', 'github-markdown.css')
    foreach ($file in $requiredFiles) {
        $source = Join-Path $root $file
        if (-not (Test-Path $source)) {
            throw "Missing required file: $file"
        }
        Copy-Item $source -Destination $staging
    }

    $iconSource = Join-Path $root 'assets\icon-128.png'
    if (Test-Path $iconSource) {
        $assetsDir = Join-Path $staging 'assets'
        New-Item -ItemType Directory -Path $assetsDir -Force | Out-Null
        Copy-Item $iconSource -Destination $assetsDir
    }

    $zipName = "github-like-md-viewer-v$newVersion.zip"
    $zipPath = Join-Path $distDir $zipName
    if (Test-Path $zipPath) {
        Remove-Item $zipPath -Force
    }

    Compress-Archive -Path (Join-Path $staging '*') -DestinationPath $zipPath -CompressionLevel Optimal
}
finally {
    if (Test-Path $staging) {
        Remove-Item $staging -Recurse -Force
    }
}

Write-Host ''
Write-Host "Version bumped: $oldVersion -> $newVersion"
Write-Host "Package created: $zipPath"
Write-Host ''
Write-Host 'Upload this zip in Chrome Web Store Developer Dashboard.'
