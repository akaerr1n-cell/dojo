-- ============================================
-- STORAGE BUCKET SETUP للـ Avatars
-- ============================================

-- إنشاء bucket للصور الشخصية
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- RLS Policies للـ bucket
-- أي حد يقدر يشوف الصور
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- المستخدمين يقدروا يرفعوا صور لحساباتهم بس
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- المستخدمين يقدروا يحدثوا صورهم بس
CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- المستخدمين يقدروا يمسحوا صورهم بس
CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
