import Peer from 'peerjs';

const CreatePeerConnection = (connData, yourName) => {
    console.log("In", yourName)
    const myId = connData.filter(p => p.Username === yourName)
    const otherId = connData.filter(p => p.Username !== yourName)
    let conn = null
    
    if (otherId.length > 0){
        const peer = new Peer(myId[0].ConnectionId)
        const conn = peer.connect(otherId[0].ConnectionId);
        conn.on('open', () =>  {
            console.log('******VAGINA****')
            conn.send('hi!');
        });
        peer.on('connection', (c) => {
            if (conn && conn.open) {
                c.on('open', function() {
                    c.send("Already connected to another client");
                    setTimeout(function() { c.close(); }, 500);
                });
                return;
            }
            conn = c
            conn.on('data', (data) => {
                // Will print 'hi!'
                console.log(data);
            });
            conn.on('open', () => {
                conn.send('hello!');
            });
        });
    }     
}

export default CreatePeerConnection