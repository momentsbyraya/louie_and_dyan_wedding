from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import numpy as np
from pathlib import Path

src = Path(r"C:\Users\USER\OneDrive\Documents\RHEA\louie_and_dyan_wedding\assets\images\graphics\textured-bg-2.jpg")
backup = src.with_name("textured-bg-2-original.jpg")

img = Image.open(src).convert("RGB")
if not backup.exists():
    img.save(backup, quality=95)
    print(f"Backup saved: {backup.name}")
else:
    # Re-grade from original so re-runs stay clean
    img = Image.open(backup).convert("RGB")
    print(f"Using backup original: {backup.name}")

arr = np.asarray(img).astype(np.float32) / 255.0
r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]

# Luminance (preserve texture)
lum = 0.2126 * r + 0.7152 * g + 0.0722 * b

# Dusty blue palette anchors (deep → mid → light)
stops = np.array(
    [
        [0.00, 0.176, 0.259, 0.318],  # deep slate blue #2D4251
        [0.25, 0.333, 0.463, 0.557],  # #55768E
        [0.50, 0.553, 0.682, 0.769],  # #8DAEC4 dusty blue
        [0.75, 0.773, 0.843, 0.886],  # soft blue-gray
        [1.00, 0.973, 0.980, 0.988],  # near white-blue
    ],
    dtype=np.float32,
)


def map_channel(lum_map, palette, ch):
    return np.interp(lum_map, palette[:, 0], palette[:, ch])


gray = Image.fromarray((lum * 255).astype(np.uint8), mode="L")
gray = ImageOps.autocontrast(gray, cutoff=1)
lum2 = np.asarray(gray).astype(np.float32) / 255.0

nr = map_channel(lum2, stops, 1)
ng = map_channel(lum2, stops, 2)
nb = map_channel(lum2, stops, 3)
graded = np.stack([nr, ng, nb], axis=-1)

# Tiny original blend keeps natural paper grain
out = np.clip(graded * 0.95 + arr * 0.05, 0, 1)

result = Image.fromarray((out * 255).astype(np.uint8), mode="RGB")
result = result.filter(ImageFilter.UnsharpMask(radius=1.2, percent=55, threshold=2))
result = ImageEnhance.Color(result).enhance(1.04)
result = ImageEnhance.Contrast(result).enhance(1.03)

result.save(src, quality=92, optimize=True)
print(f"Updated: {src}")
print(f"Size: {result.size}")
