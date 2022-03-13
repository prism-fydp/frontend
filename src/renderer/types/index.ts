interface User {
  id: number;
  username: string;
  bio: string;
}

const DefaultUser: User = {
  id: 0,
  username: '',
  bio: '',
};

interface FileMetadata {
  cid: string;
  title: string;
  created_at: string;
  user: User;
}

export { User, DefaultUser, FileMetadata };
