// Single Source of Truth untuk Template Layout Panggung & Zona Penonton
export const STAGE_LAYOUT_TEMPLATES = {
  "Main Stage": [
    {
      name: "Stage",
      color: "#7c3aed",
      defaultPrice: 3500000,
      defaultQuota: 200,
      desc: "Area panggung utama / akses VIP khusus",
    },
    {
      name: "VIP Zone",
      color: "#3b82f6",
      defaultPrice: 2500000,
      defaultQuota: 500,
      desc: "Tepat di depan panggung utama dengan pandangan terjelas & eksklusif",
    },
    {
      name: "CAT 1 (Side)",
      color: "#ec4899",
      defaultPrice: 1750000,
      defaultQuota: 1000,
      desc: "Sayap panggung kiri & kanan dengan angle panggung intim",
    },
    {
      name: "Festival",
      color: "#10b981",
      defaultPrice: 950000,
      defaultQuota: 3000,
      desc: "Area berdiri bebas (General Standing) di bagian tengah venue",
    },
    {
      name: "Tribune",
      color: "#6366f1",
      defaultPrice: 650000,
      defaultQuota: 2000,
      desc: "Tempat duduk bertingkat di bagian belakang dengan pandangan menyeluruh",
    },
  ],
  Festival: [
    {
      name: "Main Stage & Catwalk",
      color: "#7c3aed",
      defaultPrice: 2000000,
      defaultQuota: 500,
      desc: "Panggung utama & extended catwalk memanjang ke tengah penonton",
    },
    {
      name: "Pit A & B (FOS)",
      color: "#ec4899",
      defaultPrice: 1500000,
      defaultQuota: 1500,
      desc: "Area Front of Stage (Pit A & Pit B) di sisi catwalk",
    },
    {
      name: "General Admission",
      color: "#10b981",
      defaultPrice: 850000,
      defaultQuota: 5000,
      desc: "Area festival berdiri bebas di seluruh arena tengah",
    },
  ],
  "360° Stage": [
    {
      name: "Center Stage",
      color: "#7c3aed",
      defaultPrice: 3000000,
      defaultQuota: 300,
      desc: "Panggung tengah melingkar 360 derajat di pusat arena",
    },
    {
      name: "VIP Ring (Inner)",
      color: "#3b82f6",
      defaultPrice: 2250000,
      defaultQuota: 800,
      desc: "Lingkaran terdalam mengitari langsung panggung tengah",
    },
    {
      name: "CAT 1 (Outer Ring)",
      color: "#ec4899",
      defaultPrice: 1600000,
      defaultQuota: 1500,
      desc: "Lingkaran luar mengitari cincin VIP dengan visibilitas prima",
    },
    {
      name: "4-Quadrant Tribunes",
      color: "#6366f1",
      defaultPrice: 900000,
      defaultQuota: 4000,
      desc: "Tribun duduk 4 penjuru (North-W, North-E, South-W, South-E)",
    },
  ],
  Theater: [
    {
      name: "Proscenium Stage",
      color: "#7c3aed",
      defaultPrice: 2800000,
      defaultQuota: 200,
      desc: "Panggung teater proscenium pertunjukan musikal & konser",
    },
    {
      name: "Orchestra (Stalls)",
      color: "#3b82f6",
      defaultPrice: 1950000,
      defaultQuota: 800,
      desc: "Area kursi barisan depan lantai dasar utama teater",
    },
    {
      name: "Mezzanine",
      color: "#ec4899",
      defaultPrice: 1400000,
      defaultQuota: 1000,
      desc: "Area kursi balkon tingkat menengah dengan akustik terbaik",
    },
    {
      name: "Upper Balcony",
      color: "#6366f1",
      defaultPrice: 750000,
      defaultQuota: 1500,
      desc: "Area kursi bertingkat atas dengan pandangan menyeluruh",
    },
  ],
};

// Normalisasi nama layout jika ada variasi string
export function getTemplateZones(layoutName) {
  if (!layoutName) return STAGE_LAYOUT_TEMPLATES["Main Stage"];
  const lower = layoutName.toLowerCase();
  if (lower.includes("festival")) return STAGE_LAYOUT_TEMPLATES["Festival"];
  if (lower.includes("360")) return STAGE_LAYOUT_TEMPLATES["360° Stage"];
  if (lower.includes("theater") || lower.includes("teater"))
    return STAGE_LAYOUT_TEMPLATES["Theater"];
  return STAGE_LAYOUT_TEMPLATES["Main Stage"];
}

// Fungsi utama sinkronisasi database
export async function syncEventTicketCategories(db, eventId, stageLayout) {
  const templateZones = getTemplateZones(stageLayout);
  if (!templateZones || templateZones.length === 0) return { created: 0, removed: 0 };

  // Ambil data kategori tiket saat ini
  const [existingCategories] = await db.query(
    `SELECT tc.id, tc.name, tc.price, tc.quota, tc.is_locked,
            COALESCE(SUM(od.qty), 0) AS sold
     FROM ticket_categories tc
     LEFT JOIN order_details od ON tc.id = od.ticket_category_id
     LEFT JOIN orders o ON od.order_id = o.id AND o.status IN ('paid', 'pending')
     WHERE tc.event_id = ?
     GROUP BY tc.id`,
    [eventId]
  );

  let created = 0;
  let removed = 0;

  // 1. Buat kategori baru untuk zona yang belum ada
  for (const zone of templateZones) {
    const existing = existingCategories.find(
      (c) => c.name.trim().toLowerCase() === zone.name.trim().toLowerCase()
    );

    if (!existing) {
      await db.query(
        `INSERT INTO ticket_categories (event_id, name, price, quota, is_locked)
         VALUES (?, ?, ?, ?, 0)`,
        [eventId, zone.name, zone.defaultPrice || 0, zone.defaultQuota || 0]
      );
      created++;
    }
  }

  // 2. Hapus kategori lama yang tidak cocok dengan layout baru (hanya jika belum ada transaksi)
  const targetNames = templateZones.map((z) => z.name.trim().toLowerCase());
  for (const cat of existingCategories) {
    const isMatched = targetNames.includes(cat.name.trim().toLowerCase());
    if (!isMatched) {
      const soldCount = Number(cat.sold || 0);
      if (soldCount === 0) {
        await db.query(`DELETE FROM ticket_categories WHERE id = ?`, [cat.id]);
        removed++;
      }
    }
  }

  return { created, removed };
}

