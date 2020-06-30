import * as signalR from "@microsoft/signalr";

const OurHubConnection = async token => {
    return new signalR.HubConnectionBuilder()
        .withUrl(`https://localhost:5005/chathub`, {
            accessTokenFactory: () => {
                return `${token}`
            }
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

    // async function start() {
    //     try {
    //         await connection.start();
    //     } catch (err) {
    //         console.log(err);
    //         setTimeout(() => start(), 5000);
    //     }
    // }
    //
    // await start();
}

export default OurHubConnection