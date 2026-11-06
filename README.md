# Mèo Nổ — Cẩm nang giữ mạng

Web tiếng Việt dành cho người mới chơi Exploding Kittens: Original Edition.
Tra cứu 13 loại bài / 56 lá với tên Việt–Anh, tìm không dấu, bộ lọc,
hướng dẫn chi tiết và hai combo. React + Vite.

## Chạy local

Yêu cầu Node.js 22.12 trở lên.

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## GitHub Pages

Trong Settings → Pages → Build and deployment, chọn Source: GitHub Actions.
Workflow `.github/workflows/deploy.yml` build và deploy khi push lên `main`.
Đường dẫn asset tương đối hỗ trợ cả site gốc và site dưới tên repository.
Mỗi lá bài có link dạng `#card=defuse`, không cần cấu hình rewrite.

## Nội dung

Dữ liệu nằm trong `src/cards.js`; phần tra cứu nằm trong `src/CardReference.jsx`.
Tên Việt là tên hướng dẫn, có thể khác bản dịch trên hộp.
Luật tham khảo: https://www.explodingkittens.com/pages/rules-kittens
