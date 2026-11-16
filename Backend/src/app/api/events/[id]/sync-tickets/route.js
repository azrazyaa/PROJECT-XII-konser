import { NextResponse } from "next/server";
import db from "@/lib/db";
import { syncEventTicketCategories, getTemplateZones } from "@/lib/stageTemplates";

// POST: Explicitly trigger synchronization between event stage layout and ticket categories
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const eventId = Number(id);

    // Ambil stage_layout event
    const [eventRows] = await db.query(
      "SELECT id, title, stage_layout FROM events WHERE id = ?",
      [eventId]
    );

    if (!eventRows || eventRows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Event tidak ditemukan" },
        { status: 404 }
      );
    }

    const stageLayout = eventRows[0].stage_layout || "Main Stage";
    const templateZones = getTemplateZones(stageLayout);

    const { created, removed } = await syncEventTicketCategories(
      db,
      eventId,
      stageLayout
    );

    return NextResponse.json({
      success: true,
      message: `Sync kategori tiket berhasil diselaraskan dengan layout ${stageLayout}.`,
      data: {
        event_id: eventId,
        stage_layout: stageLayout,
        zones: templateZones,
        created,
        removed,
      },
    });
  } catch (error) {
    console.error("POST /api/events/[id]/sync-tickets error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyelaraskan kategori tiket",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

