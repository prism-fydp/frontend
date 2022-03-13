interface User {
  id: number;
  username: string;
  bio: string;
}

interface Essay {
  cid: number;
  title: string;
  created_at: string;
  user: User;
}

export { User, Essay };
