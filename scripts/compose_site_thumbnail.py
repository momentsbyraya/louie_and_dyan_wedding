from PIL import Image, ImageDraw, ImageFilter, ImageFont
from pathlib import Path
import qrcode
from qrcode.constants import ERROR_CORRECT_H

SITE_URL = "https://louie-and-dyan-wedding.vercel.app"
root = Path(__file__).resolve().parents[1]
base_path = root / "assets/images/prenup/IMG_0048.jpg"
out_dir = root / "assets/images"
preview_dir = root / "assets/images/preview"
out_og = out_dir / "og-thumbnail.jpg"
out_web = preview_dir / "site-thumbnail-preview.jpg"

base = Image.open(base_path).convert("RGBA")
W, H = base.size

qr = qrcode.QRCode(
    version=None,
    error_correction=ERROR_CORRECT_H,
    box_size=12,
    border=1,
)
qr.add_data(SITE_URL)
qr.make(fit=True)
qr_img = qr.make_image(fill_color="#27323B", back_color="#FCFCFB").convert("RGBA")

qr_size = int(W * 0.13)
qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.LANCZOS)

pad = int(qr_size * 0.12)
label_h = int(qr_size * 0.20)
card_w = qr_size + pad * 2
card_h = qr_size + pad * 2 + label_h
radius = int(card_w * 0.07)

# Left section, inset so it sits in the photo without filling the whole side
x = int(W * 0.055)
y = int(H * 0.50) - card_h // 2

shadow = Image.new("RGBA", (card_w + 40, card_h + 40), (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
sd.rounded_rectangle((10, 16, 10 + card_w, 16 + card_h), radius=radius, fill=(20, 30, 40, 90))
shadow = shadow.filter(ImageFilter.GaussianBlur(18))

card = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
cd = ImageDraw.Draw(card)
cd.rounded_rectangle((0, 0, card_w - 1, card_h - 1), radius=radius, fill=(252, 252, 251, 236))
cd.rounded_rectangle(
    (0, 0, card_w - 1, card_h - 1),
    radius=radius,
    outline=(141, 174, 196, 180),
    width=max(3, card_w // 180),
)
card.paste(qr_img, (pad, pad), qr_img)

font_path = Path(r"C:\Windows\Fonts\georgia.ttf")
font_size = max(16, int(qr_size * 0.095))
try:
    font = ImageFont.truetype(str(font_path), font_size)
except OSError:
    font = ImageFont.load_default()

label = "Dyan & Louie"
bbox = cd.textbbox((0, 0), label, font=font)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
tx = (card_w - tw) / 2
ty = pad + qr_size + (label_h - th) / 2 - 4
cd.text((tx, ty), label, font=font, fill=(45, 66, 81, 255))

composed = base.copy()
composed.alpha_composite(shadow, (x - 10, y - 16))
composed.alpha_composite(card, (x, y))
rgb = composed.convert("RGB")

# Open Graph 1200x630 crop from the composed photo
og_w, og_h = 1200, 630
crop_h = int(W * og_h / og_w)
top = max(0, (H - crop_h) // 2)
crop = rgb.crop((0, top, W, top + crop_h)).resize((og_w, og_h), Image.Resampling.LANCZOS)
out_dir.mkdir(parents=True, exist_ok=True)
preview_dir.mkdir(parents=True, exist_ok=True)
crop.save(out_og, quality=92, optimize=True)

preview = crop.resize((1600, 840), Image.Resampling.LANCZOS)
preview.save(out_web, quality=90, optimize=True)

print("og", crop.size, out_og)
print("preview", preview.size, out_web)
print("card", card_w, card_h, "pos", x, y)
