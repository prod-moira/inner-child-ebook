import { getAuthenticatedUser } from "@/lib/supabase/server-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  let supabase;

  try {
    supabase = createSupabaseServerClient();
  } catch {
    return Response.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("receipt_url")
    .eq("id", id)
    .single();

  if (fetchError || !order?.receipt_url) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from("receipts")
    .createSignedUrl(order.receipt_url, 60);

  if (signedUrlError || !signedUrlData?.signedUrl) {
    return Response.json(
      { error: "Failed to generate receipt URL" },
      { status: 500 }
    );
  }

  return Response.json({ url: signedUrlData.signedUrl });
}
