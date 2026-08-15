import { useEffect, useState } from 'react';
import { User, Shield, Loader2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Badge, SearchInput, EmptyState, Skeleton, Select, Toggle } from '@/admin/components/ui';
import { userService } from '@/admin/services/api';
import { ROLES } from '@/admin/constants';
import { useAuth } from '@/admin/contexts/AuthContext';
import type { CmsUser, UserRole } from '@/admin/types';

export default function UsersPage() {
  const { profile } = useAuth();
  const [users, setUsers] = useState<CmsUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setUsers(await userService.list()); } catch { toast.error('Failed to load users'); }
    setLoading(false);
  }

  async function handleRoleChange(userId: string, role: string, isActive: boolean) {
    setUpdating(userId);
    try {
      await userService.updateRole(userId, role, isActive);
      toast.success('User role updated');
      load();
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Failed to update role'); }
    setUpdating(null);
  }

  async function handleActiveToggle(user: CmsUser) {
    setUpdating(user.id);
    try {
      await userService.updateRole(user.id, user.role, !user.is_active);
      toast.success(user.is_active ? 'User deactivated' : 'User activated');
      load();
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Failed to update'); }
    setUpdating(null);
  }

  const filtered = users.filter(u => u.full_name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  const roleColors: Record<string, 'blue' | 'teal' | 'amber' | 'slate'> = {
    super_admin: 'blue', administrator: 'teal', content_editor: 'amber', marketing_manager: 'slate',
  };

  return (
    <div>
      <PageHeader title="Users & Roles" description="Manage admin team members and their permissions" />
      <Card className="mb-4 p-4"><SearchInput value={search} onChange={setSearch} placeholder="Search users..." /></Card>
      <Card>
        {loading ? (
          <div className="space-y-3 p-6">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={<User className="h-8 w-8" />} title="No users found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slatey-100 dark:border-white/10">
                <th className="admin-th">User</th><th className="admin-th">Role</th><th className="admin-th">Status</th><th className="admin-th">Change Role</th>
              </tr></thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="admin-row">
                    <td className="admin-td">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-500/10 text-sm font-bold text-primary-600">{u.full_name.charAt(0)}</div>
                        <div><p className="font-semibold text-slatey-800 dark:text-slatey-200">{u.full_name}</p><p className="text-xs text-slatey-500">{u.email}</p></div>
                      </div>
                    </td>
                    <td className="admin-td"><Badge color={roleColors[u.role]}><Shield className="h-3 w-3" /> {ROLES[u.role]}</Badge></td>
                    <td className="admin-td">
                      {u.id === profile?.id ? <Badge color="green"><Check className="h-3 w-3" /> You</Badge> :
                        updating === u.id ? <Loader2 className="h-4 w-4 animate-spin text-slatey-400" /> :
                        <Toggle checked={u.is_active} onChange={() => handleActiveToggle(u)} />}
                    </td>
                    <td className="admin-td">
                      {u.id === profile?.id ? <span className="text-xs text-slatey-400">Cannot change own role</span> :
                        <Select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value, u.is_active)} className="text-xs py-1 w-40">
                          {Object.entries(ROLES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                        </Select>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
