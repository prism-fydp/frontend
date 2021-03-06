export default interface Serializable<T> {
  serialize(input: T): string;
  deserialize(input: string): T;
}
