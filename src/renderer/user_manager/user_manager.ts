export default abstract class UserManager {
  private static username: string = '';

  private static bio: string = '';

  private static id: number = -1;

  static get() {
    return [this.username, this.bio, this.id];
  }

  static setUsername(username: string) {
    this.username = username;
  }

  static setBio(bio: string) {
    this.bio = bio;
  }

  static setId(id: number) {
    this.id = id;
  }

  static setUser(username: string, bio: string, id: string) {
    this.username = username;
    this.bio = bio;
    this.id = parseInt(id, 10);
  }
}
