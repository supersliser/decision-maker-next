'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function create(formData: FormData) {
    const supabase = await createClient();

    const user = await supabase.auth.getUser()

    const { error, data } = await supabase.from("Projects").insert({
        title: formData.get('title'),
        description: formData.get('description'),
        created_by: user.data.user?.id,
    }).select("id").single();

    console.log(data);

    if (error) {
        console.log(error);
    } else {
        redirect(`/?id=${data.id}`);
    }
}

export async function cancel(formData: FormData) {
    redirect("/menu")
}
