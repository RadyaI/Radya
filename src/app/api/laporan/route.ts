import { NextResponse } from "next/server";

const reporter = {
  id: "u-2",
  name: "Civitas Akademika",
  nimNidn: "202410370110357",
  email: "civitas@umm.ac.id",
  pic: "https://i.pravatar.cc/150?img=1",
  role: "mahasiswa",
  createdAt: "2026-08-01T08:00:00.000Z",
};

const laporan = [
  {
    id: "api-1",
    title: "Lampu koridor lantai 2 mati",
    description: "Lampu di koridor gedung kuliah bersama lantai 2 mati total sejak kemarin, area jadi gelap saat malam.",
    photoUrl: null,
    completionPhotoUrl: null,
    status: "pending",
    priority: "sedang",
    createdAt: "2026-11-04T09:15:00.000Z",
    updatedAt: "2026-11-04T09:15:00.000Z",
    category: { id: 1, name: "Listrik", description: "Kerusakan kelistrikan" },
    location: { id: 1, name: "Gedung Kuliah Bersama 1", description: "Lantai 2" },
    reporter,
    technician: null,
    notes: null,
  },
  {
    id: "api-2",
    title: "Keran wastafel toilet bocor",
    description: "Keran wastafel di toilet pria lantai 1 bocor terus dan lantai jadi licin.",
    photoUrl: null,
    completionPhotoUrl: null,
    status: "in_progress",
    priority: "tinggi",
    createdAt: "2026-11-03T13:30:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z",
    category: { id: 2, name: "Air & Sanitasi", description: "Kerusakan air dan toilet" },
    location: { id: 2, name: "Gedung Fakultas Teknik", description: "Lantai 1" },
    reporter,
    technician: null,
    notes: "Teknisi sedang menuju lokasi",
  },
  {
    id: "api-3",
    title: "AC ruang lab tidak dingin",
    description: "AC di lab komputer menyala tapi tidak dingin, ruangan jadi panas saat praktikum.",
    photoUrl: null,
    completionPhotoUrl: null,
    status: "resolved",
    priority: "sedang",
    createdAt: "2026-10-30T07:45:00.000Z",
    updatedAt: "2026-11-02T15:20:00.000Z",
    category: { id: 3, name: "AC & Pendingin", description: "Kerusakan AC" },
    location: { id: 3, name: "Laboratorium Komputer", description: "Lantai 3" },
    reporter,
    technician: null,
    notes: "Freon sudah diisi ulang",
  },
  {
    id: "api-4",
    title: "Proyektor kelas tidak menyala",
    description: "Proyektor di ruang kelas tidak bisa menyala meskipun kabel sudah dicek.",
    photoUrl: null,
    completionPhotoUrl: null,
    status: "rejected",
    priority: "rendah",
    createdAt: "2026-10-28T11:00:00.000Z",
    updatedAt: "2026-10-29T08:30:00.000Z",
    category: { id: 4, name: "Peralatan", description: "Kerusakan peralatan kelas" },
    location: { id: 4, name: "Ruang Kelas A.201", description: "Lantai 2" },
    reporter,
    technician: null,
    notes: "Laporan duplikat",
  },
];

export async function GET() {
  return NextResponse.json(
    { success: true, data: laporan, message: "Daftar laporan berhasil diambil" },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}