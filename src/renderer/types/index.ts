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

interface Essay {
  cid: number;
  title: string;
  created_at: string;
  user: User;
}

export { User, DefaultUser, Essay };
