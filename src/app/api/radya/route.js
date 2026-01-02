import { NextResponse } from "next/server";

const RADYA = {
    profile: {
        namaLengkap: "Muhammad Radya Iftikhar",
        namaPanggilan: "Radya",
        umur: 19,
        domisili: "Malang",
        role: "Mahasiswa",
    },

    about: {
        deskripsi: "Mahasiswa Informatika yang tertarik pada Web Development dan teknologi.",
        minat: ["Web Development", "Data Engineering", "AI"],
    },

    skills: {
        programming: ["React", "Nextjs", "SQL", "NoSQL", "Firebase", "Supabase", "Javascript", "Python"],
        tools: ["Git", "GitHub", "VS Code"],
    },

    education: [
        {
            institusi: "SMK Telkom Malang",
            jurusan: "RPL",
            tahunMasuk: 2021,
            tahunLulus: 2024,
            status: "Lulus"
        },
        {
            institusi: "Universitas Muhammadiyah Malang",
            jurusan: "Informatika",
            tahunMasuk: 2024,
            tahunLulus: 2028,
            status: "Aktif"
        }
    ],

    contact: {
        email: "radyaiftikhar@email.com",
        github: "https://github.com/radya",
        instagram: "@radyaif"
    },

    currentlyLearning: ["SQL", "Data Engineering", "Pokoknya Data"]
};



export function GET() {
    return NextResponse.json(RADYA)
}