import { faker } from "@faker-js/faker"
import { randomInt } from "crypto"
import { hashPassword } from "src/modules/auth/lib/auth.crypto"
import { DBConnection, dbProvider, poolProvider } from "src/modules/db/db.provider"
import { userRoles, userSchema } from "src/modules/db/schema/db.schema"
import { writeFileSync } from "fs"
import path from "path"

function randomWeightedChoice(list: any[], weights: number[]) {
    weights = weights ?? new Array(list.length).fill(1)

    const sum = weights.reduce((acc, value) => {
        return acc += value
    }, 0)

    let index = randomInt(sum + 1)

    for (let i = 0; i < weights.length; i++) {
        index -= weights[i]
        if (index <= 0) return list[i]
    }

    return list[list.length - 1]
}

async function generateUsers(db: DBConnection, count: number = 30) {
    const users = []
    const fileUsers = []
    let now;
    let end;
    now = performance.now()
    for (let i = 0; i < count; i++) {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const password = faker.internet.password({ memorable: true })
        const user = {
            firstName,
            lastName,
            username: faker.internet.username({ firstName, lastName }),
            email: faker.internet.email({ firstName, lastName }),
            hash: await hashPassword(password),
            role: randomWeightedChoice(Object.values(userRoles), [1, 1, 5])
        }
        fileUsers.push({
            email: user.email,
            username: user.username,
            password: password,
        })
        users.push(user)
    }
    end = performance.now()
    console.log(`Generated in memory ${users.length} users in ${end - now} ms`)

    now = performance.now()
    await db.insert(userSchema).values(users)
    end = performance.now()
    console.log(`Wrote ${users.length} rows into db in ${end - now} ms`)

    const CREDS_FILENAME = 'creds.json'

    now = performance.now()
    writeFileSync(
        path.join(process.cwd(), CREDS_FILENAME), 
        JSON.stringify(fileUsers, null, 2), 
        { 
            encoding: "utf-8",
        },
    )
    end = performance.now()
    console.log(`Dumped ${fileUsers.length} user credentials into ${CREDS_FILENAME} in ${end - now} ms`)
}

if (require.main === module) {
    (async () => {
        const pool = poolProvider.useFactory()
        const db = dbProvider.useFactory(pool)
        await generateUsers(db, 60)
        await pool.end()
        if (pool.ended)
            console.log('Closed database connection')
        
    })()
}