import { User } from 'renderer/types';

export default function sanitizeUser(data: any): User {
  return {
    id: data.id,
    username: data.username,
    bio: data.bio,
  };
}
