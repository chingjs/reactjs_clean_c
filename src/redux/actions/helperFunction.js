export const userTokenConfig = getState => {
    const token = getState().user.token;
    let config = {
        headers : {
            "Content-Type" : "application/json"
        }
    };

    if (token) config.headers["auth-token"] = token;
    return config;
};