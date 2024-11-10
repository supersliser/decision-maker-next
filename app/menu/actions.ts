'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';

export async function deleteProject(formData: FormData) {
    const supabase = await createClient();
    const { error } = await supabase.from("Projects").delete().eq("id", formData.get('id'));
    if (error) {
        console.log(error);
    }
}

export async function edit(formData: FormData) {
    redirect(`/edit/?id=${formData.get('id')}`);
}