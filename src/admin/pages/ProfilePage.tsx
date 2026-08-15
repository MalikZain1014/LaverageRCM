import { useState, type FormEvent } from 'react';
import { Save, Loader2, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, Input, Badge } from '@/admin/components/ui';
import { userService } from '@/admin/services/api';
import { useAuth } from '@/admin/contexts/AuthContext';
import { ROLES } from '@/admin/constants';

export default function ProfilePage() {
  const { profile, user } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [saving, setSaving] = useState(false);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    try {
      await userService.updateProfile(profile.id, { full_name: fullName, avatar_url: avatarUrl || null });
      toast.success('Profile updated');
    } catch { toast.error('Failed to update profile'); }
    setSaving(false);
  }

  if (!profile) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-600" /></div>;

  return (
    <div>
      <PageHeader title="My Profile" description="Manage your personal information" />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-500/10 text-2xl font-bold text-primary-600">
            {profile.full_name.charAt(0)}
          </div>
          <p className="font-bold text-slatey-800 dark:text-white">{profile.full_name}</p>
          <p className="text-sm text-slatey-500">{profile.email}</p>
          <div className="mt-3"><Badge color="blue">{ROLES[profile.role]}</Badge></div>
          <p className="mt-3 text-xs text-slatey-400">Member since {new Date(profile.created_at).toLocaleDateString()}</p>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">Edit Information</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
            <Input label="Email (read-only)" value={user?.email || profile.email} disabled />
            <Input label="Avatar URL" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} placeholder="https://..." />
            <Button type="submit" loading={saving} icon={<Save className="h-4 w-4" />}>Save Changes</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
