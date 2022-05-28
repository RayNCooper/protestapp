interface Result {
    error: boolean,
    message?: string
}

export interface FormResult extends Result {
    url: string
}

export interface FormError extends Result {
    message: string,
    trace: string,
}