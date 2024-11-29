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

export interface task {
    id?: string
    title: string
    description: string
    priority: string
    status:string
    tags: string[]
    dueDate?: Date
    projectId?: string
    assignedTo?: userForTask
}

export interface userForTask {
    name: string
    email: string
}