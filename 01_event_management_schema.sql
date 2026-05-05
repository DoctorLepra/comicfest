-- 1. Crear tipo enumerado para status de eventos
CREATE TYPE event_status AS ENUM ('draft', 'published', 'archived');

-- 2. Crear tabla `events`
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status event_status DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Crear tabla `stand_categories` (Tipos globales de stands: Emprendimiento, Artistas, 3x3, etc.)
CREATE TABLE IF NOT EXISTS public.stand_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    base_price NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Crear tabla `policies` (Políticas Globales)
CREATE TABLE IF NOT EXISTS public.policies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT, -- Ej: 'Términos y Condiciones', 'Política de Reembolsos'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Modificar tabla `stands` si existe (si no existe la crea)
CREATE TABLE IF NOT EXISTS public.stands (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    identifier TEXT NOT NULL,
    status TEXT DEFAULT 'available',
    base_price NUMERIC NOT NULL DEFAULT 0,
    dimensions TEXT,
    category TEXT
);

-- Añadir llaves foráneas a stands para vincular con events y stand_categories
-- (Se hacen condicionales o directas si la tabla estaba vacía)
ALTER TABLE public.stands 
ADD COLUMN IF NOT EXISTS event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.stand_categories(id) ON DELETE SET NULL;

-- 6. Habilitar RLS (Row Level Security) para las nuevas tablas
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stand_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stands ENABLE ROW LEVEL SECURITY;

-- 7. Crear políticas básicas de visualización (Los visitantes pueden ver eventos publicados)
CREATE POLICY "Public events are viewable by everyone." 
ON public.events FOR SELECT USING (status = 'published');

CREATE POLICY "Stand categories are viewable by everyone." 
ON public.stand_categories FOR SELECT USING (true);

CREATE POLICY "Policies are viewable by everyone." 
ON public.policies FOR SELECT USING (true);

-- (Nota: Para el panel admin usaremos la Service Role, la cual ignora el RLS automáticamente)
