export class CustomError {
	constructor(
		public readonly message: string,
		public readonly statusCode: number,
	) {}
}