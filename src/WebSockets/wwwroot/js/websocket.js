$(document).ready(function () {

    // WebSocket object. 
    var socket;

    // Protocol for WebSocket requests. 
    var scheme = document.location.protocol == "https:" ? "wss" : "ws";

    // Get port. 
    var port = document.location.port ? (":" + document.location.port) : "";

    // Set server URL for connection to WebSocket.
    $("#serverURL").val(scheme + "://" + document.location.hostname + port + "/ws");

    // The function is responsible for open connection to WebSocket.
    $("#connectServer").on('click', function (e) {

        // Initialize WebSocket object with Url server. 
        socket = new WebSocket($("#serverURL").val());
        stateWebSocket();

        socket.onopen = function (event) {
            $('#logs').append('<tr><td colspan="3">Connection opened.</td></tr>');
        };

        socket.onclose = function (e) {
            $('#logs').append('<tr><td colspan="3">Connection closed. Code: '+e.code+'. Reason: ' + e.reason +'</td></tr>');
        };

        socket.onmessage = function (e) {
            $('#logs').append('<tr><td>Server</td><td>Client</td><td>' + e.data + '</td></tr>');
        };

    });

    // The function is responsible for close connection to WebSocket.
    $("#closeSocket").on('click', function (e) {

        // Close WebSocket connection. 
        socket.close(1000, "Closed from client.");

        stateWebSocket();

    });

    // The function is responsible for send message to server using WebSocket. 
    $("#sendMessage").on('click', function (e) {

        var data = $("#message").val();

        // Send data from client to Server using WebSocket. 
        socket.send(data);

        $('#logs').append('<tr><td>Client</td><td>Server</td><td>' + data + '</td></tr>');
        stateWebSocket();

    });

    // The function is responsible for display WebSocket object states. 
    function stateWebSocket() {

        switch (socket.readyState) {

            case WebSocket.OPEN:
                $('#statusWebSocket').text('WebSocket opened');
                break;

            case WebSocket.CLOSED:
                $('#statusWebSocket').text('WebSocket closed.');
                break;

            case WebSocket.CONNECTING:
                $('#statusWebSocket').text('WebSocket connecting...');
                break;

            case WebSocket.CLOSING:
                $('#statusWebSocket').text('WebSocket closing...');
                break;

            default:
                $('#statusWebSocket').text('Unknown state: ' + socket.readyState);
                break;

        }
    }

});
