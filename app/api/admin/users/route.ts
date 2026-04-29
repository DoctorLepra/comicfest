import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Usamos la Service Role Key para operaciones de administración
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ users: data }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error fetching users:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, role, phone } = body;

    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Usar la API de admin de Supabase para crear el usuario sin iniciar sesión
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        role: role,
        phone: phone || '',
        requires_password_change: true // Bandera forzosa para cambiar la contraseña en el primer login
      }
    });

    if (error) {
      console.error('Error creating user via admin API:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Usuario creado exitosamente', user: data.user },
      { status: 201 }
    );
  } catch (err) {
    console.error('Unexpected error creating user:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
