export class AppError {
  readonly message: string;
  readonly data: string | null;
  readonly actions?: string[];
  readonly react?: string;

  constructor(
    message: string,
    react?: string,
    actions?: string[],
    data = null,
  ) {
    this.message = message;
    this.data = data;
    this.actions = actions;
    this.react = react;
  }
}

export class UnexpectedError extends AppError {
  constructor(info?: string) {
    const message = `Houve um erro inesperado. ${info ?? ''}`;
    super(message);
  }
}

export class MissingParameterError extends AppError {
  constructor(parameterName: string) {
    const message = `Por favor especifique o(a) ${parameterName}.`;
    super(message);
  }
}
