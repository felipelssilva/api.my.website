
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum RoleEnum {
    MEMBER = "MEMBER",
    MANAGER = "MANAGER",
    ADMIN = "ADMIN"
}

export class CreateCertificatesInput {
    name: string;
    description: string;
    url: string;
    order: string;
    img: string;
    createdAt: string;
    updateAt: string;
    deletedAt: string;
}

export class UpdateCertificatesInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    url?: Nullable<string>;
    order?: Nullable<string>;
    img?: Nullable<string>;
    createdAt?: Nullable<string>;
    updateAt?: Nullable<string>;
    deletedAt?: Nullable<string>;
}

export class CreateContactsInput {
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
    deletedAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class UpdateContactsInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    subject?: Nullable<string>;
    message?: Nullable<string>;
    createdAt?: Nullable<string>;
    deletedAt?: Nullable<string>;
    updatedAt: string;
}

export class CreateProjectsInput {
    name: string;
    description: string;
    url: string;
    createdAt: string;
    updateAt: string;
}

export class UpdateProjectsInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    url?: Nullable<string>;
    createdAt?: Nullable<string>;
    updateAt?: Nullable<string>;
}

export class CreateUserInput {
    username: string;
    name: string;
    password: string;
    createdAt: string;
}

export class UpdateUserInput {
    username?: Nullable<string>;
    name?: Nullable<string>;
    password?: Nullable<string>;
    createdAt?: Nullable<string>;
}

export class LoginUserInput {
    username: string;
    password: string;
}

export class Certificates {
    _id: string;
    name: string;
    description: string;
    url: string;
    order: string;
    img: string;
    createdAt: string;
    updateAt: string;
    deletedAt: string;
}

export abstract class IQuery {
    abstract certificates(): Nullable<Certificates[]> | Promise<Nullable<Certificates[]>>;

    abstract certificate(_id: string): Nullable<Certificates> | Promise<Nullable<Certificates>>;

    abstract contacts(): Nullable<Contacts[]> | Promise<Nullable<Contacts[]>>;

    abstract contact(_id: string): Nullable<Contacts> | Promise<Nullable<Contacts>>;

    abstract projects(): Nullable<Projects[]> | Promise<Nullable<Projects[]>>;

    abstract project(_id: string): Nullable<Projects> | Promise<Nullable<Projects>>;

    abstract users(offset: number, limit: number): Nullable<User[]> | Promise<Nullable<User[]>>;

    abstract user(_id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createCertificates(input: CreateCertificatesInput): Nullable<Certificates> | Promise<Nullable<Certificates>>;

    abstract updateCertificates(_id: string, input: UpdateCertificatesInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteCertificates(_id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createContact(input: CreateContactsInput): Nullable<Contacts> | Promise<Nullable<Contacts>>;

    abstract updateContact(_id: string, input: UpdateContactsInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteContact(_id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createProject(input: CreateProjectsInput): Nullable<Projects> | Promise<Nullable<Projects>>;

    abstract updateProject(_id: string, input: UpdateProjectsInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteProject(_id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createUser(input: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(_id: string, input: UpdateUserInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteUser(_id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract login(input: LoginUserInput): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;

    abstract setRole(_id: string, role: RoleEnum): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export class Contacts {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
    deletedAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class Projects {
    _id: string;
    name: string;
    description: string;
    url: string;
    createdAt: string;
    updateAt: string;
}

export class LoginResponse {
    token: string;
}

export class User {
    _id: string;
    username: string;
    name: string;
    password: string;
    role: RoleEnum;
    status: boolean;
    createdAt: string;
}

export abstract class ISubscription {
    abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
