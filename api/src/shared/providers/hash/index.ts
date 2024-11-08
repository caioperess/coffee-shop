export interface IHashProvider {
	hash(value: string, salt: string | number): Promise<string>
	compare(value: string, hash: string): Promise<boolean>
}
