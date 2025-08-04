import argon from "argon2"

export async function hashPassword(password: string) { 
    return await argon.hash(password, { type: argon.argon2id })
}

export async function verifyPassword(hash: string, password: string) {
    return await argon.verify(hash, password)
}