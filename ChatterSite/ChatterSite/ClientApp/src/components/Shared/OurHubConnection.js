import * as signalR from "@microsoft/signalr";

const OurHubConnection = async token => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(`https://localhost:5005/chathub`, {
            accessTokenFactory: () => {
                return `${token}`
            }
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

    async function start() {
        try {
            await connection.start();            
            connection.on("Update", data => {
                console.log(data, '*****')
                //props.setRoom(data);
            })
        } catch (err) {
            console.log(err);
            setTimeout(() => start(), 5000);
        }
    }

    await start();

    return connection
}

export default OurHubConnection