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

const DefaultFileMetadata = {
  cid: '',
  title: '',
  created_at: '',
  user: DefaultUser,
};

export { User, DefaultUser, FileMetadata, DefaultFileMetadata };
