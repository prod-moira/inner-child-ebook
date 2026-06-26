import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const gcashNumber = formData.get("gcashNumber");
  const receipt = formData.get("receipt");

  if (
    typeof fullName !== "string" ||
    !fullName.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof gcashNumber !== "string" ||
    !gcashNumber.trim() ||
    !(receipt instanceof File) ||
    receipt.size === 0
  ) {
    return Response.json(
      { error: "Missing or invalid required fields" },
      { status: 400 }
    );
  }

  if (!receipt.type.startsWith("image/")) {
    return Response.json(
      { error: "Receipt must be an image file" },
      { status: 400 }
    );
  }

  let supabase;

try {
  supabase = createSupabaseServerClient();
} catch (err) {
  console.error("Supabase init error:", err);
  return Response.json(
    { error: "Server configuration error" },
    { status: 500 }
  );
}

  const receiptPath = `${crypto.randomUUID()}-${receipt.name}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("receipts")
    .upload(receiptPath, receipt, {
      contentType: receipt.type,
      upsert: false,
    });

    if (uploadError || !uploadData) {
      console.error("Upload error:", uploadError);
      return Response.json(
        { error: "Failed to upload receipt" },
        { status: 500 }
      );
    }

  const { error: insertError } = await supabase.from("orders").insert({
    name: fullName.trim(),
    email: email.trim(),
    gcash_number: gcashNumber.trim(),
    receipt_url: uploadData.path,
    status: "pending",
  });

  if (insertError) {
    console.error("Insert error:", insertError);
    return Response.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }

  return Response.json({ success: true }, { status: 201 });
}
