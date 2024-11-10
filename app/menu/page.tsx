import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";

export default async function MenuPage() {
    const supabase = createClient();

    const {data} = await supabase.from("Projects").select("*").eq("created_by", (await supabase.auth.getUser()).data.user?.id);

    return (
        <div>
            <h1>Menu</h1>
        </div>
    )
}