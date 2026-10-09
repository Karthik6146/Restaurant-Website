$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$source = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../public/assets/images'))
$destination = Join-Path $source 'web'
New-Item -ItemType Directory -Force -Path $destination | Out-Null
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$parameters = New-Object System.Drawing.Imaging.EncoderParameters 1
$parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]82)
foreach ($file in Get-ChildItem -LiteralPath $source -Filter '*.jpg') {
    $photo = [System.Drawing.Image]::FromFile($file.FullName)
    $ratio = [Math]::Min(1.0, 1200.0 / $photo.Width)
    $bitmap = New-Object System.Drawing.Bitmap ([int]($photo.Width * $ratio)), ([int]($photo.Height * $ratio))
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($photo, 0, 0, $bitmap.Width, $bitmap.Height)
        $bitmap.Save((Join-Path $destination $file.Name), $codec, $parameters)
    } finally { $graphics.Dispose(); $bitmap.Dispose(); $photo.Dispose() }
}
$parameters.Dispose()
$before = (Get-ChildItem -LiteralPath $source -Filter '*.jpg' | Measure-Object Length -Sum).Sum
$after = (Get-ChildItem -LiteralPath $destination -Filter '*.jpg' | Measure-Object Length -Sum).Sum
Write-Output "Image bytes: $before original -> $after web copies. Originals preserved."
