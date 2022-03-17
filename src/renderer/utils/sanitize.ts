/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, FileMetadata } from 'renderer/types';

function sanitizeUser(data: any): User {
  return {
    id: data.id,
    username: data.username,
    bio: data.bio,
    publicAddress: data.public_address,
  };
}

function sanitizeFileMetadata(data: any): FileMetadata {
  return {
    cid: data.cid,
    title: data.title,
    created_at: data.created_at,
    user: sanitizeUser(data.user),
  };
}

export { sanitizeUser, sanitizeFileMetadata };
