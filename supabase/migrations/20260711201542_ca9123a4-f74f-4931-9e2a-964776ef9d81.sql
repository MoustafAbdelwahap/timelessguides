DROP POLICY IF EXISTS "Companions are viewable by slug" ON public.book_companions;

CREATE POLICY "Companions for published books are viewable"
ON public.book_companions
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM public.books b
    WHERE b.slug = book_companions.book_slug AND b.published = true
  )
  OR private.has_role(auth.uid(), 'admin'::app_role)
);