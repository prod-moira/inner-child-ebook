import { getAuthenticatedUser } from "@/lib/supabase/server-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("status" in body) ||
    (body.status !== "approved" && body.status !== "rejected")
  ) {
    return Response.json(
      { error: "Status must be 'approved' or 'rejected'" },
      { status: 400 }
    );
  }

  let supabase;

  try {
    supabase = createSupabaseServerClient();
  } catch {
    return Response.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("orders")
    .update({ status: body.status })
    .eq("id", id)
    .select("id")
    .single();

  if (error || !data) {
    return Response.json({ error: "Failed to update order" }, { status: 500 });
  }

  return Response.json({ success: true }, { status: 200 });
}
