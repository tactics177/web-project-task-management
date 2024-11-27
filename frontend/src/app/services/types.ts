export interface registeredUser {
    name: string,
    email: string,
    password: string
}

export interface loginUser {
    email: string
    password: string
}

export interface signedUser {
    id: string
    email: string
    token: string
}