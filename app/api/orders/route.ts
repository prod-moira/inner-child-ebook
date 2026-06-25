export async function POST(request: Request) {
  const formData = await request.formData();

  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const gcashNumber = formData.get("gcashNumber");
  const receipt = formData.get("receipt");

  if (!fullName || !email || !gcashNumber || !receipt) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Stub: order processing not implemented yet
  return Response.json({ success: true });
}
