from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps
from pathlib import Path

root = Path(__file__).resolve().parents[1]
base_path = root / "assets/images/prenup/IMG_0048.jpg"
qr_path = root / "assets/images/preview/rsvp-qr.png"
out_full = root / "assets/images/preview/rsvp-thumbnail-preview.jpg"
out_web = root / "assets/images/preview/rsvp-thumbnail-preview-web.jpg"

base = Image.open(base_path).convert("RGBA")
qr = ImageOps.autocontrast(Image.open(qr_path).convert("L")).convert("RGBA")

W, H = base.size
qr_size = int(W * 0.105)
qr = qr.resize((qr_size, qr_size), Image.Resampling.LANCZOS)

pad = int(qr_size * 0.11)
label_h = int(qr_size * 0.18)
card_w = qr_size + pad * 2
card_h = qr_size + pad * 2 + label_h
radius = int(card_w * 0.07)

# Nested on the right water, not filling the whole side
x = int(W * 0.835) - card_w // 2
y = int(H * 0.50) - card_h // 2

shadow = Image.new("RGBA", (card_w + 40, card_h + 40), (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
sd.rounded_rectangle((10, 16, 10 + card_w, 16 + card_h), radius=radius, fill=(20, 30, 40, 90))
shadow = shadow.filter(ImageFilter.GaussianBlur(18))

card = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
cd = ImageDraw.Draw(card)
cd.rounded_rectangle((0, 0, card_w - 1, card_h - 1), radius=radius, fill=(252, 252, 251, 228))
cd.rounded_rectangle(
    (0, 0, card_w - 1, card_h - 1),
    radius=radius,
    outline=(141, 174, 196, 180),
    width=max(3, card_w // 180),
)
card.paste(qr, (pad, pad), qr)

font_path = Path(r"C:\Windows\Fonts\georgia.ttf")
font_size = max(18, int(qr_size * 0.13))
try:
    font = ImageFont.truetype(str(font_path), font_size)
except OSError:
    font = ImageFont.load_default()

label = "RSVP"
bbox = cd.textbbox((0, 0), label, font=font)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
tx = (card_w - tw) / 2
ty = pad + qr_size + (label_h - th) / 2 - 4
cd.text((tx, ty), label, font=font, fill=(45, 66, 81, 255))

composed = base.copy()
composed.alpha_composite(shadow, (x - 10, y - 16))
composed.alpha_composite(card, (x, y))

rgb = composed.convert("RGB")
out_full.parent.mkdir(parents=True, exist_ok=True)
rgb.save(out_full, quality=92, optimize=True)

web_w = 1600
web_h = int(H * (web_w / W))
web = rgb.resize((web_w, web_h), Image.Resampling.LANCZOS)
web.save(out_web, quality=90, optimize=True)

print("full", rgb.size, out_full)
print("web", web.size, out_web)
print("card", card_w, card_h, "pos", x, y)
