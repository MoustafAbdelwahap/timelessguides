DROP POLICY IF EXISTS "Authenticated users can read all posts" ON public.posts;

CREATE POLICY "Admins can read all posts" ON public.posts
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));
