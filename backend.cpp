#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>
#include <iostream>
#include <random>

typedef websocketpp::server<websocketpp::config::asio> server;

using websocketpp::lib::placeholders::_1;
using websocketpp::lib::placeholders::_2;
using websocketpp::lib::bind;

int state = 0;

// pul out the type of messages sent by our config
typedef server::message_ptr message_ptr;

// Define a callback to handle incoming messages
void on_message(server *s, websocketpp::connection_hdl hdl, message_ptr msg)
{
    std::cout << "on_message called with hdl: " << hdl.lock().get()
    << " and message: " << msg->get_payload() << "\n";

    // check for a special command to instruct the server to stop listening so
    // it can be cleanly exited.
    if (msg->get_payload() == "stop-listening")
    {
        s->stop_listening();
        return;
    }

    state = rand() % 1000;
    std::cout << "creating new random state : new state is : " << state << "\n";

    try
    {
        s->send(hdl, std::to_string(state), msg->get_opcode());
    }
    catch(websocketpp::exception const &e)
    {
        std::cout << "Echo failed because : ( " << e.what() <<  " )\n";
    }
}

int main()
{
    // create a server endpoint
    server echo_server;
    printf("starting server !\n");

    try
    {
        // set logging settings
        echo_server.set_access_channels(websocketpp::log::alevel::all);
        echo_server.clear_access_channels(websocketpp::log::alevel::frame_payload);

        // initialize Asio
        echo_server.init_asio();

        // register our message handler 
        echo_server.set_message_handler(bind(&on_message, &echo_server, ::_1, ::_2));

        // listen on port 9002
        echo_server.listen(9002);

        // start the server accept loop
        echo_server.start_accept();

        // start the ASIO io_service run loop
        echo_server.run();
    }
    catch(websocketpp::exception const & e)
    {
        std::cerr << e.what() << '\n';
    }
    catch(...)
    {
        std::cout << "other exception" << std::endl;
    }
    
}

