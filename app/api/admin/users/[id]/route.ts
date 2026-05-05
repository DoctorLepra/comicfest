import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const getSupabaseAdmin = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
  );
};

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { firstName, lastName, phone, role, password } = body;
    
    if (!id) return NextResponse.json({ error: 'Falta el ID de usuario' }, { status: 400 });

    const supabaseAdmin = getSupabaseAdmin();

    // 1. Update auth.users metadata
    const userUpdates: any = {
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        role: role,
        phone: phone || ''
      }
    };
    
    // Only update password if provided
    if (password && password.trim() !== '') {
      userUpdates.password = password;
      userUpdates.user_metadata.requires_password_change = true;
    }

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      id,
      userUpdates
    );

    if (authError) throw authError;

    // 2. Update profiles table (trigger might not update everything on updateUserById if it only runs on insert, so let's force update)
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        first_name: firstName,
        last_name: lastName,
        phone: phone || '',
        role: role
      })
      .eq('id', id);

    if (profileError) throw profileError;

    return NextResponse.json({ success: true, user: authData.user }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'Falta el ID de usuario' }, { status: 400 });

    const supabaseAdmin = getSupabaseAdmin();

    // Delete user from auth (profiles should cascade, or we delete profile first just in case)
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', id);
      
    if (profileError) console.warn("Could not delete profile, might cascade anyway:", profileError);

    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
    
    if (authError) throw authError;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
