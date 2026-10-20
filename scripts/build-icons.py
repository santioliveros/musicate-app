# Genera los assets de la app a partir del logotipo de musikate.
# Requiere Pillow: python scripts/build-icons.py <ruta-al-logotipo.png>
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "images"
BACKGROUND = (13, 13, 13)  # colors.background de src/theme
BRAND = (255, 208, 130)  # ámbar del acento (colors.primary de src/theme)


def load_logo(path: Path) -> Image.Image:
    """Devuelve el logotipo en RGB con alfa premultiplicado limpio y sin fondo."""
    source = Image.open(path).convert("RGBA")
    rgb = np.asarray(source.convert("RGB")).astype(np.float32) / 255.0

    # El verde neón del original define la silueta; su color se reemplaza por el
    # ámbar de la marca. Cualquier otro color (el fondo negro y el ruido de la
    # compresión) se convierte en alfa, quedando solo la contraforma.
    red, green, blue = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    mask = (green > 0.45) & (green > red + 0.12) & (green > blue + 0.12)
    alpha = fill_holes(mask)
    alpha = smooth_alpha(alpha)

    out = np.zeros((*alpha.shape, 4), dtype=np.uint8)
    out[..., 0], out[..., 1], out[..., 2] = BRAND
    out[..., 3] = (alpha * 255).round().astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def fill_holes(mask: np.ndarray) -> np.ndarray:
    """Rellena huecos internos (contraformas tipo la de la 'u' o la '!')."""
    filled = mask.copy()
    for _ in range(3):
        padded = np.pad(filled, 1, constant_values=False)
        neighbors = sum(
            [
                padded[1 + dy : 1 + dy + filled.shape[0], 1 + dx : 1 + dx + filled.shape[1]]
                for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1))
            ]
        )
        filled = filled | (neighbors >= 3)
    return filled


def smooth_alpha(alpha: np.ndarray) -> np.ndarray:
    """Suaviza el borde para compensar el ruido del GAN."""
    box = np.ones((3, 3), dtype=np.float32) / 9.0
    padded = np.pad(alpha.astype(np.float32), 1)
    blurred = np.zeros_like(alpha, dtype=np.float32)
    for y in range(alpha.shape[0]):
        for x in range(alpha.shape[1]):
            blurred[y, x] = (padded[y : y + 3, x : x + 3] * box).sum()
    return np.where(blurred > 0.35, np.clip((blurred - 0.2) / 0.6, 0, 1), 0.0)


def tight_bbox(image: Image.Image) -> Image.Image:
    return image.crop(image.getbbox())


def pad_square(image: Image.Image, ratio: float) -> Image.Image:
    """Centra el recorte en un lienzo cuadrado con el logotipo ocupando `ratio`."""
    side = int(round(max(image.width, image.height) / ratio))
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(image, ((side - image.width) // 2, (side - image.height) // 2), image)
    return canvas


def save(image: Image.Image, name: str, size: int | None = None) -> None:
    if size:
        scale = size / max(image.width, image.height)
        image = image.resize(
            (max(1, round(image.width * scale)), max(1, round(image.height * scale))),
            Image.LANCZOS,
        )
    path = OUT / name
    image.save(path, "PNG", optimize=True)
    print(f"{name}: {image.width}x{image.height} -> {path.relative_to(ROOT)}")


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("uso: python scripts/build-icons.py <logotipo.png>")

    logo = tight_bbox(load_logo(Path(sys.argv[1])))
    print(f"logotipo recortado: {logo.width}x{logo.height}")

    # Icono de la app: logotipo centrado en lienzo transparente.
    save(pad_square(logo, 0.92), "icon.png", 1024)

    # Wordmark del header de Inicio: logotipo transparente sin margen.
    save(logo, "musikate-wordmark.png", 640)

    # Favicon web.
    save(pad_square(logo, 0.88), "favicon.png", 48)

    # Splash: fondo #0D0D0D, logotipo transparente.
    splash = Image.new("RGBA", (512, 512), (*BACKGROUND, 255))
    inner = pad_square(logo, 0.86)
    inner = inner.resize((int(inner.width * 512 / inner.height), 512), Image.LANCZOS)
    splash.paste(inner, ((512 - inner.width) // 2, 0), inner)
    save(splash, "splash-icon.png")

    # Splash web (expo-router usa splash.png en web).
    save(splash, "splash.png")

    # Android adaptive icon: foreground con la zona segura (66%) del logotipo.
    save(pad_square(logo, 0.62), "android-icon-foreground.png", 1024)

    # Icono monocromo (tema Material You): misma silueta, el sistema lo colorea.
    mono = Image.new("RGBA", logo.size, (255, 255, 255, 255))
    mono.putalpha(logo.getchannel("A"))
    save(pad_square(mono, 0.62), "android-icon-monochrome.png", 432)

    # Fondo del adaptive icon.
    save(Image.new("RGBA", (432, 432), (*BACKGROUND, 255)), "android-icon-background.png")


if __name__ == "__main__":
    main()
