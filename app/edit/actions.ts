'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from 'next/navigation'

export async function update(formData: FormData) {
    const supabase = await createClient();
    const title = formData.get('title');
    const description = formData.get('description');
    const { error } = await supabase.from("Projects").update({ title: title, description: description, modified_at: new Date(Date.now()) }).eq("id", formData.get('id'));
    if (error) {
        console.log(error);
    }
    redirect('/menu');
}

export async function deleteProject(formData: FormData) {
    const supabase = await createClient();
    const { error } = await supabase.from("Projects").delete().eq("id", formData.get('id'));
    if (error) {
        console.log(error);
    }
    redirect('/menu');
}

export async function cancel() {
    redirect("/menu");
}