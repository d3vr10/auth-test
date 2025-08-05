export const jwtConstants = {
    EXPIRES_IN: "10d",
    REFRESH_TOKEN: "testing123",
    ACCESS_TOKEN: "testing123",
    ACCESS_TOKEN_OPTIONS: {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        path: '/',
    },
    TOKEN_NAME: 'access_token',
} as const