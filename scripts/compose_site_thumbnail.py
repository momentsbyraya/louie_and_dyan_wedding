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

# Crop to the left/center so the couple sits on the right of the thumbnail
og_w, og_h = 1200, 630
crop_w = int(W * 0.70)
crop_h = int(crop_w * og_h / og_w)
left = 0
top = max(0, (H - crop_h) // 2)
region = base.crop((left, top, left + crop_w, top + crop_h))
cw, ch = region.size

qr = qrcode.QRCode(
    version=None,
    error_correction=ERROR_CORRECT_H,
    box_size=14,
    border=1,
)
qr.add_data(SITE_URL)
qr.make(fit=True)
qr_img = qr.make_image(fill_color="#27323B", back_color="#FCFCFB").convert("RGBA")

# Card ~28% wide and ~52% tall; QR fills most of the card
card_w = int(cw * 0.28)
card_h = int(ch * 0.52)
pad = int(card_w * 0.035)
label_h = int(card_h * 0.11)
qr_size = min(card_w - pad * 2, card_h - pad * 2 - label_h)
qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.LANCZOS)
radius = int(card_w * 0.08)

x = int(cw * 0.045)
y = (ch - card_h) // 2

shadow = Image.new("RGBA", (card_w + 48, card_h + 48), (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
sd.rounded_rectangle((12, 18, 12 + card_w, 18 + card_h), radius=radius, fill=(20, 30, 40, 90))
shadow = shadow.filter(ImageFilter.GaussianBlur(20))

card = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
cd = ImageDraw.Draw(card)
cd.rounded_rectangle((0, 0, card_w - 1, card_h - 1), radius=radius, fill=(252, 252, 251, 242))
cd.rounded_rectangle(
    (0, 0, card_w - 1, card_h - 1),
    radius=radius,
    outline=(141, 174, 196, 180),
    width=max(3, card_w // 160),
)
qr_x = (card_w - qr_size) // 2
qr_y = pad
card.paste(qr_img, (qr_x, qr_y), qr_img)

font_path = Path(r"C:\Windows\Fonts\georgia.ttf")
font_size = max(18, int(qr_size * 0.085))
try:
    font = ImageFont.truetype(str(font_path), font_size)
except OSError:
    font = ImageFont.load_default()

label = "Dyan & Louie"
bbox = cd.textbbox((0, 0), label, font=font)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
tx = (card_w - tw) / 2
ty = qr_y + qr_size + (card_h - (qr_y + qr_size) - th) / 2 - 2
cd.text((tx, ty), label, font=font, fill=(45, 66, 81, 255))

composed = region.copy()
composed.alpha_composite(shadow, (x - 12, y - 18))
composed.alpha_composite(card, (x, y))
rgb = composed.convert("RGB").resize((og_w, og_h), Image.Resampling.LANCZOS)

out_dir.mkdir(parents=True, exist_ok=True)
preview_dir.mkdir(parents=True, exist_ok=True)
rgb.save(out_og, quality=92, optimize=True)

preview = rgb.resize((1600, 840), Image.Resampling.LANCZOS)
preview.save(out_web, quality=90, optimize=True)

print("og", rgb.size, out_og)
print("card", card_w, card_h, "qr", qr_size, "pos", x, y)
print("region", cw, ch)
