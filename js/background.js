const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
const chosenImage = images[Math.floor(Math.random() * images.length)];
const imageUrl = `img/${chosenImage}`;

document.body.style.backgroundImage = `url(${imageUrl})`;

const setTextThemeByImage = (src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const sampleSize = 32;
        canvas.width = sampleSize;
        canvas.height = sampleSize;
        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

        const { data } = ctx.getImageData(0, 0, sampleSize, sampleSize);
        let total = 0;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            total += 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }

        const avgLuminance = total / (data.length / 4);
        const isDark = avgLuminance < 110;

        document.body.style.setProperty("--text-color", isDark ? "#f5f5f5" : "#111");
        document.body.style.setProperty(
            "--text-shadow",
            isDark ? "0 2px 8px rgba(0, 0, 0, 0.45)" : "none"
        );
    };
};

setTextThemeByImage(imageUrl);
