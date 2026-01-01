import type {
  Report,
  ReportType,
  Visibility,
  Status,
  ActorRole,
  MediaType,
  TimelineEntry,
  Media,
} from "./interface";

const reportTypes: ReportType[] = [
  "kriminalitas",
  "kebersihan",
  "kesehatan",
  "fasilitas",
  "lainnya",
];
const visibilities: Visibility[] = ["public", "private", "anonymous"];
const statuses: Status[] = [
  "submitted",
  "verified",
  "in_progress",
  "resolved",
  "rejected",
  "escalated",
];
const actorRoles: ActorRole[] = ["citizen", "officer", "supervisor", "system"];
const mediaTypes: MediaType[] = ["image", "video", "audio"];

const names = ["Ahmad", "Siti", "Budi", "Dewi", "Rudi", "Maya", "Joko", "Nina"];
const agencies = [
  "Polisi",
  "Dinas Kebersihan",
  "Dinas Kesehatan",
  "Dinas Fasilitas Umum",
  "Pemerintah Daerah",
];

const titles: Record<ReportType, string[]> = {
  kriminalitas: [
    "Pencurian di Malam Hari",
    "Perampokan di Jalan",
    "Penganiayaan",
    "Penculikan",
    "Penipuan",
  ],
  kebersihan: [
    "Sampah Menumpuk di Jalan",
    "Got yang Tersumbat",
    "Limbah Industri",
    "Kotoran Hewan",
    "Daerah Kumuh",
  ],
  kesehatan: [
    "Wabah Penyakit",
    "Kecelakaan Lalu Lintas",
    "Keracunan Makanan",
    "Kesehatan Lingkungan",
    "Epidemi",
  ],
  fasilitas: [
    "Jalan Rusak",
    "Lampu Jalan Mati",
    "Fasilitas Umum Rusak",
    "Parkir Ilegal",
    "Transportasi Umum",
  ],
  lainnya: [
    "Keluhan Umum",
    "Saran untuk Pemerintah",
    "Pertanyaan",
    "Laporan Lain",
    "Masukan",
  ],
};

const descriptions: Record<ReportType, string[]> = {
  kriminalitas: [
    "Ada kejadian kriminal yang perlu segera ditangani.",
    "Saya menyaksikan insiden ini dan ingin melaporkan.",
    "Korban memerlukan bantuan segera.",
  ],
  kebersihan: [
    "Lingkungan ini sangat kotor dan perlu dibersihkan.",
    "Ada masalah sanitasi yang mengganggu.",
    "Kesehatan masyarakat terancam.",
  ],
  kesehatan: [
    "Ada masalah kesehatan yang memerlukan perhatian.",
    "Kecelakaan terjadi dan butuh penanganan medis.",
    "Risiko kesehatan lingkungan.",
  ],
  fasilitas: [
    "Fasilitas umum tidak berfungsi dengan baik.",
    "Ada kerusakan yang perlu diperbaiki.",
    "Penggunaan fasilitas tidak optimal.",
  ],
  lainnya: [
    "Ada hal penting yang ingin saya sampaikan.",
    "Masukan untuk perbaikan.",
    "Pertanyaan atau laporan umum.",
  ],
};

function randomUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function randomDate(): string {
  const now = new Date();
  const past = new Date(
    now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000
  );
  return past.toISOString();
}

function randomIndonesianLocation() {
  // Latitude: -11 to +6
  // Longitude: 95 to 141
  const lat = -11 + Math.random() * 17;
  const lng = 95 + Math.random() * 46;
  return { lat, lng };
}

function randomElement<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error("Cannot select random element from empty array");
  }
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

export function generateMockReports(count: number): Report[] {
  const reports: Report[] = [];
  for (let i = 0; i < count; i++) {
    const type = randomElement(reportTypes);
    const visibility = randomElement(visibilities);
    const currentStatus = randomElement(statuses);
    const createdAt = randomDate();
    const loc = randomIndonesianLocation();
    const reporterName = randomElement(names);
    const userId = randomUUID();

    const mediaCount = Math.floor(Math.random() * 4);
    const media: Media[] = [];
    for (let j = 0; j < mediaCount; j++) {
      const mediaType = randomElement(mediaTypes);
      const url =
        mediaType === "image"
          ? `https://picsum.photos/seed/${randomUUID()}/200/300`
          : `https://example.com/${mediaType}/${randomUUID()}`;
      media.push({
        media_id: randomUUID(),
        type: mediaType,
        url,
        uploaded_at: randomDate(),
      });
    }

    const timeline: TimelineEntry[] = [];
    const timelineCount = Math.floor(Math.random() * 5) + 1;
    for (let k = 0; k < timelineCount; k++) {
      timeline.push({
        status: randomElement(statuses),
        actor: {
          actor_id: randomUUID(),
          actor_role: randomElement(actorRoles),
        },
        note: "Status updated",
        timestamp: randomDate(),
      });
    }

    const typeTitles = titles[type];
    const typeDescriptions = descriptions[type];

    const report: Report = {
      report_id: randomUUID(),
      type: type,
      title: randomElement(typeTitles),
      description: randomElement(typeDescriptions),
      visibility,
      reporter: {
        user_id: userId,
        name: reporterName,
        contact: {
          email: `${reporterName.toLowerCase()}@example.com`,
          phone: `+628${Math.floor(Math.random() * 1000000000)}`,
        },
      },
      location: {
        latitude: loc.lat,
        longitude: loc.lng,
        address: `Jl. ${randomElement(names)} No. ${Math.floor(
          Math.random() * 100
        )}`,
      },
      media,
      status: {
        current: currentStatus,
        updated_at: randomDate(),
      },
      timeline,
      votes: {
        upvote_count: Math.floor(Math.random() * 100),
        voters: Array.from({ length: Math.floor(Math.random() * 10) }, () =>
          randomUUID()
        ),
      },
      authority: {
        assigned_agency: randomElement(agencies),
        assigned_unit: "Unit Khusus",
        assigned_officer_id: randomUUID(),
      },
      escalation: {
        is_escalated: Math.random() > 0.8,
        escalated_to: "Supervisor",
        escalation_reason: "Urgent",
        escalated_at: randomDate(),
      },
      created_at: createdAt,
    };
    reports.push(report);
  }
  return reports;
}
