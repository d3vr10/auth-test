import argon, { argon2id } from "argon2"
export async function hashPassword(password: string) { 
    return await argon.hash(password, { type: argon2id })
}