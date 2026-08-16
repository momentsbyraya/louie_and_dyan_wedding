from PIL import Image
from pathlib import Path

root = Path(__file__).resolve().parents[1]
src = root / "assets/images/prenup/IMG_0030.jpg"
out_dir = root / "assets/images"
preview = root / "assets/images/preview/favicon-preview.png"

im = Image.open(src).convert("RGB")
W, H = im.size

# Couple faces sit in the lower-center of this landscape photo
side = int(H * 0.52)
cx, cy = int(W * 0.50), int(H * 0.70)
left = max(0, min(W - side, cx - side // 2))
top = max(0, min(H - side, cy - side // 2))
square = im.crop((left, top, left + side, top + side))

out_dir.mkdir(parents=True, exist_ok=True)
preview.parent.mkdir(parents=True, exist_ok=True)

sizes_png = {
    32: out_dir / "favicon-32.png",
    180: out_dir / "apple-touch-icon.png",
    192: out_dir / "favicon-192.png",
    512: out_dir / "favicon-512.png",
}
for size, path in sizes_png.items():
    square.resize((size, size), Image.Resampling.LANCZOS).save(path, optimize=True)

ico_images = [
    square.resize((s, s), Image.Resampling.LANCZOS)
    for s in (16, 32, 48)
]
ico_path = root / "assets/favicon.ico"
ico_images[0].save(
    ico_path,
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=ico_images[1:],
)

square.resize((256, 256), Image.Resampling.LANCZOS).save(preview, optimize=True)
print("crop", left, top, side)
print("ico", ico_path)
print("png", list(sizes_png.values()))
