# TaskMate – Student Task Management PWA

TaskMate adalah aplikasi Progressive Web App untuk membantu mahasiswa mengelola tugas perkuliahan, deadline, prioritas, dan progres pengerjaan tugas secara praktis.

## Fitur utama

- Dashboard ringkasan tugas
- Menu CRUD tugas lengkap
- Search, filter, dan sort tugas
- Penyimpanan lokal dengan LocalStorage
- Service Worker untuk offline support
- Web App Manifest dan instalasi aplikasi
- Responsive layout desktop/mobile

## Persyaratan

- Node.js 18+
- npm

## Instalasi

```bash
npm install
```

## Menjalankan aplikasi di mode development

```bash
npm run dev -- --host 0.0.0.0
```

## Build production

```bash
npm run build
```

## Preview build production

```bash
npm run preview -- --host 0.0.0.0
```

## Deployment ke Vercel

1. Push proyek ke GitHub.
2. Buka Vercel dashboard.
3. Import repository.
4. Pilih framework preset: Vite.
5. Gunakan default build command: `npm run build`.
6. Gunakan output directory: `dist`.
7. Deploy project.

> file `vercel.json` sudah disiapkan agar routing SPA tetap berjalan saat refresh halaman.

## PWA checklist

- Manifest tersedia di `/manifest.webmanifest`
- Service worker terdaftar di `/service-worker.js`
- Aplikasi dapat di-install jika browser mendukung
- Aplikasi tetap dapat diakses secara offline setelah cache awal

## Identitas mahasiswa

- Nama: Belinda Adara Putri Aditya
- NIM: 21120124140164
- Kelompok: 03
- Program Studi: Teknik Komputer
- Universitas: Universitas Diponegoro
